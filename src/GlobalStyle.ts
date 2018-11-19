import { createGlobalStyle } from "styled-components";
import "typeface-share-tech-mono";

// https://palx.jxnblk.com/5700d2
export const colours = {
  "base": "#5700d2",
  "black": "#433c4d",
  "gray": [
    "#f9f9fa",
    "#eeecef",
    "#e1dfe4",
    "#d4d1d8",
    "#c6c2cb",
    "#b6b0bd",
    "#a39dac",
    "#8d8599",
    "#72677f",
    "#433c4d"
  ],
  "violet": [
    "#f0e9fb",
    "#e0d2f7",
    "#ceb6f2",
    "#b794ec",
    "#9967e4",
    "#5400d2",
    "#4b00bd",
    "#4200a5",
    "#360089",
    "#270061"
  ],
  "fuschia": [
    "#f9e9fb",
    "#f3d1f7",
    "#ecb6f2",
    "#e394ec",
    "#d765e3",
    "#bd00d2",
    "#ab00be",
    "#9600a6",
    "#7c008a",
    "#5a0064"
  ],
  "pink": [
    "#fbe9f4",
    "#f7d2e8",
    "#f2b6da",
    "#ec94c9",
    "#e466b1",
    "#d2007e",
    "#be0072",
    "#a60064",
    "#8a0053",
    "#64003c"
  ],
  "red": [
    "#fbeaeb",
    "#f7d2d6",
    "#f2b7bd",
    "#ec969f",
    "#e46975",
    "#d20015",
    "#be0013",
    "#a60010",
    "#8a000d",
    "#64000a"
  ],
  "orange": [
    "#faede4",
    "#f5d9c6",
    "#efc2a5",
    "#e8a87d",
    "#df864b",
    "#d25400",
    "#bd4b00",
    "#a54200",
    "#883600",
    "#612600"
  ],
  "yellow": [
    "#f9f6de",
    "#f2edba",
    "#ece393",
    "#e4d868",
    "#dbcb37",
    "#d2bd00",
    "#beab00",
    "#a69600",
    "#8a7c00",
    "#635900"
  ],
  "lime": [
    "#eff9df",
    "#ddf3bd",
    "#caec97",
    "#b4e56c",
    "#9bdc3b",
    "#7ed200",
    "#72be00",
    "#64a600",
    "#538a00",
    "#3c6400"
  ],
  "green": [
    "#e6fae4",
    "#caf4c6",
    "#abeea4",
    "#86e77b",
    "#57de48",
    "#15d200",
    "#13be00",
    "#10a600",
    "#0d8a00",
    "#0a6400"
  ],
  "teal": [
    "#e4faec",
    "#c5f4d8",
    "#a3eec1",
    "#7ae7a6",
    "#47de84",
    "#00d254",
    "#00be4c",
    "#00a642",
    "#008a37",
    "#006428"
  ],
  "cyan": [
    "#e3faf7",
    "#c4f4ef",
    "#a1eee6",
    "#78e7dc",
    "#45dece",
    "#00d2bd",
    "#00beab",
    "#00a796",
    "#008a7c",
    "#00645a"
  ],
  "blue": [
    "#e4f1fa",
    "#c6e2f4",
    "#a4d1ee",
    "#7bbce7",
    "#49a3de",
    "#007ed2",
    "#0071bd",
    "#0063a5",
    "#005188",
    "#003a61"
  ],
  "indigo": [
    "#e9ebfb",
    "#d2d5f7",
    "#b6bcf2",
    "#949dec",
    "#6773e4",
    "#0015d2",
    "#0012bd",
    "#0010a5",
    "#000d87",
    "#00095f"
  ]
};

export const grid = {
  unit: 16,
  half: 8
};

