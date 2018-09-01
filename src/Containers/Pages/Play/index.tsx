import * as React from "react";
import { Route, Switch } from "react-router";

import CargoContainer from "./CargoContainer";
import EditContainer from "./EditContainer";
import MapContainer from "./MapContainer";
import PlayContainer from "./PlayContainer";
import PortfolioContainer from "./PortfolioContainer";
import ToolsContainer from "./ToolsContainer";
import WelcomeContainer from "./WelcomeContainer";

import NotFound from "../../../Components/Error/NotFound";
import PlayBar from "../../../Components/PlayBar";
import EnsureLoggedIn from "../../Common/EnsureLoggedIn";
import { CurrentShipContext } from "../../../Context/CurrentShipContext";

export interface ShipParamsInterface {
  match: {
    params: {
      shipId: string;
    };
  };
}

export default () => (
  <EnsureLoggedIn>
    <div className="t-play">
      <div className="t-play__board">
        <Switch>
          <Route
            path="/play/portfolio"
            component={PortfolioContainer}
            exact={true}
          />
          <Route path="/play/tools" component={ToolsContainer} exact={true} />
          <Route
            path="/play/:shipId/cargo"
            component={CargoContainer}
            exact={true}
          />
          <Route
            path="/play/:shipId/map"
            component={MapContainer}
            exact={true}
          />
          <Route
            path="/play/:shipId/edit"
            component={EditContainer}
            exact={true}
          />
          <Route path="/play/:shipId" component={PlayContainer} exact={true} />
          <Route path="/play" component={WelcomeContainer} exact={true} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <div className="t-play__navigation">
        <CurrentShipContext.Consumer>
          {({ ship }) => <PlayBar ship={ship} />}
        </CurrentShipContext.Consumer>
      </div>
    </div>
  </EnsureLoggedIn>
);
