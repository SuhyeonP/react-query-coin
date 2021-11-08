import React, { useCallback, useEffect, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getCoinList } from '../domain/coin/api';
import { coinOrder, ICoin, market } from '../domain/coin/type';
import CoinList from '../component/CoinList';

const CoinLists = (): JSX.Element => {
  const queryClient = new QueryClient();
  const viewOption = [{ value: '전체 보기' }, { value: '북마크 보기' }];
  const marketList = ['krw', 'usd', 'eur', 'jpy'];
  const pageViewList = [10, 30, 50];
  const [view, setView] = useState('전체 보기');
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
    console.log(isPreviousData || !data?.hasMore);
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

  return (
    <>
      <select value={view} onChange={onChangeView}>
        {viewOption.map(view => (
          <option value={view.value} key={view.value}>
            {view.value}
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
      {!isLoading ? (
        <div>
          {data.map((coin: ICoin) => (
            <CoinList key={coin.id} coin={coin} country={market} />
          ))}
          {isFetching && <p>...loading</p>}
          <button onClick={morePage}>more</button>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default CoinLists;
