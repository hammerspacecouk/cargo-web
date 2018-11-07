import * as React from "react";
import { Route, Switch } from "react-router";

import ShipContainer from "./Play/ShipPage";
import FleetContainer from "./Play/FleetPage";

import NotFound from "../../components/Error/NotFound";
import PlayBar from "../../components/Navigation/PlayBar";
import CurrentShipContextComponent from "../../context/CurrentShipContext";
import EnsureLoggedIn from "../Login/EnsureLoggedIn";
import UpgradesPage from "./Play/UpgradesPage";
import ShipPage from "./Play/ShipPage";
import FleetPage from "./Play/FleetPage";

export default function PlayPage() {
  return (
    <EnsureLoggedIn>
      <CurrentShipContextComponent>
        <div className="t-play">
          <div className="t-play__board">
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
          </div>
          <div className="t-play__navigation">
            <PlayBar />
          </div>
        </div>
      </CurrentShipContextComponent>
    </EnsureLoggedIn>
  );
}