export const GlobalStyle = createGlobalStyle`
*, *:before, *:after {
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

img, svg {
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

/* App styles begin here */

html {
  background: hsl(274, 49%, 15%);
  background: fixed linear-gradient(45deg, hsl(276, 48%, 25%) 0%, hsl(258, 64%, 20%) 50%, hsl(242, 93%, 6%) 100%);
}

body {
  background-size: cover;
  background: fixed transparent url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1763.5 1008"><defs><style>.cls-1{opacity:0.05;}.cls-2{opacity:0.1;}.cls-3{fill:%23fff;}</style></defs><title>BackgroundTriangles</title><g class="cls-1"><polygon points="432.12 63 395.75 126 468.5 126 432.12 63"/></g><g class="cls-1"><polygon points="324.37 126 288 63 360.75 63 324.37 126"/></g><g class="cls-1"><polygon points="648.12 63 611.75 126 684.5 126 648.12 63"/></g><g class="cls-1"><polygon points="684.37 126 648 63 720.75 63 684.37 126"/></g><g class="cls-1"><polygon points="1079.12 63 1042.75 126 1115.5 126 1079.12 63"/></g><g class="cls-1"><polygon points="1259.12 0 1222.75 63 1295.5 63 1259.12 0"/></g><g class="cls-1"><polygon points="1367.37 63 1331 126 1403.75 126 1367.37 63"/></g><g class="cls-1"><polygon points="1583.37 63 1547 126 1619.75 126 1583.37 63"/></g><g class="cls-1"><polygon points="1511.37 63 1475 0 1547.75 0 1511.37 63"/></g><g class="cls-1"><polygon points="360.37 189 324 126 396.75 126 360.37 189"/></g><g class="cls-1"><polygon points="540.37 252 504 189 576.75 189 540.37 252"/></g><g class="cls-1"><polygon points="1511.12 189 1474.75 252 1547.5 252 1511.12 189"/></g><g class="cls-1"><polygon points="1619.37 126 1583 189 1655.75 189 1619.37 126"/></g><g class="cls-1"><polygon points="1079.37 189 1043 126 1115.75 126 1079.37 189"/></g><g class="cls-1"><polygon points="72.37 189 36 126 108.75 126 72.37 189"/></g><g class="cls-1"><polygon points="252.37 378 216 315 288.75 315 252.37 378"/></g><g class="cls-1"><polygon points="396.37 378 360 315 432.75 315 396.37 378"/></g><g class="cls-1"><polygon points="540.37 378 504 315 576.75 315 540.37 378"/></g><g class="cls-1"><polygon points="1331.37 252 1295 315 1367.75 315 1331.37 252"/></g><g class="cls-1"><polygon points="1331.37 378 1295 315 1367.75 315 1331.37 378"/></g><g class="cls-1"><polygon points="935.37 315 899 252 971.75 252 935.37 315"/></g><g class="cls-1"><polygon points="684.37 378 648 441 720.75 441 684.37 378"/></g><g class="cls-1"><polygon points="576.37 441 540 378 612.75 378 576.37 441"/></g><g class="cls-1"><polygon points="935.37 441 899 504 971.75 504 935.37 441"/></g><g class="cls-1"><polygon points="1187.37 378 1151 441 1223.75 441 1187.37 378"/></g><g class="cls-1"><polygon points="1259.37 504 1223 441 1295.75 441 1259.37 504"/></g><g class="cls-1"><polygon points="1691.12 378 1654.75 441 1727.5 441 1691.12 378"/></g><g class="cls-1"><polygon points="1655.37 441 1619 378 1691.75 378 1655.37 441"/></g><g class="cls-1"><polygon points="1331.37 504 1295 441 1367.75 441 1331.37 504"/></g><g class="cls-1"><polygon points="1079.37 441 1043 378 1115.75 378 1079.37 441"/></g><g class="cls-1"><polygon points="899.37 504 863 441 935.75 441 899.37 504"/></g><g class="cls-1"><polygon points="36.37 504 0 441 72.75 441 36.37 504"/></g><g class="cls-1"><polygon points="72.37 315 36 252 108.75 252 72.37 315"/></g><g class="cls-1"><polygon points="216.37 315 180 252 252.75 252 216.37 315"/></g><g class="cls-1"><polygon points="36.37 504 0 567 72.75 567 36.37 504"/></g><g class="cls-1"><polygon points="504.37 567 468 630 540.75 630 504.37 567"/></g><g class="cls-1"><polygon points="684.37 504 648 567 720.75 567 684.37 504"/></g><g class="cls-1"><polygon points="792.37 567 756 630 828.75 630 792.37 567"/></g><g class="cls-1"><polygon points="1115.37 504 1079 567 1151.75 567 1115.37 504"/></g><g class="cls-1"><polygon points="1259.12 504 1222.75 567 1295.5 567 1259.12 504"/></g><g class="cls-1"><polygon points="1151.37 567 1115 504 1187.75 504 1151.37 567"/></g><g class="cls-1"><polygon points="1403.37 504 1367 567 1439.75 567 1403.37 504"/></g><g class="cls-1"><polygon points="216.12 693 179.75 756 252.5 756 216.12 693"/></g><g class="cls-1"><polygon points="828.12 630 791.75 693 864.5 693 828.12 630"/></g><g class="cls-1"><polygon points="720.37 693 684 756 756.75 756 720.37 693"/></g><g class="cls-1"><polygon points="648.37 693 612 630 684.75 630 648.37 693"/></g><g class="cls-1"><polygon points="468.37 756 432 693 504.75 693 468.37 756"/></g><g class="cls-1"><polygon points="971.37 630 935 693 1007.75 693 971.37 630"/></g><g class="cls-1"><polygon points="1187.37 630 1151 693 1223.75 693 1187.37 630"/></g><g class="cls-1"><polygon points="1367.37 693 1331 756 1403.75 756 1367.37 693"/></g><g class="cls-1"><polygon points="1619.37 630 1583 693 1655.75 693 1619.37 630"/></g><g class="cls-1"><polygon points="1367.37 693 1331 630 1403.75 630 1367.37 693"/></g><g class="cls-1"><polygon points="1439.37 693 1403 630 1475.75 630 1439.37 693"/></g><g class="cls-1"><polygon points="1331.37 756 1295 693 1367.75 693 1331.37 756"/></g><g class="cls-1"><polygon points="1007.37 693 971 630 1043.75 630 1007.37 693"/></g><g class="cls-1"><polygon points="216.37 693 180 630 252.75 630 216.37 693"/></g><g class="cls-1"><polygon points="36.37 756 0 819 72.75 819 36.37 756"/></g><g class="cls-1"><polygon points="72.37 819 36 882 108.75 882 72.37 819"/></g><g class="cls-1"><polygon points="252.37 756 216 819 288.75 819 252.37 756"/></g><g class="cls-1"><polygon points="612.12 756 575.75 819 648.5 819 612.12 756"/></g><g class="cls-1"><polygon points="648.12 819 611.75 882 684.5 882 648.12 819"/></g><g class="cls-1"><polygon points="792.37 819 756 882 828.75 882 792.37 819"/></g><g class="cls-1"><polygon points="1007.37 819 971 882 1043.75 882 1007.37 819"/></g><g class="cls-1"><polygon points="1223.37 819 1187 882 1259.75 882 1223.37 819"/></g><g class="cls-1"><polygon points="1619.37 882 1583 819 1655.75 819 1619.37 882"/></g><g class="cls-1"><polygon points="1511.37 819 1475 756 1547.75 756 1511.37 819"/></g><g class="cls-1"><polygon points="1583.37 945 1547 1008 1619.75 1008 1583.37 945"/></g><g class="cls-1"><polygon points="1043.12 882 1006.75 945 1079.5 945 1043.12 882"/></g><g class="cls-1"><polygon points="468.37 882 432 945 504.75 945 468.37 882"/></g><g class="cls-1"><polygon points="1547.37 1008 1511 945 1583.75 945 1547.37 1008"/></g><g class="cls-1"><polygon points="1367.37 945 1331 882 1403.75 882 1367.37 945"/></g><g class="cls-1"><polygon points="1187.37 1008 1151 945 1223.75 945 1187.37 1008"/></g><g class="cls-1"><polygon points="756.37 1008 720 945 792.75 945 756.37 1008"/></g><g class="cls-1"><polygon points="648.37 945 612 882 684.75 882 648.37 945"/></g><g class="cls-1"><polygon points="612.37 1008 576 945 648.75 945 612.37 1008"/></g><g class="cls-2"><polygon class="cls-3" points="36.37 0 0 63 72.75 63 36.37 0"/></g><g class="cls-2"><polygon class="cls-3" points="108.37 126 72 189 144.75 189 108.37 126"/></g><g class="cls-2"><polygon class="cls-3" points="576.37 189 540 126 612.75 126 576.37 189"/></g><g class="cls-2"><polygon class="cls-3" points="1151.37 189 1115 252 1187.75 252 1151.37 189"/></g><g class="cls-2"><polygon class="cls-3" points="252.37 252 216 315 288.75 315 252.37 252"/></g><g class="cls-2"><polygon class="cls-3" points="1727.12 315 1690.75 378 1763.5 378 1727.12 315"/></g><g class="cls-2"><polygon class="cls-3" points="792.37 441 756 504 828.75 504 792.37 441"/></g><g class="cls-2"><polygon class="cls-3" points="1727.12 441 1690.75 504 1763.5 504 1727.12 441"/></g><g class="cls-2"><polygon class="cls-3" points="396.12 504 359.75 567 432.5 567 396.12 504"/></g><g class="cls-2"><polygon class="cls-3" points="1259.37 630 1223 567 1295.75 567 1259.37 630"/></g><g class="cls-2"><polygon class="cls-3" points="1331.37 504 1295 567 1367.75 567 1331.37 504"/></g><g class="cls-2"><polygon class="cls-3" points="756.37 756 720 693 792.75 693 756.37 756"/></g><g class="cls-2"><polygon class="cls-3" points="1367.37 819 1331 756 1403.75 756 1367.37 819"/></g><g class="cls-2"><polygon class="cls-3" points="1259.37 1008 1223 945 1295.75 945 1259.37 1008"/></g></svg>');

  color: #fff;
  font-family: "Share Tech Mono", monospace;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
`;
