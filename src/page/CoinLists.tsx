import React, { useCallback, useEffect, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getCoinList } from '../domain/coin/api';
import { coinOrder, ICoin, market } from '../domain/coin/type';
import CoinList from '../component/CoinList';
import { CoinListsStyled, CoinTableStyled, TableTitleAlign } from './styles';

const CoinLists = (): JSX.Element => {
  const queryClient = new QueryClient();
  const viewOption = ['all', 'favorite'];
  const marketList = ['krw', 'usd', 'eur', 'jpy'];
  const pageViewList = [10, 30, 50];
  const [view, setView] = useState('all');
  const [market, setMarket] = useState<market>('krw');
  const [order, setOrder] = useState<coinOrder>('market_cap_desc');
  const [perPage, setPerPage] = useState<number>(50);
  const [more, setMore] = useState<number>(perPage);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, status, error, isFetching, isPreviousData } =
    useQuery(
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

  const onChangeView = useCallback(e => {
    setView(e.target.value);
  }, []);

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
      setView(state);
    },
    []
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
          <select value={view.toString()} onChange={onChangeView}>
            {viewOption.map(view => (
              <option value={view} key={view}>
                {view === 'all' ? '전체보기' : '북마크 보기'}
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
            <th colSpan={1} />
            <TableTitleAlign align="left" colSpan={2}>
              자산
            </TableTitleAlign>
            <TableTitleAlign align="right">Price</TableTitleAlign>
            <TableTitleAlign align="right">1H</TableTitleAlign>
            <TableTitleAlign align="right">24H</TableTitleAlign>
            <TableTitleAlign align="right">7D</TableTitleAlign>
            <TableTitleAlign align="right">24H Volume</TableTitleAlign>
          </tr>
        </thead>
        <tbody>
          {!isLoading ? (
            <>
              {data.map((coin: ICoin) => (
                <CoinList key={coin.id} coin={coin} country={market} />
              ))}
              {isFetching && (
                <tr>
                  <td colSpan={8}>...loading</td>
                </tr>
              )}
              <tr>
                <td colSpan={8}>
                  <button onClick={morePage}>more</button>
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td>loading</td>
            </tr>
          )}
        </tbody>
      </CoinTableStyled>
    </CoinListsStyled>
  );
};

export default CoinLists;
