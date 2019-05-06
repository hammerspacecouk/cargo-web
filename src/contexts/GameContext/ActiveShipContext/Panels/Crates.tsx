import * as React from "react";
import styled from "styled-components";
import { CratesAtPort } from "../Components/CratesAtPort";
import { CratesOnShip } from "../Components/CratesOnShip";
import { ChevronUpIcon } from "../../../../components/Icons/ChevronUpIcon/ChevronUpIcon";
import { Icon } from "../../../../components/Atoms/Icon/Icon";
import { GRID} from "../../../../styles/variables";
import { PANEL_INNER_DIVIDER_BORDER } from "../../../../styles/colours";

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

const StyledCratesList = styled(FullFlex)`
  border-top: ${PANEL_INNER_DIVIDER_BORDER};
  border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
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
      <StyledCratesList>
        <CratesOnShip />
      </StyledCratesList>
      <DirectionArrow>
        <Icon>
          <ChevronUpIcon />
        </Icon>
      </DirectionArrow>
      <StyledCratesList>
        <CratesAtPort />
      </StyledCratesList>
    </CratesLayout>
  );
};
