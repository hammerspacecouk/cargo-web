import { css } from "styled-components";
import { COLOURS, hexToRGBa } from "./colours";
import { BASE_FONT } from "./typography";

export const base = css`
html {
  background: ${COLOURS.BODY.BACKGROUND}
  fixed
  linear-gradient(
    to bottom, 
    ${hexToRGBa(COLOURS.BLACK.COLOURISED, 0.8)} 0%,
    ${hexToRGBa(COLOURS.BLACK.COLOURISED, 0)} 100%
  );
}

body {
  color: ${COLOURS.BODY.TEXT};
  margin: 0;
  padding: 0;
  min-height: 100vh;
  ${BASE_FONT}
}

a {
  font-weight: inherit;
  color: ${COLOURS.BODY.LINK};
  text-decoration: inherit;
  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
}

abbr {
  text-decoration: none;
}
`;
