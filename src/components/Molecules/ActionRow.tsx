import styled from "styled-components";
import { GRID } from "../../styles/variables";

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionRowContent = styled.div`
  flex: 1;
`;

export const ActionRowButton = styled.div`
  margin-left: ${GRID.UNIT};
  min-width: 64px;
  text-align: right;
`;
