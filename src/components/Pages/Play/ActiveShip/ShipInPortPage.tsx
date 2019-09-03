import * as React from "react";
import { Panel } from "../../../Molecules/Panel";
import { Crates } from "../../../Organisms/ActiveShip/Panels/Crates";
import { Directions } from "../../../Organisms/ActiveShip/Panels/Directions";
import { Tactical } from "../../../Organisms/ActiveShip/Panels/Tactical";
import { Engineering } from "../../../Organisms/ActiveShip/Panels/Engineering";
import styled, { css } from "styled-components";
import { COLOURS, panelBackground } from "../../../../styles/colours";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { Ships } from "../../../Organisms/ActiveShip/Panels/Ships";
import { IntroductionModal } from "../../../Organisms/ActiveShip/IntroductionModal";
import { GRID, MASTHEAD_HEIGHT, Z_INDEX } from "../../../../styles/variables";
import { ShipNavigation } from "../../../Organisms/ShipNavigation";
import { Planet } from "../../../Molecules/Planet";
import { PortName } from "../../../Molecules/PortName";
import { IPort, IShip } from "../../../../interfaces";
import { ELEMENTS, SIZES } from "../../../../styles/typography";
import { Environment } from "../../../../utils/environment";
import { ACTIVE_VIEW } from "../../../../contexts/ActiveShipContext/useActiveShip";
import { BREAKPOINTS } from "../../../../styles/media";
import { EventsList } from "../../../Organisms/EventsList";
import { DisguisedButton } from "../../../Atoms/Button";
import { useTutorial } from "../../../../hooks/useTutorial";

export const ShipInPortPage = () => {
  const { activeView, events, setActiveView, ship } = useActiveShipContext();
  const { allowLog, showIntroduction, } = useTutorial();

  const closeHandler = () => {
    setActiveView(null);
  };

  return (
    <StyledPage>
      {activeView !== ACTIVE_VIEW.LOG && <ShipOverview ship={ship} isCurrentView={activeView === null}/>}

      {activeView === ACTIVE_VIEW.LOG && <StyledLogPanel closeHandler={closeHandler} title="Log" full id="log">
        <StyledFullEventsList events={events} />
      </StyledLogPanel>}

      {activeView === ACTIVE_VIEW.CARGO && <StyledShipPanel closeHandler={closeHandler} title="Cargo" full id="cargo">
        <Crates/>
      </StyledShipPanel>}

      {activeView === ACTIVE_VIEW.NAVIGATION && <StyledShipPanel closeHandler={closeHandler} title="Navigation" id="navigation">
        <Directions/>
      </StyledShipPanel>}

      {activeView === ACTIVE_VIEW.TACTICAL && <StyledShipPanel closeHandler={closeHandler} title="Tactical" id="tactical">
        <Tactical/>
      </StyledShipPanel>}

      {activeView === ACTIVE_VIEW.SHIPS && <StyledShipPanel closeHandler={closeHandler} title="Ships" id="ships">
        <Ships/>
      </StyledShipPanel>}

      {activeView === ACTIVE_VIEW.ENGINEERING && <StyledShipPanel closeHandler={closeHandler} title="Engineering" id="engineering">
        <Engineering/>
      </StyledShipPanel>}

      {showIntroduction && <IntroductionModal/>}
      <SubBar>
        {allowLog && activeView === null && <EventsSummary onClick={() => setActiveView(ACTIVE_VIEW.LOG)}>
          <StyledEventsList events={events} />
        </EventsSummary>}
        <ShipNavigation/>
      </SubBar>
    </StyledPage>
  );
};


const SubBar = styled.div`
    z-index: ${Z_INDEX.PAGE_MIDDLE};
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    ${BREAKPOINTS.XL`
      width: 80%;
    `}
    ${BREAKPOINTS.MAX`
      width: calc(100vw - 400px);
    `}
`;

const EventsSummary = styled(DisguisedButton)`
  width: 100%;
`;

const StyledEventsList = styled(EventsList)`
  padding: ${GRID.UNIT};
  background: ${COLOURS.BLACK.FULL};
  height: 120px;
  max-height: 10vh;
  overflow: hidden;
  position: relative;
  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    display: block;
    height: 60%;
    max-height: 80px;
    background: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
  }
`;

const StyledPage = styled.div`
  position: relative;
`;

const StyledLogPanel = styled(Panel)`
  background: ${COLOURS.BLACK.FULL};
  min-height: calc(100vh - ${MASTHEAD_HEIGHT});
`;

const StyledFullEventsList = styled(EventsList)`
  padding: 0 ${GRID.UNIT} ${GRID.UNIT};
`;

const StyledShipPanel = styled(Panel)`
  min-height: calc(100vh - ${MASTHEAD_HEIGHT});
  ${panelBackground};
  padding-bottom: 64px;
  // todo - this breakpoint choice and value will need tweaking
  ${BREAKPOINTS.XL`
    max-width: 480px;
    position: fixed;
    top: ${MASTHEAD_HEIGHT};
    right: 0;
    border-left: ${COLOURS.PANEL_BORDER} solid 1px;
  `}
`;

// todo - refactor out
const ShipOverview = ({ ship, isCurrentView }: { ship: IShip, isCurrentView: boolean }) => (
  <StyledOverview isCurrentView={isCurrentView}>
    <PlanetPosition>
      <Planet/>
    </PlanetPosition>
    <div>
      <h1>
        <TitleName>{ship.name}</TitleName>
        <TitleConjunction> arrived at </TitleConjunction>
        <TitleLocation>
          <PortName port={ship.location as IPort}/>
        </TitleLocation>
      </h1>
    </div>
    <Ship>
      <ShipImage ship={ship}/>
    </Ship>
  </StyledOverview>
);


const shipSize = "128px";

const StyledOverview = styled.div<{isCurrentView: boolean}>`
  height: calc(100vh - ${MASTHEAD_HEIGHT});
  padding: ${GRID.UNIT} calc(${shipSize} + ${GRID.UNIT}) ${GRID.UNIT} ${GRID.UNIT};
  ${({isCurrentView}) => !isCurrentView && css`
    display: none;
    ${BREAKPOINTS.XL`display: block;`};
  `}
`;

const PlanetPosition = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70vw;
  height: 70vw;
  max-width: 262px;
  max-height: 262px;
  pointer-events: none;
  transform: translateX(-50%) translateY(-50%) rotate(-45deg) ;
`;

const Ship = styled.div`
  width: ${shipSize};
  position: absolute;
  top: ${GRID.QUADRUPLE};
  right: ${GRID.UNIT};
`;


const TitleConjunction = styled.span`
  ${ELEMENTS.H6};
`;

const TitleLocation = styled.span`
  ${ELEMENTS.H1};
  display: block;
  margin-top: ${GRID.UNIT};
`;


const TitleName = styled.span`
  ${ELEMENTS.H3};
  ${SIZES.D};
`;

const ShipImage = ({ ship }: { ship: IShip }) => (
  <img src={`${Environment.clientApiHostname}${ship.shipClass.image}`} alt={`${ship.name} (${ship.shipClass.name})`}/>
);
