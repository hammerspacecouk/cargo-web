import * as React from "react";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../styles/media";
import { PANEL_BORDER } from "../../../../styles/colours";
import { Panel } from "../../../Molecules/Panel";
import { Hint } from "../../../Organisms/ActiveShip/Panels/Hint";
import { Bonus } from "../../../Organisms/ActiveShip/Panels/Bonus";
import { TextCenter } from "../../../Atoms/Text";
import { ProgressBar } from "../../../Atoms/ProgressBar";
import { useTravellingState } from "../../../../hooks/useTravellingState";
import { GRID } from "../../../../styles/variables";
import { TravelCountdown } from "../../../Atoms/TravelCountdown";

export const ShipInChannelPage = () => {
  const { bonusEffects } = useActiveShipContext();
  const { secondsRemaining, percent } = useTravellingState();

  return (
    <Page>
      <Column>
        <GeneralPanel title="Travelling">
          <TimeRemaining as="h3"><TravelCountdown seconds={secondsRemaining} /></TimeRemaining>
          <ProgressBar percent={percent} />
        </GeneralPanel>
        <GeneralPanel title="Incoming...">
          <Hint />
        </GeneralPanel>
      </Column>
      <Column>
        {bonusEffects && bonusEffects.length > 0 && (
          <GeneralPanel title="From headquarters">
            <Bonus />
          </GeneralPanel>
        )}
        <GeneralPanel title="Tactical">TACTICAL</GeneralPanel>
      </Column>
    </Page>
  );
};

const Page = styled.div`
  ${BREAKPOINTS.L`
      display: flex;
    `};
`;

const Column = styled.div`
  ${BREAKPOINTS.L`
      width: 50%;
      &:first-child {
        border-right: ${PANEL_BORDER};
      }
    `};
`;

const GeneralPanel = styled(Panel)`
  border-bottom: ${PANEL_BORDER};
  ${BREAKPOINTS.L`
    &:last-child {
      border-bottom: none;
    }
  `}
`;

const TimeRemaining = styled(TextCenter)`
  margin-bottom: ${GRID.UNIT};
`;
