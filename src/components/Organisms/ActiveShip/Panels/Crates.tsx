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
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { ActionButton } from "../../../Atoms/Button";
import { ACTIVE_VIEW } from "../../../../contexts/ActiveShipContext/useActiveShip";

export const Crates = () => {
  const { cratesOnShip, ship, setActiveView } = useActiveShipContext();
  const { showCrateIntro } = useTutorial();
  let tutorial;
  if (showCrateIntro) {
    tutorial = <CratesTutorial />;
  }

  let onwardJourney;
  if (cratesOnShip.length >= ship.shipClass.capacity) {
    onwardJourney = <ActionButton onClick={() => setActiveView(ACTIVE_VIEW.NAVIGATION)}>Navigation</ActionButton>;
  }

  return (
    <>
      {tutorial}
      <StyledCratesList>
        <CratesOnShip />
      </StyledCratesList>
      <Indicator>
        {onwardJourney || (
          <Icon>
            <ChevronUpIcon />
          </Icon>
        )}
      </Indicator>
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
  margin: 0 -${GRID.UNIT};
  border-top: ${PANEL_INNER_DIVIDER_BORDER};
  border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
`;

const Indicator = styled.div`
  display: flex;
  justify-content: center;
  padding: ${GRID.UNIT} 0;
`;
