import React from 'react';
import { ICoin, market } from '../domain/coin/type';
import { checkState } from '../util';
import { CoinInfoTd, CoinListStyled, VolumeColor } from './styles';

interface ICoinList {
  coin: ICoin;
  country: market;
}

const countryMoney = { krw: '₩', usd: '$', jpy: '¥', eur: '€' };

const CoinList = (props: ICoinList): JSX.Element => {
  const { coin, country } = props;
  return (
    <CoinListStyled>
      <td>⭐️</td>
      <CoinInfoTd align="left" minWidth="150px">
        {coin.name}
      </CoinInfoTd>
      <CoinInfoTd align="left" minWidth="50px">
        {coin.symbol}
      </CoinInfoTd>
      <CoinInfoTd align="right" minWidth="120px">
        {countryMoney[country]}&nbsp;{coin.current_price}
      </CoinInfoTd>
      <VolumeColor
        align="right"
        state={checkState(coin.price_change_percentage_1h_in_currency)}
      >
        {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
      </VolumeColor>
      <VolumeColor
        align="right"
        state={checkState(coin.price_change_percentage_24h_in_currency)}
      >
        {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
      </VolumeColor>
      <VolumeColor
        align="right"
        state={checkState(coin.price_change_percentage_7d_in_currency)}
      >
        {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
      </VolumeColor>
      <CoinInfoTd align="right" minWidth="160px">
        {countryMoney[country]}&nbsp;
        {coin.total_volume}
      </CoinInfoTd>
    </CoinListStyled>
  );
};

export default CoinList;
