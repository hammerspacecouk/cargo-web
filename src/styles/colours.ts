// https://palx.jxnblk.com/5700d2
import { GRID } from "./variables";
import { css } from "styled-components";

const allColours = {
  base: "#5700d2",
  black: "#1c1a23",
  fullBlack: "#100e16",
  white: "#f9f9fa",
  gray: ["#f9f9fa", "#eeecef", "#e1dfe4", "#d4d1d8", "#c6c2cb", "#b6b0bd", "#a39dac", "#8d8599", "#72677f", "#433c4d"],
  violet: [
    "#f0e9fb",
    "#e0d2f7",
    "#ceb6f2",
    "#b794ec",
    "#9967e4",
    "#5400d2",
    "#4b00bd",
    "#4200a5",
    "#360089",
    "#270061",
  ],
  fuschia: [
    "#f9e9fb",
    "#f3d1f7",
    "#ecb6f2",
    "#e394ec",
    "#d765e3",
    "#bd00d2",
    "#ab00be",
    "#9600a6",
    "#7c008a",
    "#5a0064",
  ],
  pink: ["#fbe9f4", "#f7d2e8", "#f2b6da", "#ec94c9", "#e466b1", "#d2007e", "#be0072", "#a60064", "#8a0053", "#64003c"],
  red: ["#fbeaeb", "#f7d2d6", "#f2b7bd", "#ec969f", "#e46975", "#d20015", "#be0013", "#a60010", "#8a000d", "#64000a"],
  orange: [
    "#faede4",
    "#f5d9c6",
    "#efc2a5",
    "#e8a87d",
    "#df864b",
    "#d25400",
    "#bd4b00",
    "#a54200",
    "#883600",
    "#612600",
  ],
  yellow: [
    "#f9f6de",
    "#f2edba",
    "#ece393",
    "#e4d868",
    "#dbcb37",
    "#d2bd00",
    "#beab00",
    "#a69600",
    "#8a7c00",
    "#635900",
  ],
  lime: ["#eff9df", "#ddf3bd", "#caec97", "#b4e56c", "#9bdc3b", "#7ed200", "#72be00", "#64a600", "#538a00", "#3c6400"],
  green: ["#e6fae4", "#caf4c6", "#abeea4", "#86e77b", "#57de48", "#15d200", "#13be00", "#10a600", "#0d8a00", "#0a6400"],
  teal: ["#e4faec", "#c5f4d8", "#a3eec1", "#7ae7a6", "#47de84", "#00d254", "#00be4c", "#00a642", "#008a37", "#006428"],
  cyan: ["#e3faf7", "#c4f4ef", "#a1eee6", "#78e7dc", "#45dece", "#00d2bd", "#00beab", "#00a796", "#008a7c", "#00645a"],
  blue: ["#e4f1fa", "#c6e2f4", "#a4d1ee", "#7bbce7", "#49a3de", "#007ed2", "#0071bd", "#0063a5", "#005188", "#003a61"],
  indigo: [
    "#e9ebfb",
    "#d2d5f7",
    "#b6bcf2",
    "#949dec",
    "#6773e4",
    "#0015d2",
    "#0012bd",
    "#0010a5",
    "#000d87",
    "#00095f",
  ],
};

const greyscale = {
  BLACK: "#1A1F22",
  DARKEST: "#292E31",
  DARKER: "#414649",
  DARK: "#505558",
  MID: "#777C7F",
  LIGHT: "#9EA3A6",
  LIGHTER: "#C5CACD",
  LIGHTEST: "#EDF2F5",
  WHITE: "#FFFFFF",
};

const danger = {
  DARKEST: "#B43931",
  DARK: "#D5443A",
  MID: "#E1483E",
  LIGHTER: "#E7564A",
  LIGHTEST: "#FBECEB",
};

const warning = {
  DARKEST: "#CC900D",
  DARK: "#F2AB10",
  MID: "#FFB511",
  LIGHTER: "#FFC314",
  LIGHTEST: "#FFF7E7",
};

const ok = {
  DARKEST: "#30855C",
  DARK: "#399E6E",
  MID: "#3DA774",
  LIGHTER: "#49B88B",
  LIGHTEST: "#EBF6F1",
};

const action = {
  DARKEST: "#4b3264",
  DARK: "#5f3d85",
  MID: "#723da6",
  LIGHTER: "#8149b8",
  LIGHTEST: "#e9dcf5",
};

// export only has semantic names
export const COLOURS = {
  GREY: greyscale,
  BODY: {
    BACKGROUND: greyscale.BLACK,
    TEXT: greyscale.LIGHTER,
    LINK: allColours.violet[4],
    FADED: allColours.gray[7],
  },
  PANEL_BORDER: action.DARKEST,
  PANEL_INNER_DIVIDER: greyscale.DARKER,
  KEY_LINE: greyscale.MID,

  BUTTON: {
    STANDARD: greyscale.WHITE,
    ACTION: action.LIGHTER,
    CONFIRM: ok.MID,
    DANGER: danger.MID,
    WARNING: warning.MID,
  },

  HEALTH: {
    FULL: allColours.blue[4],
    GOOD: ok.LIGHTER,
    OK: ok.LIGHTER,
    WARNING: warning.LIGHTER,
    DANGER: danger.LIGHTER,
  },
  SEMANTIC: {
    DANGER: {
      KEY: danger.MID,
      BACKGROUND: danger.DARKEST,
      FOREGROUND: danger.LIGHTEST,
    },
    OK: {
      KEY: ok.MID,
      BACKGROUND: ok.DARKEST,
      FOREGROUND: ok.LIGHTEST,
    },
    WARNING: {
      KEY: warning.MID,
      BACKGROUND: warning.DARKEST,
      FOREGROUND: warning.LIGHTEST,
    },
  },

  // deprecated - todo -replace all uses

  BASE: "#7F57B8",
  ACTIVE_HIGHLIGHT: allColours.violet[4],
  EVENTS: {
    BACKGROUND: allColours.fullBlack,
    TEXT: allColours.white,
  },
  BLACK: {
    FULL: allColours.fullBlack,
    STANDARD: allColours.black,
    FADED: allColours.gray[9],
    COLOURISED: allColours.violet[9],
  },
  WHITE: {
    STANDARD: allColours.white,
  },

  CRATE: {
    LEVEL0: allColours.yellow[2],
    LEVEL1: allColours.cyan[2],
    LEVEL2: allColours.blue[3],
    LEVEL3: allColours.indigo[3],
    LEVEL4: allColours.teal[3],
    LEVEL5: allColours.lime[4],
    LEVEL6: allColours.orange[3],
  },
};

export const hexToRGBa = (hex: string, alpha?: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha !== undefined) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
};

export const scrollbarStyles = css`
  /* 1st: thumb, 2nd: track. */
  scrollbar-color: ${COLOURS.BLACK.FADED} rgba(0, 0, 0, 0.3);
  &::-webkit-scrollbar {
    width: ${GRID.HALF};
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOURS.BLACK.FADED};
    outline: 1px solid slategrey;
  }
`;
export const PANEL_BORDER = `solid 1px ${COLOURS.PANEL_BORDER}`;
export const PANEL_INNER_DIVIDER_BORDER = `solid 1px ${COLOURS.PANEL_INNER_DIVIDER}`;
