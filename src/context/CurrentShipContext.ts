import * as React from "react";
import { createContext, createElement } from "react";

import ShipInterface from "../interfaces/ShipInterface";
import { PlayShipResponse, ShipLocationResponse } from "../Models/Ship";
import PortInterface from "../interfaces/PortInterface";
import ChannelInterface from "../interfaces/ChannelInterface";
import DirectionsInterface from "../interfaces/DirectionsInterface";
import EventInterface from "../interfaces/EventInterface";
import { CrateActionInterface } from "../interfaces/CrateInterface";
import PromotionModal from "../components/Player/PromotionModal";
import { useContext } from "react";

interface PropsInterface {
  children: any;
}

interface CurrentShipPropertiesInterface {
  loaded: boolean;
  ship?: ShipInterface;
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
  updateShipLocation: () => {}
});

// todo - convert to useEffect and useReouter to get the ship details
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
      updateShipLocation: this.updateShipLocation
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
    // todo - rename updateFullContext?
    if (!data) {
      this.setState({
        ...initial,
        loaded: true
      });
      return;
    }

    this.setState({
      ship: data.ship,
      port: data.port,
      channel: data.channel,
      directions: data.directions,
      shipsInLocation: data.shipsInLocation,
      events: data.events,
      cratesInPort: data.cratesInPort,
      cratesOnShip: data.cratesOnShip
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

  render() {
    return createElement(
      CurrentShipContext.Provider,
      {
        value: this.state
      },
      this.props.children
    );
  }
}

export default CurrentShipContextComponent;

export function useCurrentShipContext(): CurrentShipContextInterface {
  return useContext(CurrentShipContext);
}
