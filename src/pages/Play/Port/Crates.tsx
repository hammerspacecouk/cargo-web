import * as React from "react";
import styled from "styled-components";
import { CratesAtPort } from "../../../contexts/GameContext/ActiveShipContext/Components/CratesAtPort";
import { CratesOnShip } from "../../../contexts/GameContext/ActiveShipContext/Components/CratesOnShip";
import { ChevronUpIcon } from "../../../components/Icons/ChevronUpIcon/ChevronUpIcon";
import { Icon } from "../../../components/Atoms/Icon/Icon";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";

const CratesLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const StyledCratesOnShip = styled(CratesOnShip).attrs({
  suppressClassNameWarning: true,
})`
  flex: 1;
  border-bottom: solid 1px ${COLOURS.GREY.DARKER};
`;

const StyledCratesAtPort = styled(CratesAtPort).attrs({
  suppressClassNameWarning: true,
})`
  flex: 1;
  border-top: solid 1px ${COLOURS.GREY.DARKER};
`;

const DirectionArrow = styled.div`
    display: flex;
    justify-content: center;
    opacity: 0.5;
    padding: ${GRID.UNIT} 0;
`;

export const Crates = () => {
  return (
    <CratesLayout>
      <StyledCratesOnShip />
      <DirectionArrow>
        <Icon>
          <ChevronUpIcon/>
        </Icon>
      </DirectionArrow>
      <StyledCratesAtPort />
    </CratesLayout>
  );
};
