import * as React from "react";
import styled from "styled-components";
import { CratesAtPort } from "../Components/CratesAtPort";
import { CratesOnShip } from "../Components/CratesOnShip";
import { ChevronUpIcon } from "../../../../components/Icons/ChevronUpIcon/ChevronUpIcon";
import { Icon } from "../../../../components/Atoms/Icon/Icon";
import { COLOURS } from "../../../../styles/colours";
import { GRID } from "../../../../styles/variables";

const CratesLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const FullFlex = styled.div`
  flex: 1;
  display: flex;
  > * {
    width: 100%;
  }
`;

const StyledCratesOnShip = styled(FullFlex)`
  border-bottom: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
`;

const StyledCratesAtPort = styled(FullFlex)`
  border-top: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
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
      <StyledCratesOnShip>
        <CratesOnShip />
      </StyledCratesOnShip>
      <DirectionArrow>
        <Icon>
          <ChevronUpIcon/>
        </Icon>
      </DirectionArrow>
      <StyledCratesAtPort>
        <CratesAtPort />
      </StyledCratesAtPort>
    </CratesLayout>
  );
};
