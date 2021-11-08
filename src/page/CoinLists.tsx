import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getCoinList } from '../domain/coin/api';
import { coinOrder, ICoin, market } from '../domain/coin/type';
import CoinList from '../component/CoinList';

const CoinLists = (): JSX.Element => {
  const viewOption = [{ value: '전체 보기' }, { value: '북마크 보기' }];
  const marketList = ['krw', 'usd', 'eur', 'jpy'];
  const [view, setView] = useState('전체 보기');
  const [market, setMarket] = useState<market>('krw');
  const [order, setOrder] = useState<coinOrder>('market_cap_desc');
  const [perPage, setPerPage] = useState<number>(50);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery(
    'coins',
    async () => await getCoinList(market, order, perPage, page)
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onChangeView = useCallback(e => {
    setView(e.target.value);
  }, []);

  const onChangeMarket = useCallback(e => {
    setMarket(e.target.value);
  }, []);

  return (
    <>
      {!isLoading && (
        <div>
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
          {data.map((coin: ICoin) => (
            <CoinList key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </>
  );
};

export default CoinLists;
