import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";

export const TutorialPanel = styled.div`
  padding: ${GRID.UNIT};
  background: ${COLOURS.TUTORIAL.BACKGROUND};
  color: ${COLOURS.TUTORIAL.TEXT};
  margin-bottom: ${GRID.UNIT};
`;
