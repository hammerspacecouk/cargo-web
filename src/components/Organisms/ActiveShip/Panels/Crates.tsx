import * as React from "react";
import styled from "styled-components";
import { CratesAtPort } from "../CratesAtPort";
import { CratesOnShip } from "../CratesOnShip";
import { ChevronUpIcon } from "../../../Icons/ChevronUpIcon";
import { Icon } from "../../../Atoms/Icon";
import { GRID } from "../../../../styles/variables";
import { PANEL_INNER_DIVIDER_BORDER } from "../../../../styles/colours";
import { useTutorial } from "../../../../hooks/useTutorial";
import { CratesTutorial } from "../../Tutorial/CratesTutorial";

export const Crates = () => {
  const { showCrateIntro } = useTutorial();
  let tutorial;
  if (showCrateIntro) {
    tutorial = <CratesTutorial />;
  }

  return (
    <>
      {tutorial}
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
    </>
  );
};

const StyledCratesList = styled.div`
  flex: 1;
  display: flex;
  > * {
    width: 100%;
  }
  border-top: ${PANEL_INNER_DIVIDER_BORDER};
  border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
`;

const DirectionArrow = styled.div`
  display: flex;
  justify-content: center;
  opacity: 0.5;
  padding: ${GRID.UNIT} 0;
`;
