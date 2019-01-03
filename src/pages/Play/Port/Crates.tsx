import * as React from "react";
import styled from "styled-components";
import { COLOURS } from "../../../styles/colours";
import { BREAKPOINTS } from "../../../styles/media";
import { GRID } from "../../../styles/variables";
import { CratesAtPort } from "./CratesAtPort";
import { CratesOnShip } from "./CratesOnShip";

const CratesLayout = styled.div`
  ${BREAKPOINTS.M`
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: ${GRID.UNIT};
      margin-bottom: ${GRID.UNIT};
      border-bottom: solid 1px ${COLOURS.GREY.MID};
    `};
`;

const StyledCratesOnShip = styled(CratesOnShip).attrs({
  suppressClassNameWarning: true,
})`
  margin-bottom: ${GRID.UNIT};
  ${BREAKPOINTS.M`
      width: 40%;
      margin: 0 ${GRID.UNIT} 0 0;
    `};
`;

const StyledCratesAtPort = styled(CratesAtPort).attrs({
  suppressClassNameWarning: true,
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