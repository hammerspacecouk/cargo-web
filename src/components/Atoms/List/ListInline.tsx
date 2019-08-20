import styled from "styled-components";
import { GRID } from "../../../styles/variables";

export const ListInline = styled.ul<{spaced?: boolean}>`
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    display: inline-block;
    position: relative;
    :not(:last-child) {
      ${({spaced}) => spaced && `margin-right: ${GRID.UNIT};`};
    }
  }
`;
