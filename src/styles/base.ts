import { css } from "styled-components";
import { COLOURS } from "./colours";
import { BASE_FONT } from "./typography";
import { BREAKPOINTS } from "./media";
import space from "../space.jpg";

export const base = css`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    min-height: 100%;
    background: ${COLOURS.BODY.BACKGROUND} url(${space}) fixed;
    background-size: cover;
    ${BREAKPOINTS.XL`
      overflow-y: hidden;
    `}
  }

  body {
    color: ${COLOURS.BODY.TEXT};
    min-height: 100vh;
    ${BASE_FONT};
  }

  a {
    background-color: transparent;
    font-weight: inherit;
    color: ${COLOURS.BODY.LINK};
    text-decoration: inherit;
    &:active,
    &:hover {
      outline: 0;
    }
    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
    }
  }

  img,
  svg {
    border: 0;
    max-width: 100%;
  }
  svg:not(:root) {
    overflow: hidden;
    fill: currentColor;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    color: inherit;
    font: inherit;
    margin: 0;
  }

  button {
    overflow: visible;
    cursor: pointer;
  }
  button,
  select {
    text-transform: none;
  }

  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  abbr {
    text-decoration: none;
  }
  
  em {
    font-style: italic;
  }
`;
