import styled from "styled-components";
import { GRID } from "../../styles/variables";

export const ButtonRow = styled.div`
  text-align: center;
  > * {
    display: inline-block;
    &:not(:first-child) {
      margin-left: ${GRID.UNIT};
    }
  }
`;
