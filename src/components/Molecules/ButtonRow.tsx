import styled from "styled-components";
import { GRID } from "@src/styles/variables";

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${GRID.UNIT};
  > *:not(:last-child) {
    margin-right: ${GRID.UNIT};
  }
`;
