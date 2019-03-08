import styled from "styled-components";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";

export const Table = styled.table`
  width: 100%;
  border: solid 1px ${COLOURS.BODY.FADED};
  thead {
    background: ${COLOURS.BODY.FADED};
  }
  th,
  td {
    text-align: left;
    padding: ${GRID.QUARTER} ${GRID.HALF};
  }
`;

export const TableStriped = styled(Table)`
  tr:nth-child(even) {
    background: ${COLOURS.BLACK.COLOURISED};
  }
`;
