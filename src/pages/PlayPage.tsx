import * as React from "react";
import { Route, Switch } from "react-router-dom";
import styled, { css } from "styled-components";

import { NotFound } from "../components/Organisms/Error/NotFound";
import { FleetPage } from "./Play/FleetPage";
import { ShipPage } from "./Play/ShipPage";
import { InventoryPage } from "./Play/InventoryPage";
import { PromotionModal } from "../components/Organisms/PromotionModal/PromotionModal";
import { GameContextComponent } from "../context/GameContext";
import { Masthead } from "../components/Organisms/Masthead/Masthead";
import { Navigation } from "../components/Organisms/Navigation/Navigation";
import { BREAKPOINTS } from "../styles/media";
import { LandingPage } from "./Play/LandingPage";
import { MASTHEAD_HEIGHT } from "../styles/variables";
import { scrollbars } from "../styles/colours";

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
    ${scrollbars}
    `};
`;

export const PlayPage = () => {
  return (
    <GameContextComponent>
      <Masthead />
      <StyledPlayBoard>
        <StyledMain>
          <Switch>
            {/*<Route*/}
            {/*path="/play/inventory"*/}
            {/*component={InventoryPage}*/}
            {/*exact={true}*/}
            {/*/>*/}
            {/*<Route path="/play/:shipId" component={ShipPage} exact={true} />*/}
            <Route path="/play" component={LandingPage} exact={true} />
            <Route component={NotFound} />
          </Switch>
        </StyledMain>
        <StyledNavigation />
      </StyledPlayBoard>

      {/*<StyledPlayArea>*/}
      {/*<StyledPlayBoard>*/}

      {/*</StyledPlayBoard>*/}
      {/*</StyledPlayArea>*/}
      {/*<PromotionModal />*/}
    </GameContextComponent>
  );
};
