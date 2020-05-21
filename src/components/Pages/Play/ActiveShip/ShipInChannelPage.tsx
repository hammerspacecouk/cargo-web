import * as React from "react";
import { useMemo } from "react";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import styled from "styled-components";
import { BREAKPOINTS } from "@src/styles/media";
import { PANEL_BORDER } from "@src/styles/colours";
import { Panel } from "@src/components/Molecules/Panel";
import { Hint } from "@src/components/Organisms/ActiveShip/Panels/Hint";
import { Bonus } from "@src/components/Organisms/ActiveShip/Panels/Bonus";
import { TextCenter } from "@src/components/Atoms/Text";
import { ProgressBar } from "@src/components/Atoms/ProgressBar";
import { useTravellingState } from "@src/hooks/useTravellingState";
import { GRID, MASTHEAD_HEIGHT } from "@src/styles/variables";
import { TravelCountdown } from "@src/components/Atoms/TravelCountdown";
import { SIZES } from "@src/styles/typography";
import { TravellingShip } from "@src/components/Organisms/ActiveShip/TravellingShip";

export const ShipInChannelPage = () => {
  const { bonusEffects, channel, ship, hint } = useActiveShipContext();
  const { secondsRemaining, secondsTravelled, percent } = useTravellingState();

  const lockedHint = useMemo(() => hint, []);
  const lockedBonus = useMemo(() => bonusEffects, []);

  return (
    <div>
      <Intro>
        <Title>
          <ShipName>{ship.name}</ShipName>
          <Is> is travelling to </Is>
          <Destination>{channel.destination.name}</Destination>
        </Title>
        <Animation ship={ship} channel={channel} />
        <StyledProgressBar percent={percent} />
        <TimeRemaining as="h3">
          <TravelCountdown seconds={secondsRemaining} travelled={secondsTravelled} />
        </TimeRemaining>
      </Intro>
      <Extra>
        {lockedBonus && lockedBonus.length > 0 && (
          <GeneralPanel title="Bonus">
            <PanelText>
              For a great performance Headquarters have granted you these tactical advantages to help you on your
              travels:
            </PanelText>
            <Bonus bonusEffects={lockedBonus} />
          </GeneralPanel>
        )}
        <GeneralPanel title="Incoming...">
          <Hint hint={lockedHint} />
        </GeneralPanel>
      </Extra>
    </div>
  );
};

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${GRID.DOUBLE} 0;
  min-height: calc(70vh - ${MASTHEAD_HEIGHT});
`;
const Title = styled.h1`
  text-align: center;
  margin: 0 ${GRID.UNIT};
  > * {
    display: block;
    margin-bottom: ${GRID.HALF};
  }
`;

const ShipName = styled.span`
  ${SIZES.B};
`;
const Is = styled.span`
  ${SIZES.F};
`;
const Destination = styled.span`
  ${SIZES.C};
`;
const Animation = styled(TravellingShip)`
  flex: 1;
  width: 100%;
  overflow-x: hidden;
  min-height: 40vh;
`;

const Extra = styled.div`
  > * {
    border-top: ${PANEL_BORDER};
    border-bottom: ${PANEL_BORDER};
  }
  ${BREAKPOINTS.L`
    display: flex;
    align-items: stretch;
    > * {
      border-bottom: none;
      &:nth-child(2) {
        border-left: ${PANEL_BORDER};
      }
    }
  `};
`;

const StyledProgressBar = styled(ProgressBar)`
  margin: ${GRID.UNIT} 0 ${GRID.HALF};
  max-width: 400px;
  width: calc(100% - ${GRID.DOUBLE});
`;

const TimeRemaining = styled(TextCenter)`
  margin: 0 ${GRID.UNIT};
`;
const GeneralPanel = styled(Panel)`
  min-height: calc(30vh - 1px);
`;
const PanelText = styled.p`
  margin-bottom: ${GRID.UNIT};
`;
