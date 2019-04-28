import { css } from "styled-components";
import { BREAKPOINTS } from "./media";

export const MONOSPACE_FONT = css`
  font-family: "Share Tech Mono", monospace;
  font-variant: small-caps;
`;
export const BASE_FONT = css`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif-light, sans-serif;
`;
export const HEADING_FONT = MONOSPACE_FONT;

export const SIZES = {
  A: css`
    font-size: 3rem;
    line-height: 1;
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
    font-size: 1.4rem;
    line-height: 1;
    letter-spacing: 0;
    ${BREAKPOINTS.S`font-size: 1.8rem`};
  `,
  D: css`
    font-size: 1.2rem;
    line-height: 1;
    letter-spacing: 0;
    ${BREAKPOINTS.S`font-size: 1.4rem`};
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
  `,
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
    font-style: italic;
    ${SIZES.B} ${HEADING_FONT};
  `,
  H3: css`
    margin: 0;
    font-weight: bold;
    font-style: italic;
    ${SIZES.C} ${HEADING_FONT};
  `,
  H4: css`
    margin: 0;
    font-weight: bold;
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
    ${SIZES.F} ${HEADING_FONT};
  `,
  P: css`
    margin: 0;
    font-weight: normal;
    ${SIZES.E};
  `,
};
