import { createContext } from "react";

import ShipInterface from "../DomainInterfaces/ShipInterface";
import * as React from "react";
import { PlayShipResponse } from "../Models/Ship";
import PortInterface from "../DomainInterfaces/PortInterface";
import ChannelInterface from "../DomainInterfaces/ChannelInterface";
import DirectionsInterface from "../DomainInterfaces/DirectionsInterface";
import ShipNameTokenInterface from "../DomainInterfaces/ShipNameTokenInterface";

interface PropsInterface {
  children: any;
}

interface CurrentShipPropertiesInterface {
  loaded: boolean;
  ship?: ShipInterface;
  requestShipNameToken?: ShipNameTokenInterface;
  port?: PortInterface;
  channel?: ChannelInterface;
  directions?: DirectionsInterface;
  shipsInLocation?: ShipInterface[];
}

export interface CurrentShipContextInterface
  extends CurrentShipPropertiesInterface {
  loadingNewShip: () => void;
  updateCurrentShip: (ship?: ShipInterface) => void;
  updateFullResponse: (data?: PlayShipResponse) => void;
  updateRenameToken: (newToken: ShipNameTokenInterface) => void;
}

export const initial: CurrentShipPropertiesInterface = {
  loaded: false,
  shipsInLocation: []
};

export const CurrentShipContext = createContext({
  ...initial,
  loadingNewShip: () => {},
  updateCurrentShip: () => {},
  updateFullResponse: () => {},
  updateRenameToken: (newToken: ShipNameTokenInterface) => {}
});

class CurrentShipContextComponent extends React.Component<
  PropsInterface,
  CurrentShipContextInterface
> {
  constructor(props: any) {
    super(props);

    this.state = {
      ...initial,
      loadingNewShip: this.loadingNewShip.bind(this),
      updateCurrentShip: this.updateCurrentShip.bind(this),
      updateFullResponse: this.updateFullResponse.bind(this),
      updateRenameToken: this.updateRenameToken.bind(this)
    };
  }

  loadingNewShip(): void {
    this.setState({
      ship: null,
      loaded: false
    });
  }

  updateCurrentShip(ship?: ShipInterface) {
    this.setState({
      ship,
      loaded: true
    });
  }

  updateFullResponse(data?: PlayShipResponse) {
    if (!data) {
      this.setState({
        ...initial
      });
      return;
    }

    this.setState({
      ship: data.ship,
      requestShipNameToken: data.requestShipName,
      port: data.port,
      channel: data.channel,
      directions: data.directions,
      shipsInLocation: data.shipsInLocation
    });
  }

  updateRenameToken(requestShipNameToken: ShipNameTokenInterface) {
    this.setState({
      requestShipNameToken
    });
  }

  render() {
    return (
      <CurrentShipContext.Provider value={this.state}>
        {this.props.children}
      </CurrentShipContext.Provider>
    );
  }
}

export default CurrentShipContextComponent;
