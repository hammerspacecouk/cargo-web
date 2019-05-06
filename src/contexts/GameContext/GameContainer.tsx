import * as React from "react";
import { Route, Switch } from "react-router-dom";
import styled, { css } from "styled-components";

import { NotFound } from "../../components/Organisms/Error/NotFound";
import { FleetPage } from "../../pages/Play/FleetPage";
import { ShipPage } from "../../pages/Play/ShipPage";
import { InventoryPage } from "../../pages/Play/InventoryPage";
import { PromotionModal } from "./Components/PromotionModal";
import { GameContextComponent } from "./GameContext";
import { Masthead } from "./Components/Masthead";
import { Navigation } from "./Components/Navigation";
import { BREAKPOINTS } from "../../styles/media";
import { LandingPage } from "./Page/LandingPage";
import { MASTHEAD_HEIGHT } from "../../styles/variables";
import { scrollbarStyles } from "../../styles/colours";
import { PlayHome } from "../../pages/Play/PlayHome";
import { ActiveShipContainer } from "./ActiveShipContext/ActiveShipContainer";
import { routes } from "../../routes";

const StyledPlayBoard = styled.div`
  ${BREAKPOINTS.XL`
  display: flex;
  `};
`;

const StyledNavigation = styled(Navigation)`
  min-height: calc(100vh - ${MASTHEAD_HEIGHT} - 1px);
  display: flex;
  ${BREAKPOINTS.XL`
    width: 20%;
    max-width: 400px;
    min-width: 240px;
    height: calc(100vh - ${MASTHEAD_HEIGHT} - 1px);
    order: 1;
  `}
`;

const StyledMain = styled.main`
  ${BREAKPOINTS.XL`
    flex: 1;
    order: 2;
    padding: 0;
    height: calc(100vh - ${MASTHEAD_HEIGHT} - 1px);
    overflow-y: auto;
    ${scrollbarStyles}
    `};
`;

export const GameContainer = () => {
  return (
    <GameContextComponent>
      <Masthead />
      <StyledPlayBoard>
        <StyledMain>
          <Switch>
            <Route
              path={routes.getPlayLog()}
              component={PlayHome}
              exact={true}
            />
            <Route
              path={routes.getPlayShip()}
              component={ActiveShipContainer}
            />
            <Route
              path={routes.getPlay()}
              component={LandingPage}
              exact={true}
            />
            <Route component={NotFound} />
          </Switch>
        </StyledMain>
        <StyledNavigation />
      </StyledPlayBoard>
      <PromotionModal />
    </GameContextComponent>
  );
};
