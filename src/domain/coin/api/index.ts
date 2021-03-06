import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import { coinOrder, market } from '../type';

export const getCoinList = async (
  market: market = 'krw',
  order: coinOrder = 'market_cap_desc',
  per_page = 50,
  page = 1
): Promise<any> => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${market}&order=${order}c&per_page=${per_page}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  );

  return data;
};

type StorageType = 'session' | 'local';

const storageMap = {
  local: localStorage,
  session: sessionStorage
};

export function useStorageQuery<TData>({
  type = 'session',
  storageKey
}: {
  type?: StorageType;
  storageKey: string;
}): any {
  const getData = () => {
    const data = storageMap[type].getItem(storageKey);

    if (data === null) {
      return null;
    }

    return JSON.parse(data) as TData;
  };

  const setData = (data: TData) => {
    storageMap[type].setItem(storageKey, JSON.stringify(data));
    return Promise.resolve();
  };

  const queryClient = useQueryClient();
  const queryKey = ['storage', type, storageKey];

  const query = useQuery({
    queryKey,
    queryFn: getData,
    initialData: getData
  });

  const mutation = useMutation(setData, {
    onSuccess: (a, b) => {
      queryClient.setQueryData(queryKey, b);
    }
  });

  return { query, mutation };
}

export const getFavoriteCoins = async (
  list: string[],
  market: market
): Promise<any> => {
  const coinList = list.join('%2C');
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${market}&ids=${coinList}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  );

  return data;
};
