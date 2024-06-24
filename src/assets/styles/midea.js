import { css } from 'styled-components';

export const media = {
  small: (...args) => css`
    @media (max-width: 1219px) {
      ${css(...args)};
    }
  `,
  medium: (...args) => css`
    @media (max-width: 1499px) {
      ${css(...args)};
    }
  `,
};
