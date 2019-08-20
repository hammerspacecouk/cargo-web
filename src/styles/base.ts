import { css } from "styled-components";
import { COLOURS, scrollbarStyles } from "./colours";
import { MONOSPACE_FONT } from "./typography";
import { BREAKPOINTS } from "./media";

export const base = css`
  /* share-tech-mono-400normal - latin */
  @font-face {
    font-family: 'Share Tech Mono';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src:
      local('Share Tech Mono Regular '),
      local('Share Tech Mono-Regular'),
      url('/static/share-tech-mono-latin-400.woff2') format('woff2') // Modern Browsers
  }

  * {
    ${scrollbarStyles};
    box-sizing: border-box;
    &:before,
    &:after {
      box-sizing: border-box;
    }
  }

  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    min-height: 100%;
    background: ${COLOURS.BODY.BACKGROUND} url("/static/space.jpg") fixed;
    background-size: cover;
    ${BREAKPOINTS.XL`
      overflow-y: hidden;
    `}
  }

  body {
    color: ${COLOURS.BODY.TEXT};
    min-height: 100vh;
    ${MONOSPACE_FONT};
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
