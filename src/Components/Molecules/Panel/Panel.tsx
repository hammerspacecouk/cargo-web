import styled from "styled-components";
import { H2 } from "../../Atoms/Heading/Heading";
import { GRID } from "../../../styles/variables";

export const Panel = styled.div`
  padding: ${GRID.UNIT};
  border: solid 1px;
  border-radius: 4px;
`;

export const PanelTitle = styled(H2)`
  margin-bottom: ${GRID.UNIT};
`;
