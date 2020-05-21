import * as React from "react";
import styled from "styled-components";
import { CratesAtPort } from "@src/components/Organisms/ActiveShip/CratesAtPort";
import { CratesOnShip } from "@src/components/Organisms/ActiveShip/CratesOnShip";
import { ChevronUpIcon } from "@src/components/Icons/ChevronUpIcon";
import { Icon } from "@src/components/Atoms/Icon";
import { GRID } from "@src/styles/variables";
import { PANEL_INNER_DIVIDER_BORDER } from "@src/styles/colours";
import { useTutorial } from "@src/hooks/useTutorial";
import { CratesTutorial } from "@src/components/Organisms/Tutorial/CratesTutorial";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { ActionButton } from "@src/components/Atoms/Button";
import { ACTIVE_VIEW } from "@src/contexts/ActiveShipContext/useActiveShip";

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
