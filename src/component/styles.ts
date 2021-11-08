import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CoinListStyled = styled.div`
  display: flex;

  & > p {
    margin: 10px;
  }
`;

interface IVolume {
  state: string;
}

export const VolumeColor = styled.p<IVolume>(({ state }) => {
  return css`
    color: ${state};
  `;
});
