import * as React from "react";
import { Panel } from "../../../Molecules/Panel";
import { Crates } from "../../../Organisms/ActiveShip/Panels/Crates";
import { Directions } from "../../../Organisms/ActiveShip/Panels/Directions";
import { Tactical } from "../../../Organisms/ActiveShip/Panels/Tactical";
import { Engineering } from "../../../Organisms/ActiveShip/Panels/Engineering";
import styled from "styled-components";
import { COLOURS, hexToRGBa, PANEL_BORDER } from "../../../../styles/colours";
import { BREAKPOINTS } from "../../../../styles/media";
import { EventsList } from "../../../Organisms/EventsList";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { Ships } from "../../../Organisms/ActiveShip/Panels/Ships";

export const ShipInPortPage = () => {
  const { events } = useActiveShipContext();

  return (
    <Page>
      <PanelCrates>
        <Panel title="Cargo" full>
          <Crates />
        </Panel>
      </PanelCrates>
      <PanelNavigation>
        <Panel title="Navigation">
          <Directions />
        </Panel>
      </PanelNavigation>
      <PanelTactical>
        <Panel title="Tactical">
          <Tactical />
        </Panel>
      </PanelTactical>
      <PanelShips>
        <Panel title="Ships">
          <Ships />
        </Panel>
      </PanelShips>
      <PanelLog>
        <Panel title="Log">
          <StyledEventsList events={events} />
        </Panel>
      </PanelLog>
      <PanelEngineering>
        <Panel title="Engineering">
          <Engineering />
        </Panel>
      </PanelEngineering>
    </Page>
  );
};

const Page = styled.div`
  ${BREAKPOINTS.L`
      display: grid;
      width: 100%;
      grid-template-columns: repeat(10, [col] 10%);
      grid-template-rows: repeat(5, [row] auto);
    `};
`;

const GeneralPanel = styled.div`
  display: flex;
  border-bottom: ${PANEL_BORDER};
`;

const PanelCrates = styled(GeneralPanel)`
  grid-column: col 1 / span 5;
  grid-row: row 1;
  ${BREAKPOINTS.L`
      border-right: ${PANEL_BORDER};
  `};
`;

const PanelNavigation = styled(GeneralPanel)`
  grid-column: col 6 / span 5;
  grid-row: row 1;
  background: ${hexToRGBa(COLOURS.GREY.BLACK, 0.7)};
`;

const PanelTactical = styled(GeneralPanel)`
  grid-column: col 1 / span 10;
  grid-row: row 2;
  ${BREAKPOINTS.MAX`
    grid-column: col 5 / span 6;
  `};
`;

const PanelShips = styled(GeneralPanel)`
  grid-row: row 3;
  grid-column: col 1 / span 10;
  ${BREAKPOINTS.MAX`
    grid-column: col 1 / span 4;
    grid-row: row 2;
      border-right: ${PANEL_BORDER};
  `};
`;

const PanelEngineering = styled(GeneralPanel)`
  grid-column: col 6 / span 5;
  grid-row: row 4;
  ${BREAKPOINTS.L`
    grid-row: row 4;
  `};
`;

const PanelLog = styled(GeneralPanel)`
  grid-column: col 1 / span 5;
  grid-row: row 4;
  background: ${hexToRGBa(COLOURS.EVENTS.BACKGROUND, 0.75)};
  ${BREAKPOINTS.L`
      border-right: ${PANEL_BORDER};
  `};
`;

const StyledEventsList = styled(EventsList)``;
