import styled from "styled-components";
import { GRID, MAX_PROSE_WIDTH } from "@src/styles/variables";
import { SIZES } from "@src/styles/typography";
import { COLOURS } from "@src/styles/colours";

export const Prose = styled.div`
  p,
  ul,
  ol,
  dl,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  table {
    &:not(:last-child) {
      // when part of prose, elements get their spacing back
      margin-bottom: ${GRID.UNIT};
    }
  }
  li {
    margin-left: ${GRID.UNIT};
    &:not(:last-child) {
      margin-bottom: ${GRID.UNIT};
    }
  }
  p,
  ul,
  ol {
    // maximum readable line-length
    ${SIZES.E};
    max-width: ${MAX_PROSE_WIDTH};
  }
  ul {
    list-style: square;
  }
  small {
    ${SIZES.F};
  }
  hr {
    border: 0;
    border-top: solid 1px ${COLOURS.KEY_LINE};
    margin-bottom: ${GRID.UNIT};
  }
  dt {
    ${SIZES.D};
  }
  dt + dd {
    margin-left: ${GRID.UNIT};
  }
  dd + dt {
    margin-top: ${GRID.UNIT};
  }
`;
