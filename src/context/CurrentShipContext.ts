import { createContext, createElement, useContext, useState } from "react";

import {
  IChannel,
  ICrateAction,
  IDirections,
  IEvent,
  IPort,
  IRankStatus,
  IScore,
  IShip,
} from "../Interfaces";
import { ApiClient } from "../util/ApiClient";

interface IProps {
  children: any;
}

interface ShipLocationResponse {
  // todo - merge with PlayShipResponse
  readonly port?: IPort;
  readonly channel?: IChannel;
  readonly directions?: IDirections;
  readonly shipsInLocation?: IShip[];
  readonly events: IEvent[];
  readonly playerScore?: IScore;
  readonly cratesOnShip: ICrateAction[];
  readonly cratesInPort?: ICrateAction[];
}

interface PlayShipResponse extends ShipLocationResponse {
  readonly ship: IShip;
  readonly playerRankStatus?: IRankStatus;
}

interface ICurrentShipContext {
  loaded: boolean;
  ship?: IShip;
  port?: IPort;
  channel?: IChannel;
  directions?: IDirections;
  shipsInLocation?: IShip[];
  events?: IEvent[];
  cratesInPort?: ICrateAction[];
  cratesOnShip?: ICrateAction[];
  loadingNewShip: () => void;
  updateCurrentShip: (ship?: IShip) => void;
  updateFullResponse: (data?: PlayShipResponse) => void;
  updateShipLocation: (data?: ShipLocationResponse) => void;
  refreshState: () => Promise<PlayShipResponse>;
}

export const CurrentShipContext = createContext({});

// todo - convert to useRouter once ready
export const CurrentShipContextComponent = ({ children }: IProps) => {
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

  const updateCurrentShip = (ship?: IShip) => {
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
        refreshState,
      },
    },
    children
  );
};

export const useCurrentShipContext = (): ICurrentShipContext => {
  return useContext(CurrentShipContext) as ICurrentShipContext;
};
