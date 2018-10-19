import { createContext } from "react";

import ShipInterface from "../DomainInterfaces/ShipInterface";
import * as React from "react";
import { PlayShipResponse, ShipLocationResponse } from "../Models/Ship";
import PortInterface from "../DomainInterfaces/PortInterface";
import ChannelInterface from "../DomainInterfaces/ChannelInterface";
import DirectionsInterface from "../DomainInterfaces/DirectionsInterface";
import ShipNameTokenInterface from "../DomainInterfaces/ShipNameTokenInterface";
import EventInterface from "../DomainInterfaces/EventInterface";
import { CrateActionInterface } from "../DomainInterfaces/CrateInterface";

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
  events?: EventInterface[];
  cratesInPort?: CrateActionInterface[];
  cratesOnShip?: CrateActionInterface[];
}

export interface CurrentShipContextInterface
  extends CurrentShipPropertiesInterface {
  loadingNewShip: () => void;
  updateCurrentShip: (ship?: ShipInterface) => void;
  updateFullResponse: (data?: PlayShipResponse) => void;
  updateShipLocation: (data?: ShipLocationResponse) => void;
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
  updateShipLocation: () => {},
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
      loadingNewShip: this.loadingNewShip,
      updateCurrentShip: this.updateCurrentShip,
      updateFullResponse: this.updateFullResponse,
      updateShipLocation: this.updateShipLocation,
      updateRenameToken: this.updateRenameToken
    };
  }

  loadingNewShip = (): void => {
    this.setState({
      ship: null,
      loaded: false
    });
  };

  updateCurrentShip = (ship?: ShipInterface) => {
    this.setState({
      ship,
      loaded: true
    });
  };

  updateFullResponse = (data?: PlayShipResponse) => {
    if (!data) {
      this.setState({
        ...initial,
        loaded: true
      });
      return;
    }

    this.setState({
      ship: data.ship,
      requestShipNameToken: data.requestShipName,
      port: data.port,
      channel: data.channel,
      directions: data.directions,
      shipsInLocation: data.shipsInLocation,
      events: data.events,
      cratesInPort: data.cratesInPort,
      cratesOnShip: data.cratesOnShip,
    });
  };

  updateShipLocation = (data: ShipLocationResponse) => {
    this.setState({
      port: data.port,
      channel: data.channel,
      directions: data.directions,
      shipsInLocation: data.shipsInLocation,
      events: data.events
    });
  };

  updateRenameToken = (requestShipNameToken: ShipNameTokenInterface) => {
    this.setState({
      requestShipNameToken
    });
  };

  render() {
    return (
      <CurrentShipContext.Provider value={this.state}>
        {this.props.children}
      </CurrentShipContext.Provider>
    );
  }
}

export default CurrentShipContextComponent;
