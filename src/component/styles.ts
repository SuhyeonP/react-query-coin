import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CoinListStyled = styled.tr`
  padding: 7px;
`;

interface IVolume {
  state: string;
  align: string;
  minWidth?: string;
}

export const VolumeColor = styled.td<IVolume>(({ state, align, minWidth }) => {
  const base = css`
    color: ${state};
    text-align: ${align};
    min-width: 80px;
  `;

  if (minWidth) {
    return css`
      ${base};
      min-width: ${minWidth};
    `;
  } else {
    return base;
  }
});

interface IAlign {
  align: string;
  minWidth?: string;
}

export const CoinInfoTd = styled.td<IAlign>(({ align, minWidth }) => {
  const base = css`
    text-align: ${align};
  `;
  if (minWidth) {
    return css`
      ${base};
      min-width: ${minWidth};
    `;
  } else {
    return base;
  }
});
