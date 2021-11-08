import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getCoinList } from '../domain/coin/api';
import { coinOrder, ICoin, market } from '../domain/coin/type';
import CoinList from '../component/CoinList';

const CoinLists = (): JSX.Element => {
  const [market, setMarket] = useState<market>('krw');
  const [order, setOrder] = useState<coinOrder>('market_cap_desc');
  const [perPage, setPerPage] = useState<number>(50);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery(
    'coins',
    async () => await getCoinList(market, order, perPage, page)
  );
  return (
    <>
      {!isLoading && (
        <div>
          {data.map((coin: ICoin) => (
            <CoinList key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </>
  );
};

export default CoinLists;
