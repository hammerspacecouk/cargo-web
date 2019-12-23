import * as React from "react";
import { Panel } from "../../../Molecules/Panel";
import { Crates } from "../../../Organisms/ActiveShip/Panels/Crates";
import { Directions } from "../../../Organisms/ActiveShip/Panels/Directions";
import { Tactical } from "../../../Organisms/ActiveShip/Panels/Tactical";
import { Engineering } from "../../../Organisms/ActiveShip/Panels/Engineering";
import styled, { css } from "styled-components";
import { COLOURS } from "../../../../styles/colours";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { Ships } from "../../../Organisms/ActiveShip/Panels/Ships";
import { GRID, MASTHEAD_HEIGHT, NAV_ITEM_HEIGHT, Z_INDEX } from "../../../../styles/variables";
import { ShipNavigation } from "../../../Organisms/ShipNavigation";
import { PortName } from "../../../Molecules/PortName";
import { IPort, IShip } from "../../../../interfaces";
import { ELEMENTS, SIZES } from "../../../../styles/typography";
import { ACTIVE_VIEW } from "../../../../contexts/ActiveShipContext/useActiveShip";
import { BREAKPOINTS } from "../../../../styles/media";
import { EventsList } from "../../../Organisms/EventsList";
import { DisguisedButton } from "../../../Atoms/Button";
import { useTutorial } from "../../../../hooks/useTutorial";
import { useAnimationScene } from "../../../../hooks/useAnimationScene";
import { Port } from "../../../../animation/scene/Port";
import { ShipDisplay } from "../../../../animation/scene/ShipDisplay";

export const ShipInPortPage = () => {
  const { activeView, events, setActiveView, ship, port } = useActiveShipContext();
  const { allowLog } = useTutorial();

  const closeHandler = () => {
    setActiveView(null);
  };

  return (
    <StyledPage>
      {activeView !== ACTIVE_VIEW.LOG && <ShipOverview port={port} ship={ship} isCurrentView={activeView === null} />}

      {activeView === ACTIVE_VIEW.LOG && (
        <StyledLogPanel closeHandler={closeHandler} title="Log" id="log">
          <StyledFullEventsList events={events} />
        </StyledLogPanel>
      )}

      {activeView === ACTIVE_VIEW.CARGO && (
        <StyledShipPanel closeHandler={closeHandler} title="Cargo" id="cargo">
          <Crates />
        </StyledShipPanel>
      )}

      {activeView === ACTIVE_VIEW.NAVIGATION && (
        <StyledShipPanel closeHandler={closeHandler} title="Navigation" id="navigation">
          <Directions />
        </StyledShipPanel>
      )}

      {activeView === ACTIVE_VIEW.TACTICAL && (
        <StyledShipPanel closeHandler={closeHandler} title="Tactical" id="tactical">
          <Tactical />
        </StyledShipPanel>
      )}

      {activeView === ACTIVE_VIEW.SHIPS && (
        <StyledShipPanel closeHandler={closeHandler} title="Ships" id="ships">
          <Ships />
        </StyledShipPanel>
      )}

      {activeView === ACTIVE_VIEW.ENGINEERING && (
        <StyledShipPanel closeHandler={closeHandler} title="Engineering" id="engineering">
          <Engineering />
        </StyledShipPanel>
      )}

      <SubBar>
        {allowLog && activeView === null && (
          <>
            <EventsSummary onClick={() => setActiveView(ACTIVE_VIEW.LOG)}>
              <StyledEventsList events={events} />
            </EventsSummary>
            <Arrow />
          </>
        )}
        <ShipNavigation />
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
  height: calc(1px + ${NAV_ITEM_HEIGHT});
  max-height: 10vh;
  overflow: hidden;
  position: relative;
  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    display: block;
    height: 60%;
    max-height: 80px;
    background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
  }
`;
const Arrow = styled.div`
    height: 0;
    width: 0;
    border: solid ${GRID.UNIT} ${COLOURS.BLACK.FULL};
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    position: absolute;
    top: -${GRID.DOUBLE};
    left: 50%;
    transform: translateX(-50%);
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

// todo - remove magic numbers
const StyledShipPanel = styled(Panel)`
  min-height: calc(100vh - ${MASTHEAD_HEIGHT});
  padding-bottom: 50px;
  ${BREAKPOINTS.XL`
    max-width: 480px;
    position: fixed;
    overflow: auto;
    top: ${MASTHEAD_HEIGHT};
    bottom: 0;
    right: 0;
    border-left: ${COLOURS.PANEL_BORDER} solid 1px;
    padding-bottom: 64px;
  `}
`;

// todo - refactor out
const ShipOverview = ({ port, ship, isCurrentView }: { port: IPort; ship: IShip; isCurrentView: boolean }) => {
  const planetType = port.id.slice(-1); // todo - abstract to API
  const planetCanvasRef = useAnimationScene<HTMLDivElement>(new Port(planetType), [planetType]);
  const shipCanvasRef = useAnimationScene<HTMLDivElement>(new ShipDisplay(), []); // todo - proper watch

  return (
    <StyledOverview isCurrentView={isCurrentView}>
      <PlanetPosition ref={planetCanvasRef} />
      <Detail>
        <h1>
          <TitleName>{ship.name}</TitleName>
          <TitleConjunction> arrived at </TitleConjunction>
          <TitleLocation>
            <PortName port={port} />
          </TitleLocation>
        </h1>
        <ShipPosition ref={shipCanvasRef} />
      </Detail>
    </StyledOverview>
  );
};

const shipSize = "128px";

const StyledOverview = styled.div<{ isCurrentView: boolean }>`
  height: calc(100vh - ${MASTHEAD_HEIGHT});
  padding: 0;
  ${({ isCurrentView }) =>
    !isCurrentView &&
    css`
      display: none;
      ${BREAKPOINTS.XL`display: block;`};
    `}
`;

const PlanetPosition = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ShipPosition = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${NAV_ITEM_HEIGHT};
  height: ${NAV_ITEM_HEIGHT};
`;

const Detail = styled.div`
  position: relative;
`;

const TitleConjunction = styled.span`
  ${ELEMENTS.H6};
  display: block;
  text-align: center;
`;

const TitleLocation = styled.span`
  ${ELEMENTS.H1};
  display: block;
  margin-top: ${GRID.UNIT};
  text-align: center;
`;

const TitleName = styled.span`
  ${ELEMENTS.H3};
  ${SIZES.D};
  display: flex;
  align-items: center;
  min-height: ${NAV_ITEM_HEIGHT};
  margin-bottom: ${GRID.HALF};
  padding: ${GRID.HALF} ${shipSize} ${GRID.HALF} ${GRID.HALF};
  background: ${COLOURS.BLACK.STANDARD};
  border-bottom: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
`;
