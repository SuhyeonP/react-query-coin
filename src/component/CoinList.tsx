import React from 'react';
import { ICoin } from '../domain/coin/type';
import { CoinListStyled } from './styles';

interface ICoinList {
  coin: ICoin;
}
const CoinList = (props: ICoinList): JSX.Element => {
  const { coin } = props;
  return (
    <CoinListStyled>
      <p>{coin.name}</p>
      <p>{coin.symbol}</p>
      <p>{coin.current_price}</p>
      <p>{coin.price_change_percentage_1h_in_currency}</p>
      <p>{coin.price_change_percentage_24h_in_currency}</p>
      <p>{coin.price_change_percentage_7d_in_currency}</p>
    </CoinListStyled>
  );
};

export default CoinList;
