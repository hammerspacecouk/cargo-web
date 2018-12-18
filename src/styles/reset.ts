import { css } from "styled-components";

export const reset = css`
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
    overflow-y: scroll;
  }

  body {
    margin: 0;
    min-height: 100%;
    padding: 0;
  }

  a {
    background-color: transparent;
    &:active,
    &:hover {
      outline: 0;
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

  /**
 * Remove inner padding and border in Firefox 4+.
 */

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  /**
 * Address Firefox 4+ setting \`line-height\` on \`input\` using \`!important\` in
 * the UA stylesheet.
 */

  input {
    line-height: normal;
  }

  /**
 * It's recommended that you don't attempt to style these elements.
 * Firefox's implementation doesn't respect box-sizing, padding, or width.
 *
 * 1. Address box sizing set to \`content-box\` in IE 8/9/10.
 * 2. Remove excess padding in IE 8/9/10.
 */

  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  /**
 * Fix the cursor style for Chrome's increment/decrement buttons. For certain
 * \`font-size\` values of the \`input\`, it causes the cursor style of the
 * decrement button to change from \`default\` to \`text\`.
 */

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  /**
 * 1. Address \`appearance\` set to \`searchfield\` in Safari and Chrome.
 * 2. Address \`box-sizing\` set to \`border-box\` in Safari and Chrome.
 */

  input[type="search"] {
    -webkit-appearance: textfield; /* 1 */
    box-sizing: content-box; /* 2 */
  }

  /**
 * Remove inner padding and search cancel button in Safari and Chrome on OS X.
 * Safari (but not Chrome) clips the cancel button when the search input has
 * padding (and \`textfield\` appearance).
 */

  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  textarea {
    overflow: auto;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }
`;
