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
import { SIZES } from "../../../../styles/typography";

export const ShipInChannelPage = () => {
  const { bonusEffects } = useActiveShipContext();
  const { channel } = useActiveShipContext();
  const { secondsRemaining, percent } = useTravellingState();

  return (
    <div>
      <GeneralPanel title="Travelling">
        <TimeRemaining as="h3">
          <Intro>{channel.destination.name}</Intro>
          <TravelCountdown seconds={secondsRemaining} />
        </TimeRemaining>
        <ProgressBar percent={percent} />
      </GeneralPanel>
      {bonusEffects && bonusEffects.length > 0 && (
        <GeneralPanel title="From headquarters">
          <Intro>For a great performance you have been gifted these to help you on your travels:</Intro>
          <Bonus />
        </GeneralPanel>
      )}
      <GeneralPanel title="Incoming...">
        <Hint />
      </GeneralPanel>
    </div>
  );
};

const Intro = styled.p`
  ${SIZES.D};
  margin-bottom: ${GRID.HALF};
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
