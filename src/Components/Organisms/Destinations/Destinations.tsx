import styled from "styled-components";
import { GRID } from "../../../styles/variables";

export const Destinations = styled.table`
  width: 100%;
  thead {
    display: none;
  }

  td {
    padding: ${GRID.QUARTER} ${GRID.HALF};
    min-height: 48px;
  }
`;
