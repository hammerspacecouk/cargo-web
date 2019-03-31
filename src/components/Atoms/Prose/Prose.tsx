import styled from "styled-components";
import { GRID } from "../../../styles/variables";

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
    max-width: 704px;
  }
  p {
    line-height: 1.4;
  }
`;
