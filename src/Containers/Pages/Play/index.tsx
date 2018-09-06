import * as React from "react";
import { Route, Switch } from "react-router";

import EditContainer from "./EditContainer";
import PlayContainer from "./PlayContainer";
import FleetContainer from "./FleetContainer";
import WelcomeContainer from "./WelcomeContainer";

import NotFound from "../../../Components/Error/NotFound";
import PlayBar from "../../../Components/PlayBar";
import EnsureLoggedIn from "../../Common/EnsureLoggedIn";
import CurrentShipContextComponent from "../../../Context/CurrentShipContext";
import UpgradesContainer from "./UpgradesContainer";
import { SessionContext } from "../../../Context/SessionContext";

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

class PlayIndexContainer extends React.Component<Props, undefined> {
  componentDidMount() {
    if (this.props.createNewPlayer) {
      this.props.createNewPlayer();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.createNewPlayer !== prevProps.createNewPlayer
      && this.props.createNewPlayer
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
              <PlayBar/>
            </div>
          </div>
        </CurrentShipContextComponent>
      </EnsureLoggedIn>
    );
  }
}

export default () => (
  <SessionContext.Consumer>
    {({ createNewPlayer, player, playerFetched }) => (
      <PlayIndexContainer
        createNewPlayer={(playerFetched && !player) ? createNewPlayer : null}
      />
    )}
  </SessionContext.Consumer>
);
