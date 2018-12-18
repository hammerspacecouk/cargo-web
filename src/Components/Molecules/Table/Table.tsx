import styled from "styled-components";
import { GRID } from "../../../styles/variables";

export const Table = styled.table`
  width: 100%;
  td {
    padding: ${GRID.QUARTER} ${GRID.HALF};
  }
`;
