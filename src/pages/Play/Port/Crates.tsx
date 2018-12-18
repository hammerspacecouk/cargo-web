import * as React from "react";
import styled from "styled-components";
import { CratesOnShip } from "./CratesOnShip";
import { CratesAtPort } from "./CratesAtPort";
import { BREAKPOINTS } from "../../../styles/media";
import { GRID } from "../../../styles/variables";

const CratesLayout = styled.div`
  ${BREAKPOINTS.M`
      display: flex;
      justify-content: center;
      align-items: start;
    `};
`;

const StyledCratesOnShip = styled(CratesOnShip).attrs({
  suppressClassNameWarning: true
})`
  margin-bottom: ${GRID.UNIT};
  ${BREAKPOINTS.M`
      width: 40%;
      margin: 0 ${GRID.UNIT} 0 0;
    `};
`;

const StyledCratesAtPort = styled(CratesAtPort).attrs({
  suppressClassNameWarning: true
})`
  ${BREAKPOINTS.M`
      flex: 1;
    `};
`;

export const Crates = () => {
  return (
    <CratesLayout>
      <StyledCratesOnShip />
      <StyledCratesAtPort />
    </CratesLayout>
  );
};
