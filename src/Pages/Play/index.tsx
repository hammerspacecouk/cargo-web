import * as React from "react";
import { Route, Switch } from "react-router";

import EditContainer from "./EditContainer";
import ShipContainer from "./ShipContainer";
import FleetContainer from "./FleetContainer";

import NotFound from "../../Components/Error/NotFound";
import PlayBar from "../../Components/Navigation/PlayBar";
import CurrentShipContextComponent from "../../Context/CurrentShipContext";
import UpgradesContainer from "./UpgradesContainer";
import Loading from "../../Components/Navigation/Loading";

export interface ShipParamsInterface {
  match: {
    params: {
      shipId: string;
    };
  };
}

interface StateInterface {
  ready: boolean;
}

export default class PlayIndexContainer extends React.Component<undefined, StateInterface> {

  state = {
    ready: false
  };

  componentDidMount() {
    // to force the game itself to be client side only
    this.setState({ ready: true });
  }

  render() {
    if (!this.state.ready) {
      return (
        <div>
          <div><Loading/></div>
          <div className="text--center">
            To play will require JavaScript to be running successfully
          </div>
        </div>
      ); // todo - nice game loading state for before JS kicks in
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
                path="/play/:shipId/edit"
                component={EditContainer}
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
}
