import * as React from "react";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import { grid } from "../GlobalStyle";

import NotFound from "../components/Error/NotFound";
import PlayBar from "../components/Navigation/PlayBar";
import CurrentShipContextComponent from "../context/CurrentShipContext";
import EnsureLoggedIn from "../components/Login/EnsureLoggedIn";
import UpgradesPage from "./Play/UpgradesPage";
import ShipPage from "./Play/ShipPage";
import FleetPage from "./Play/FleetPage";

const navigationHeight = 80;
export const eventsMinimisedHeight = 96;

const StyledPlayArea = styled.div`
  position: relative;
  padding-bottom: ${navigationHeight + eventsMinimisedHeight + grid.unit}px;
`;
const StyledNavigationArea = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: ${navigationHeight}px;
`;
const StyledPlayBoard = styled.div`
  position: relative;
`;

export const EventsArea = styled.div`
  position: fixed;
  bottom: ${navigationHeight}px;
  left: 0;
  right: 0;
  width: 100%;
  height: ${eventsMinimisedHeight}px;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${grid.unit * 3}px;
    background: linear-gradient(to bottom, rgba(28,26,35,0) 0%,#1c1a23 100%);
    pointer-events: none;
  }
`; // todo - rgba conversion from hex

export default function PlayPage() {
  return (
    <EnsureLoggedIn>
      <CurrentShipContextComponent>
        <StyledPlayArea>
          <StyledPlayBoard>
            <Switch>
              <Route
                path="/play/upgrades"
                component={UpgradesPage}
                exact={true}
              />
              <Route path="/play/:shipId" component={ShipPage} exact={true} />
              <Route path="/play" component={FleetPage} exact={true} />
              <Route component={NotFound} />
            </Switch>
          </StyledPlayBoard>
          <StyledNavigationArea>
            <PlayBar />
          </StyledNavigationArea>
        </StyledPlayArea>
      </CurrentShipContextComponent>
    </EnsureLoggedIn>
  );
}
