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
import { IntroductionModal } from "../../../Organisms/ActiveShip/IntroductionModal";
import { CratesTutorial } from "../../../Organisms/Tutorial/CratesTutorial";
import { TravelTutorial } from "../../../Organisms/Tutorial/TravelTutorial";
import { Z_INDEX } from "../../../../styles/variables";
import { TacticalTutorial } from "../../../Organisms/Tutorial/TacticalTutorial";
import { ShipsTutorial } from "../../../Organisms/Tutorial/ShipsTutorial";
import { ShipNavigation } from "../../../Organisms/ShipNavigation";

export const ShipInPortPage = () => {
  const { events, tutorialStep } = useActiveShipContext();

  let showNavigation = true;
  let showTactical = true;
  let showShips = true;
  let showExtras = true;

  let showIntroduction = false;
  let showCrateIntro = false;
  let showTravelIntro = false;
  let showTacticalIntro = false;
  let showShipsIntro = false;

  if (tutorialStep) {
    if (tutorialStep === 4) {
      showShipsIntro = true;
    }
    if (tutorialStep <= 3) {
      showShips = false;
      showExtras = false;
      showTacticalIntro = true;
    }
    if (tutorialStep <= 2) {
      showTactical = false;
      showTravelIntro = true;
      showTacticalIntro = false;
    }
    if (tutorialStep <= 1) {
      showIntroduction = true;
      showNavigation = false;
      showCrateIntro = true;
      showTravelIntro = false;
      showTacticalIntro = false;
    }
  }

  return (
    <PageWrap>
      <PanelCrates>
        <Panel title="Cargo" full id="cargo">
          <Crates />
        </Panel>
      </PanelCrates>
      {showTravelIntro && <PanelTravelTutorial>
        <Panel title="Tutorial">
          <TravelTutorial />
        </Panel>
      </PanelTravelTutorial>}
      {showNavigation && <PanelNavigation>
        <Panel title="Navigation" id="navigation">
          <Directions />
        </Panel>
      </PanelNavigation>}
      {showCrateIntro && <PanelCrateTutorial>
        <Panel title="Tutorial" id="crates">
          <CratesTutorial />
        </Panel>
      </PanelCrateTutorial>}
      {showTacticalIntro && <PanelTacticalTutorial>
        <Panel title="Tutorial">
          <TacticalTutorial />
        </Panel>
      </PanelTacticalTutorial>}
      {showTactical && <PanelTactical>
        <Panel title="Tactical" id="tactical">
          <Tactical />
        </Panel>
      </PanelTactical>}
      {showShips && <PanelShips>
        <Panel title="Ships" id="ships">
          <Ships />
        </Panel>
      </PanelShips>}
      {showExtras && <PanelLog>
        <Panel title="Log">
          <StyledEventsList events={events} />
        </Panel>
      </PanelLog>}
      {showExtras && <PanelEngineering>
        <Panel title="Engineering" id="engineering">
          <Engineering />
        </Panel>
      </PanelEngineering>}
      {showIntroduction && <IntroductionModal />}
      {showShipsIntro && <ShipsTutorial />}
      <ShipNavigation />
    </PageWrap>
  );
};

const PageWrap = styled.div`
  ${BREAKPOINTS.L`
      display: grid;
      width: 100%;
      grid-template-columns: repeat(10, [col] 10%);
      grid-template-rows: repeat(10, [row] auto);
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

const PanelCrateTutorial = styled(PanelNavigation)`
  background: ${hexToRGBa(COLOURS.SEMANTIC.OK.BACKGROUND, 0.7)};
  color: ${COLOURS.SEMANTIC.OK.FOREGROUND};
`;

const PanelTravelTutorial = styled(PanelCrates)`
  background: ${hexToRGBa(COLOURS.SEMANTIC.OK.BACKGROUND, 0.9)};
  color: ${COLOURS.SEMANTIC.OK.FOREGROUND};
  z-index: ${Z_INDEX.DEFAULT};
`;

const PanelTactical = styled(GeneralPanel)`
  grid-column: col 1 / span 10;
  grid-row: row 3;
  ${BREAKPOINTS.MAX`
    grid-column: col 5 / span 6;
  `};
`;

const PanelShips = styled(GeneralPanel)`
  grid-row: row 4;
  grid-column: col 1 / span 10;
  ${BREAKPOINTS.MAX`
    grid-column: col 1 / span 4;
    grid-row: row 3;
      border-right: ${PANEL_BORDER};
  `};
`;

const PanelTacticalTutorial = styled(PanelShips)`
  grid-row: row 2;
  background: ${hexToRGBa(COLOURS.SEMANTIC.OK.BACKGROUND, 0.7)};
  color: ${COLOURS.SEMANTIC.OK.FOREGROUND};
`;

const PanelEngineering = styled(GeneralPanel)`
  grid-column: col 6 / span 5;
  grid-row: row 10;
`;

const PanelLog = styled(GeneralPanel)`
  grid-column: col 1 / span 5;
  grid-row: row 10;
  background: ${hexToRGBa(COLOURS.EVENTS.BACKGROUND, 0.75)};
  ${BREAKPOINTS.L`
      border-right: ${PANEL_BORDER};
  `};
`;

const StyledEventsList = styled(EventsList)``;
