import axios from 'axios';

export const getCoins = async () => {
  const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=2&page=1&sparkline=false');

  return data;
};
