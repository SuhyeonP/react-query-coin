import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CoinTableStyled = styled.table`
  display: block;
  margin: 20px auto;
  width: 790px;
`;
export const CoinListsStyled = styled.div`
  display: block;

  text-align: center;
`;

interface ITableAlign {
  align: string;
  minWidth?: string;
}

export const TableTitleAlign = styled.th<ITableAlign>(({ align, minWidth }) => {
  const base = css`
    text-align: ${align};
  `;

  if (minWidth) {
    return css`
      ${base};
      min-width: ${minWidth};
    `;
  }
  return base;
});
