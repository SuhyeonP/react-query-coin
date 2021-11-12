import React, { useCallback } from 'react';
import { ICoin, market } from '../domain/coin/type';
import { checkState, deleteCommand } from '../util';
import { useCustom } from '../page/CoinLists';
import {
  CoinInfoTd,
  CoinListStyled,
  FavoriteStyled,
  VolumeColor
} from './styles';

interface IProps {
  coins: ICoin[];
  country: market;
  fetching: boolean;
  loading: boolean;
}

const Refactoring = (props: IProps): JSX.Element => {
  const { coins, country, fetching, loading } = props;
  const { query, mutation } = useCustom();

  const addingFavorite = useCallback(
    (coin: string, type: boolean) => () => {
      let temp;
      if (!type) {
        if (!query.data) {
          temp = [coin];
        } else {
          temp = (query.data as string[]).concat([coin]);
        }
      } else {
        temp = deleteCommand(query.data as string[], coin);
      }
      mutation.mutate(temp);
    },
    [query.data]
  );

  return (
    <>
      {loading ? (
        <tr>
          <td>loading</td>
        </tr>
      ) : (
        coins &&
        coins.map(coin => (
          <>
            <CoinListStyled key={coin.name}>
              <FavoriteStyled
                onClick={addingFavorite(
                  coin.id,
                  query.data.indexOf(coin.id) !== -1
                )}
              >
                {query.data.indexOf(coin.id) !== -1 ? '🌕' : '🌑'}
              </FavoriteStyled>
              <CoinInfoTd align="left" minWidth="150px">
                {coin.name}
              </CoinInfoTd>
              <CoinInfoTd align="left" minWidth="50px">
                {coin.symbol}
              </CoinInfoTd>
              <CoinInfoTd align="right" minWidth="135px">
                {{ krw: '₩', usd: '$', jpy: '¥', eur: '€' }[country]}&nbsp;
                {coin.current_price.toLocaleString('ko-KR')}
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
                {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
              </VolumeColor>
              <CoinInfoTd align="right" minWidth="170px">
                {{ krw: '₩', usd: '$', jpy: '¥', eur: '€' }[country]}&nbsp;
                {coin.total_volume.toLocaleString('ko-KR')}
              </CoinInfoTd>
            </CoinListStyled>
          </>
        ))
      )}
      {fetching && (
        <tr>
          <td colSpan={8}>...loading</td>
        </tr>
      )}
    </>
  );
};

export default Refactoring;
