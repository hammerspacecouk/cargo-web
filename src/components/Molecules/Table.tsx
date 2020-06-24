import styled from "styled-components";
import { COLOURS } from "@src/styles/colours";
import { GRID } from "@src/styles/variables";

export const Table = styled.table`
  width: 100%;
  thead {
    background: ${COLOURS.BODY.BACKGROUND};
    border-bottom: solid 1px ${COLOURS.KEY_LINE};
  }
  th {
    font-weight: bold;
  }
  th,
  td {
    text-align: left;
    padding: ${GRID.HALF} ${GRID.UNIT};
    border-bottom: solid 1px ${COLOURS.KEY_LINE};
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
`;

export const TableSubtle = styled(Table)`
  th,
  td {
    border: none;
  }
`;

export const TableStriped = styled(Table)`
  tr:nth-child(even) {
    background: ${COLOURS.BLACK.FADED};
  }
`;
