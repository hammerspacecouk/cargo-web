import * as React from "react";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";

import ShipContainer from "./ShipContainer";
import FleetContainer from "./FleetContainer";

import NotFound from "../../components/Error/NotFound";
import PlayBar from "../../components/Navigation/PlayBar";
import CurrentShipContextComponent from "../../context/CurrentShipContext";
import UpgradesContainer from "./UpgradesContainer";
import Loading from "../../components/Navigation/Loading";

export interface ShipParamsInterface {
  match: {
    params: {
      shipId: string;
    };
  };
}

const requireJs = (
  <div>
    <div>
      <Loading/>
    </div>
    <div className="text--center">
      To play will require JavaScript to be running successfully
    </div>
  </div>
); // todo - nice game loading state for before JS kicks in

export default function PlayIndexContainer() {
  const [readyState, setReadyState] = useState(false);
  useEffect(() => {
    setReadyState(true);
  }, []);

  if (!readyState) {
    return requireJs;
  }

  return (
    <CurrentShipContextComponent>
      <div className="t-play">
        <div className="t-play__board">
          <Switch>
            <Route
              path="/play/upgrades"
              component={UpgradesContainer}
              exact={true}
            />
            <Route
              path="/play/:shipId"
              component={ShipContainer}
              exact={true}
            />
            <Route path="/play" component={FleetContainer} exact={true}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
        <div className="t-play__navigation">
          <PlayBar/>
        </div>
      </div>
    </CurrentShipContextComponent>
  );
}
