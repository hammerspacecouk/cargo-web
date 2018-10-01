import * as React from "react";

import {
  CurrentShipContext,
  CurrentShipContextInterface
} from "../../Context/CurrentShipContext";
import Loading from "../../Components/Navigation/Loading";
import NotFound from "../../Components/Error/NotFound";
import { getPlayDataByShipId } from "../../Models/Ship";
import EnsureLoggedIn from "../../Containers/Login/EnsureLoggedIn";

interface Props {
  shipId: string;
  children: any;
}

interface LocalProps extends Props {
  currentShipContext: CurrentShipContextInterface;
}

class EnsureShipState extends React.Component<LocalProps, undefined> {
  componentDidMount() {
    if (
      !this.props.currentShipContext.ship ||
      this.props.currentShipContext.ship.id !== this.props.shipId
    ) {
      this.changeShip(this.props.shipId);
    }
  }

  async changeShip(shipId: string) {
    this.props.currentShipContext.loadingNewShip();
    try {
      const data = await getPlayDataByShipId(shipId);
      this.props.currentShipContext.updateFullResponse(data);
    } catch (e) {
      // todo - error handling
    }
  }

  render() {
    // todo - check it is your ship (403)
    if (!this.props.currentShipContext.ship) {
      return this.props.currentShipContext.loaded ? (
        <NotFound message="You be making ship up"/>
      ) : (
        <Loading/>
      );
    }
    return this.props.children;
  }
}

export default class extends React.Component<Props, undefined> {
  render() {
    return (
      <EnsureLoggedIn>
        <CurrentShipContext.Consumer>
          {currentShipContext => (
            <EnsureShipState
              {...this.props}
              currentShipContext={currentShipContext}
            />
          )}
        </CurrentShipContext.Consumer>
      </EnsureLoggedIn>
    );
  }
}
