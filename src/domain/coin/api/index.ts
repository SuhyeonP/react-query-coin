import axios from 'axios';
import { coinOrder, market } from '../type';

export const getCoinList = async (
  market: market = 'krw',
  order: coinOrder = 'market_cap_desc',
  per_page = 50,
  page = 1
) => {
  console.log(per_page);
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${market}&order=${order}c&per_page=${per_page}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  );

  return data;
};
