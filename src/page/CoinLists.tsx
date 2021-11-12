import React, { useCallback, useEffect, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getCoinList, useStorageQuery } from '../domain/coin/api';
import { coinOrder, ICoin, market } from '../domain/coin/type';
import CoinList from '../component/CoinList';
import { deleteCommand } from '../util';
import useFavorite from '../domain/coin/api/getFavorite';
import Loading from '../component/Loading';
import { CoinListsStyled, CoinTableStyled, TableTitleAlign } from './styles';

const useCustom = () => {
  return useStorageQuery({ storageKey: 'favorite' });
};

const CoinLists = (): JSX.Element => {
  const queryClient = new QueryClient();
  const viewOption = ['all', 'favorite'];
  const marketList = ['krw', 'usd', 'eur', 'jpy'];
  const pageViewList = [10, 30, 50];
  const [view, setView] = useState('all');
  const [market, setMarket] = useState<market>('krw');
  const [order] = useState<coinOrder>('market_cap_desc');
  const [perPage, setPerPage] = useState<number>(50);
  const [more, setMore] = useState<number>(perPage);
  const [page] = useState<number>(1);

  const { query, mutation } = useCustom();
  const [favorite, favoriteLoading, favoriteFetching] = useFavorite(
    query.data,
    market
  );
  const { data, isLoading, isFetching, isPreviousData } = useQuery(
    ['coins', market, order, more, page],
    async () => await getCoinList(market, order, more, page),
    { keepPreviousData: true, staleTime: 5000 }
  );

  useEffect(() => {
    console.log(isPreviousData || !data?.hasMore, isPreviousData);
    // todo 이게 뭔지
    if (data?.hasmore) {
      queryClient.prefetchQuery(
        ['coins', market, order, more, page],
        async () => await getCoinList(market, order, more, page)
      );
    }
  }, [data, market, page, more, queryClient]);

  const onChangeMarket = useCallback(e => {
    setMarket(e.target.value);
  }, []);

  const onChangePageView = useCallback(e => {
    setPerPage(Number(e.target.value));
    setMore(Number(e.target.value));
  }, []);

  const morePage = useCallback(() => {
    setMore(prev => prev + perPage);
  }, [perPage]);

  const setViewMode = useCallback(
    (state: string) => () => {
      console.log(state);
      setView(state);
    },
    []
  );

  const addingFavorite = useCallback(
    (coin: string, type) => () => {
      let temp;

      if (!type) {
        if (!query.data) {
          temp = [coin];
        } else {
          temp = (query.data as string[]).concat([coin]);
        }
      } else {
        temp = deleteCommand(query.data as string[], coin);
      }

      mutation.mutate(temp);
    },
    [query.data]
  );

  return (
    <CoinListsStyled>
      <div>
        <button onClick={setViewMode('all')} disabled={view === 'all'}>
          가상시세목록
        </button>
        <button
          onClick={setViewMode('favorite')}
          disabled={view === 'favorite'}
        >
          북마크목록
        </button>
      </div>
      <br />
      {view === 'all' && (
        <>
          <select
            value={view.toString()}
            onChange={e => setView(e.target.value)}
          >
            {viewOption.map(select => (
              <option value={select} key={select}>
                {select === 'all' ? '전체보기' : '북마크 보기'}
              </option>
            ))}
          </select>
          <select value={market} onChange={onChangeMarket}>
            {marketList.map(ele => (
              <option value={ele} key={ele}>
                {ele}
              </option>
            ))}
          </select>
          <select value={perPage} onChange={onChangePageView}>
            {pageViewList.map(ele => (
              <option value={ele} key={ele.toString()}>
                {ele}
              </option>
            ))}
          </select>
        </>
      )}
      <CoinTableStyled>
        <thead>
          <tr>
            <TableTitleAlign align="center" minWidth="25px" />
            <TableTitleAlign align="left" colSpan={2} minWidth="200px">
              자산
            </TableTitleAlign>
            <TableTitleAlign align="right" minWidth="135px">
              Price
            </TableTitleAlign>
            <TableTitleAlign align="right" minWidth="80px">
              1H
            </TableTitleAlign>
            <TableTitleAlign align="right" minWidth="80px">
              24H
            </TableTitleAlign>
            <TableTitleAlign align="right" minWidth="80px">
              7D
            </TableTitleAlign>
            <TableTitleAlign align="right" minWidth="170px">
              24H Volume
            </TableTitleAlign>
          </tr>
        </thead>
        <tbody>
          {view === 'all' ? (
            isLoading ? (
              <Loading loading={isLoading} />
            ) : (
              <>
                {data.map((coin: ICoin) => (
                  <CoinList
                    key={coin.id}
                    coin={coin}
                    country={market}
                    adding={addingFavorite}
                    favorite={
                      query.data
                        ? (query.data as string[]).indexOf(coin.id) !== -1
                        : false
                    }
                  />
                ))}
                <Loading loading={isFetching} />
                <tr>
                  <td colSpan={8}>
                    <button onClick={morePage}>more</button>
                  </td>
                </tr>
              </>
            )
          ) : favoriteLoading ? (
            <Loading loading={favoriteLoading} />
          ) : (
            <>
              {favorite.map((coin: ICoin) => (
                <CoinList
                  key={coin.id}
                  coin={coin}
                  country={market}
                  adding={addingFavorite}
                  favorite={
                    query.data
                      ? (query.data as string[]).indexOf(coin.id) !== -1
                      : false
                  }
                />
              ))}
              <Loading loading={favoriteFetching} />
            </>
          )}
        </tbody>
      </CoinTableStyled>
    </CoinListsStyled>
  );
};

export default CoinLists;
