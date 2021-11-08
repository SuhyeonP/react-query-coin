import React from 'react';
import { ICoin, market } from '../domain/coin/type';
import { checkState } from '../util';
import { CoinListStyled, VolumeColor } from './styles';

interface ICoinList {
  coin: ICoin;
  country: market;
}
const CoinList = (props: ICoinList): JSX.Element => {
  const { coin, country } = props;
  return (
    <CoinListStyled>
      <p>{coin.name}</p>
      <p>{coin.symbol}</p>
      <p>{coin.current_price}</p>
      <VolumeColor
        state={checkState(coin.price_change_percentage_1h_in_currency)}
      >
        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
      </VolumeColor>
      <VolumeColor
        state={checkState(coin.price_change_percentage_24h_in_currency)}
      >
        {coin.price_change_percentage_24h_in_currency.toFixed(2)}
      </VolumeColor>
      <VolumeColor
        state={checkState(coin.price_change_percentage_7d_in_currency)}
      >
        {coin.price_change_percentage_7d_in_currency.toFixed(2)}
      </VolumeColor>
      <p>
        {}
        {coin.total_volume}
      </p>
    </CoinListStyled>
  );
};

export default CoinList;
