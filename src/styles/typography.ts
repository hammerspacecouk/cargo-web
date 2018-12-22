import { css } from "styled-components";
import { BREAKPOINTS } from "./media";

export const MONOSPACE_FONT = css`
  font-family: "Share Tech Mono", monospace;
`;
export const BASE_FONT = MONOSPACE_FONT;
export const HEADING_FONT = MONOSPACE_FONT;

export const SIZES = {
  A: css`
    font-size: 3rem;
    line-height: 1.2;
    letter-spacing: -2px;
    ${BREAKPOINTS.S`font-size: 3rem;`};
  `,
  B: css`
    font-size: 2.2rem;
    line-height: 1.4;
    letter-spacing: -1px;
    ${BREAKPOINTS.S`font-size: 2.4rem`};
  `,
  C: css`
    font-size: 1.8rem;
    line-height: 1;
    letter-spacing: 0;
  `,
  D: css`
    font-size: 1.4rem;
    line-height: 1;
    letter-spacing: 0;
  `,
  E: css`
    font-size: 1rem;
    line-height: 1.4;
    letter-spacing: 0;
  `,
  F: css`
    font-size: 0.875rem;
    line-height: 1;
    letter-spacing: 0;
  `
};

export const ELEMENTS = {
  H1: css`
    margin: 0;
    font-weight: normal;
    ${SIZES.A} ${HEADING_FONT};
  `,
  H2: css`
    margin: 0;
    font-weight: normal;
    ${SIZES.B} ${HEADING_FONT};
  `,
  H3: css`
    margin: 0;
    font-weight: normal;
    ${SIZES.C} ${HEADING_FONT};
  `,
  H4: css`
    margin: 0;
    font-weight: normal;
    ${SIZES.D} ${HEADING_FONT};
  `,
  H5: css`
    margin: 0;
    font-weight: bold;
    ${SIZES.E} ${HEADING_FONT};
  `,
  H6: css`
    margin: 0;
    font-weight: normal;
    text-transform: uppercase;
    ${SIZES.F} ${HEADING_FONT};
  `,
  P: css`
    margin: 0;
    font-weight: normal;
    ${SIZES.E};
  `
};
