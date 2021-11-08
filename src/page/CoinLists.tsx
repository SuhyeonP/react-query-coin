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
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, status, error, isFetching } = useQuery(
    ['coins', market, order, perPage, page],
    async () => await getCoinList(market, order, perPage, page)
  );

  useEffect(() => {
    if (data) {
      queryClient.prefetchQuery(
        ['coins', market, order, perPage, page],
        async () => await getCoinList(market, order, perPage, page)
      );
    }
  }, [data, view, market, page, perPage]);

  const onChangeView = useCallback(e => {
    setView(e.target.value);
  }, []);

  const onChangeMarket = useCallback(e => {
    setMarket(e.target.value);
  }, []);

  const onChangePageView = useCallback(e => {
    setPerPage(Number(e.target.value));
  }, []);

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
            <CoinList key={coin.id} coin={coin} />
          ))}
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default CoinLists;
