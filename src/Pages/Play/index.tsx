import * as React from "react";
import { Route, Switch } from "react-router";

import EditContainer from "./EditContainer";
import ShipContainer from "./ShipContainer";
import FleetContainer from "./FleetContainer";

import NotFound from "../../Components/Error/NotFound";
import PlayBar from "../../Components/Navigation/PlayBar";
import EnsureLoggedIn from "../../Containers/Login/EnsureLoggedIn";
import CurrentShipContextComponent from "../../Context/CurrentShipContext";
import UpgradesContainer from "./UpgradesContainer";
import { SessionContext } from "../../Context/SessionContext";

export interface ShipParamsInterface {
  match: {
    params: {
      shipId: string;
    };
  };
}

interface Props {
  createNewPlayer?: () => void;
}

export default class PlayIndexContainer extends React.Component<Props, undefined> {
  componentDidMount() {
    if (this.props.createNewPlayer) {
      this.props.createNewPlayer();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.createNewPlayer !== prevProps.createNewPlayer &&
      this.props.createNewPlayer
    ) {
      this.props.createNewPlayer();
    }
  }

  render() {
    return (
      <EnsureLoggedIn>
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
                <Route path="/play" component={FleetContainer} exact={true} />
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
}
