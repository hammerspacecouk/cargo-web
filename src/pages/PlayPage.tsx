import * as React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { NotFound } from "../components/Organisms/Error/NotFound";
import { EnsureLoggedIn } from "../containers/Player/EnsureLoggedIn";
import { CurrentShipContextComponent } from "../context/CurrentShipContext";
import { FleetPage } from "./Play/FleetPage";
import { ShipPage } from "./Play/ShipPage";
import { InventoryPage } from "./Play/InventoryPage";
import { PromotionModal } from "../components/Organisms/PromotionModal/PromotionModal";
import { Menu } from "../components/Organisms/Menu/Menu";

const StyledPlayArea = styled.div`
  position: relative;
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
                path="/play/inventory"
                component={InventoryPage}
                exact={true}
              />
              <Route path="/play/:shipId" component={ShipPage} exact={true} />
              <Route path="/play" component={FleetPage} exact={true} />
              <Route component={NotFound} />
            </Switch>
          </StyledPlayBoard>
        </StyledPlayArea>
        <PromotionModal />
        <Menu />
      </CurrentShipContextComponent>
    </EnsureLoggedIn>
  );
};
