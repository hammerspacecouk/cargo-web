import * as React from "react";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../styles/media";
import { PANEL_BORDER } from "../../../../styles/colours";
import { Panel } from "../../../Molecules/Panel";
import { Hint } from "../../../Organisms/ActiveShip/Panels/Hint";
import { Bonus } from "../../../Organisms/ActiveShip/Panels/Bonus";

/*
todo - rebuild this logic
  const { bonusEffects, channel, hint } = useCurrentShipContext();
 const { secondsRemaining, percent } = useTravellingState();

 let remaining: any = "Arriving...";
 if (secondsRemaining) {
    remaining = <IntervalFormat seconds={secondsRemaining} />;
  }

 return (
 <div>
 <H2>Destination: {channel.destination.name}</H2>
 <TextCenter as="h3">{remaining}</TextCenter>
 <ProgressBar percent={percent} />
 <BonusEffects effects={bonusEffects} />
 <TextCenter>{hint}</TextCenter>
 </div>
 */

export const ShipInChannelPage = () => {
  const { bonusEffects } = useActiveShipContext();

  return (
    <Page>
      <Column>
        <GeneralPanel title="Travelling">COUNTDOWN</GeneralPanel>
        <GeneralPanel title="Incoming...">
          <Hint />
        </GeneralPanel>
      </Column>
      <Column>
        {bonusEffects && (
          <GeneralPanel title="From head office">
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
