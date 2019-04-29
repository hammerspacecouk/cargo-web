import * as React from "react";
import styled from "styled-components";
import { COLOURS } from "../../../../styles/colours";
import { Panel } from "../../../../components/Molecules/Panel/Panel";
import { BREAKPOINTS } from "../../../../styles/media";
import { Directions } from "../Components/Directions";
import { Crates } from "../../../../pages/Play/Port/Crates";
import { Hidden } from "../../../../components/Atoms/Hidden/Hidden";

interface IProps {
  className?: string;
}

const Page = styled.div`
    background: ${COLOURS.GREY.DARKEST};
    ${BREAKPOINTS.L`
      display: grid;
      grid-template-columns: repeat(10, [col] 10%);
      grid-template-rows: repeat(3, [row] auto);
    `};
`;

const GeneralPanel = styled.div`
    display: flex;
    border-bottom: solid 1px ${COLOURS.PANEL_BORDER};
    ${BREAKPOINTS.L`
      &:nth-child(2n + 1) {
          border-right: solid 1px ${COLOURS.PANEL_BORDER};
      }
    `};
`;

const PanelCrates = styled(GeneralPanel)`
    grid-column: col 1 / span 5;
    grid-row: row 1;
`;

const PanelNavigation = styled(GeneralPanel)`
    grid-column: col 6 / span 5;
    grid-row: row 1;
    background: ${COLOURS.GREY.BLACK};
`;

const PanelShips = styled(GeneralPanel)`
    grid-column: col 1 / span 6;
    grid-row: row 2;
`;

const PanelTrade = styled(GeneralPanel)`
    grid-column: col 7 / span 4;
    grid-row: row 2;
`;

const PanelLog = styled(GeneralPanel)`
    grid-column: col 1 / span 4;
    grid-row: row 3;
    background: ${COLOURS.EVENTS.BACKGROUND};
`;

const PanelEngineering = styled(GeneralPanel)`
    grid-column: col 5 / span 6;
    grid-row: row 3;
`;



// todo - if travelling this is very different
export const ShipDetailPage = ({className}: IProps) => {
  return (
    <Page className={className}>
      <PanelCrates>
        <Hidden as="h2">Cargo</Hidden>
        <Crates />
      </PanelCrates>
      <PanelNavigation>
        <Hidden as="h2">Navigation</Hidden>
        <Directions />
      </PanelNavigation>
      <PanelShips>
        <Panel title="Tactical">
          stuff
        </Panel>
      </PanelShips>
      <PanelTrade>
        <Panel title="Trade">
          stuff
        </Panel>
      </PanelTrade>
      <PanelLog>
        <Panel title="Log">
          stuff
        </Panel>
      </PanelLog>
      <PanelEngineering>
        <Panel title="Engineering">
          stuff
        </Panel>
      </PanelEngineering>
    </Page>
  );
};
