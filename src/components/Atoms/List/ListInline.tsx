import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";

export const ListInline = styled.ul<{ spaced?: boolean; lined?: boolean }>`
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    display: inline-block;
    position: relative;
    :not(:last-child) {
      ${({ spaced }) => spaced && `margin-right: ${GRID.UNIT};`};
      ${({ lined }) =>
        lined &&
        `
        margin-right: ${GRID.UNIT};
        padding-right: ${GRID.UNIT};
        border-right: solid 1px ${COLOURS.KEY_LINE}
      `};
    }
  }
`;
