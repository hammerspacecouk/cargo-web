import * as React from "react";
import { useActiveShipContext } from "../ActiveShipContext";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../styles/media";
import { PANEL_BORDER } from "../../../../styles/colours";
import { Panel } from "../../../../components/Molecules/Panel/Panel";
import { Hint } from "../Panels/Hint";
import { Bonus } from "../Panels/Bonus";

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
        {bonusEffects && <GeneralPanel title="From head office"><Bonus /></GeneralPanel>}
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
