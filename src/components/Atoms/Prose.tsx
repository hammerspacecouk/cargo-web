import styled from "styled-components";
import { GRID, MAX_PROSE_WIDTH } from "../../styles/variables";

export const Prose = styled.div`
  p,
  ul,
  ol,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  table {
    // when part of prose, elements get their spacing back
    margin-bottom: ${GRID.UNIT};
  }
  li {
    padding-left: ${GRID.UNIT};
  }
  p,
  ul,
  ol {
    // maximum readable line-length
    max-width: ${MAX_PROSE_WIDTH};
  }
  p {
    line-height: 1.4;
  }
`;
