import styled from "styled-components";
import { GRID } from "../../styles/variables";

export const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${GRID.UNIT};
  margin-bottom: -${GRID.UNIT};
  > * {
    padding: 0 0 ${GRID.UNIT} ${GRID.UNIT};
  }
`;
