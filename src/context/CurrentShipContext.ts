import { useContext, useState, createContext, createElement } from "react";

import ShipInterface from "../interfaces/ShipInterface";
import PortInterface from "../interfaces/PortInterface";
import ChannelInterface from "../interfaces/ChannelInterface";
import DirectionsInterface from "../interfaces/DirectionsInterface";
import EventInterface from "../interfaces/EventInterface";
import { CrateActionInterface } from "../interfaces/CrateInterface";
import { ApiClient } from "../util/ApiClient";
import ScoreInterface from "../interfaces/ScoreInterface";
import RankStatusInterface from "../interfaces/RankStatusInterface";

interface PropsInterface {
  children: any;
}

interface ShipLocationResponse {
  // todo - merge with PlayShipResponse
  readonly port?: PortInterface;
  readonly channel?: ChannelInterface;
  readonly directions?: DirectionsInterface;
  readonly shipsInLocation?: ShipInterface[];
  readonly events: EventInterface[];
  readonly playerScore?: ScoreInterface;
  readonly cratesOnShip: CrateActionInterface[];
  readonly cratesInPort?: CrateActionInterface[];
}

interface PlayShipResponse extends ShipLocationResponse {
  readonly ship: ShipInterface;
  readonly playerRankStatus?: RankStatusInterface;
}

interface CurrentShipContextInterface {
  loaded: boolean;
  ship?: ShipInterface;
  port?: PortInterface;
  channel?: ChannelInterface;
  directions?: DirectionsInterface;
  shipsInLocation?: ShipInterface[];
  events?: EventInterface[];
  cratesInPort?: CrateActionInterface[];
  cratesOnShip?: CrateActionInterface[];
  loadingNewShip: () => void;
  updateCurrentShip: (ship?: ShipInterface) => void;
  updateFullResponse: (data?: PlayShipResponse) => void;
  updateShipLocation: (data?: ShipLocationResponse) => void;
  refreshState: () => Promise<PlayShipResponse>;
}

export const CurrentShipContext = createContext({});

// todo - convert to useRouter once ready
export default ({ children }: PropsInterface) => {
  const [loaded, setLoaded] = useState(false);
  const [ship, setShip] = useState(undefined);
  const [port, setPort] = useState(undefined);
  const [channel, setChannel] = useState(undefined);
  const [directions, setDirections] = useState(undefined);
  const [shipsInLocation, setShipsInLocation] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const [cratesInPort, setCratesInPort] = useState(undefined);
  const [cratesOnShip, setCratesOnShip] = useState(undefined);

  const updateFullResponse = (data?: PlayShipResponse) => {
    if (!data) {
      setLoaded(true);
      setShip(undefined);
      setPort(undefined);
      setChannel(undefined);
      setDirections(undefined);
      setShipsInLocation(undefined);
      setEvents(undefined);
      setCratesInPort(undefined);
      setCratesOnShip(undefined);
      return;
    }

    setLoaded(true);
    setShip(data.ship);
    setPort(data.port);
    setChannel(data.channel);
    setDirections(data.directions);
    setShipsInLocation(data.shipsInLocation);
    setEvents(data.events);
    setCratesInPort(data.cratesInPort);
    setCratesOnShip(data.cratesOnShip);
  };

  const refreshState = async (): Promise<PlayShipResponse> => {
    const data = await ApiClient.fetch(`/play/${ship.id}`);
    updateFullResponse(data);
    return data;
  };

  const loadingNewShip = (): void => {
    setShip(undefined);
    setLoaded(false);
  };

  const updateCurrentShip = (ship?: ShipInterface) => {
    setShip(ship);
    setLoaded(true);
  };

  const updateShipLocation = (data: ShipLocationResponse) => {
    setPort(data.port);
    setChannel(data.channel);
    setDirections(data.directions);
    setShipsInLocation(data.shipsInLocation);
    setEvents(data.events);
  };

  return createElement(
    CurrentShipContext.Provider,
    {
      value: {
        loaded,
        ship,
        port,
        channel,
        directions,
        shipsInLocation,
        events,
        cratesInPort,
        cratesOnShip,
        loadingNewShip,
        updateCurrentShip,
        updateFullResponse,
        updateShipLocation,
        refreshState
      }
    },
    children
  );
};

export function useCurrentShipContext(): CurrentShipContextInterface {
  return useContext(CurrentShipContext) as CurrentShipContextInterface;
}
