import * as React from "react";
import { Route, Switch } from "react-router";

import EditContainer from "./EditContainer";
import PlayContainer from "./PlayContainer";
import FleetContainer from "./FleetContainer";
import WelcomeContainer from "./WelcomeContainer";

import NotFound from "../../../Components/Error/NotFound";
import PlayBar from "../../../Components/PlayBar";
import EnsureLoggedIn from "../../Common/EnsureLoggedIn";
import { CurrentShipContext } from "../../../Context/CurrentShipContext";
import CurrentShipContextComponent from "../../../Context/CurrentShipContext";
import UpgradesContainer from "./UpgradesContainer";

export interface ShipParamsInterface {
  match: {
    params: {
      shipId: string;
    };
  };
}

export default () => (
  <EnsureLoggedIn>
    <CurrentShipContextComponent>
      <div className="t-play">
        <div className="t-play__board">
          <Switch>
            <Route
              path="/play/fleet"
              component={FleetContainer}
              exact={true}
            />
            <Route
              path="/play/upgrades"
              component={UpgradesContainer}
              exact={true}
            />
            <Route
              path="/play/:shipId/edit"
              component={EditContainer}
              exact={true}
            />
            <Route path="/play/:shipId" component={PlayContainer} exact={true}/>
            <Route path="/play" component={WelcomeContainer} exact={true}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
        <div className="t-play__navigation">
          <PlayBar />
        </div>
      </div>
    </CurrentShipContextComponent>
  </EnsureLoggedIn>
);
