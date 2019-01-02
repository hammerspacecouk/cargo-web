import * as React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { GRID } from "../styles/variables";

import { NotFound } from "../components/Organisms/Error/NotFound";
import {
  PlayBar,
  playBarHeight,
} from "../components/Organisms/PlayBar/PlayBar";
import { EnsureLoggedIn } from "../containers/Player/EnsureLoggedIn";
import { CurrentShipContextComponent } from "../context/CurrentShipContext";
import FleetPage from "./Play/FleetPage";
import ShipPage from "./Play/ShipPage";
import { UpgradesPage } from "./Play/UpgradesPage";

const StyledPlayArea = styled.div`
  position: relative;
  padding-bottom: calc(${playBarHeight}px + ${GRID.UNIT});
`;

const StyledPlayBoard = styled.div`
  position: relative;
`;

export const PlayPage = () => {
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
          <PlayBar />
        </StyledPlayArea>
      </CurrentShipContextComponent>
    </EnsureLoggedIn>
  );
};
