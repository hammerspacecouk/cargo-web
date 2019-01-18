import { createContext, createElement, useContext, useState } from "react";

import {
  IChannel,
  ICrateAction,
  IDirections, IEffect,
  IEvent,
  IPort,
  IRankStatus,
  IScore,
  IShip
} from "../Interfaces";
import { ApiClient } from "../util/ApiClient";

interface IProps {
  children: any;
}

interface IShipLocationResponse {
  // todo - merge with IPlayShipResponse
  readonly port?: IPort;
  readonly channel?: IChannel;
  readonly directions?: IDirections;
  readonly shipsInLocation?: IShip[];
  readonly events: IEvent[];
  readonly playerScore?: IScore;
  readonly cratesOnShip: ICrateAction[];
  readonly cratesInPort?: ICrateAction[];
}

interface IPlayShipResponse extends IShipLocationResponse {
  readonly ship: IShip;
  readonly playerRankStatus?: IRankStatus;
  readonly hint?: string;
  readonly bonus?: IEffect[];
}

interface ICurrentShipContext {
  bonusEffects?: IEffect[];
  loaded: boolean;
  hint?: string;
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
  updateFullResponse: (data?: IPlayShipResponse) => void;
  updateShipLocation: (data?: IShipLocationResponse) => void;
  refreshState: () => Promise<IPlayShipResponse>;
}

export const CurrentShipContext = createContext({});

// todo - convert to useRouter once ready
export const CurrentShipContextComponent = ({ children }: IProps) => {
  const [loaded, setLoaded] = useState(false);
  const [ship, setShip] = useState(undefined);
  const [port, setPort] = useState(undefined);
  const [hint, setHint] = useState(undefined);
  const [channel, setChannel] = useState(undefined);
  const [directions, setDirections] = useState(undefined);
  const [shipsInLocation, setShipsInLocation] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const [cratesInPort, setCratesInPort] = useState(undefined);
  const [cratesOnShip, setCratesOnShip] = useState(undefined);
  const [bonusEffects, setBonusEffects] = useState(undefined);

  const updateFullResponse = (data?: IPlayShipResponse) => {
    if (!data) {
      setLoaded(true);
      setShip(undefined);
      setPort(undefined);
      setHint(undefined);
      setChannel(undefined);
      setDirections(undefined);
      setShipsInLocation(undefined);
      setEvents(undefined);
      setCratesInPort(undefined);
      setCratesOnShip(undefined);
      setBonusEffects(undefined);
      return;
    }

    setLoaded(true);
    setShip(data.ship);
    setPort(data.port);
    setChannel(data.channel);
    setHint(data.hint);
    setDirections(data.directions);
    setShipsInLocation(data.shipsInLocation);
    setEvents(data.events);
    setCratesInPort(data.cratesInPort);
    setCratesOnShip(data.cratesOnShip);
    setBonusEffects(data.bonus);
  };

  const refreshState = async (): Promise<IPlayShipResponse> => {
    const data = await ApiClient.fetch(`/play/${ship.id}`);
    updateFullResponse(data);
    return data;
  };

  const loadingNewShip = (): void => {
    setShip(undefined);
    setLoaded(false);
  };

  const updateCurrentShip = (newShip?: IShip) => {
    setShip(newShip);
    setLoaded(true);
  };

  const updateShipLocation = (data: IShipLocationResponse) => {
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
        bonusEffects,
        channel,
        cratesInPort,
        cratesOnShip,
        directions,
        events,
        hint,
        loaded,
        loadingNewShip,
        port,
        refreshState,
        ship,
        shipsInLocation,
        updateCurrentShip,
        updateFullResponse,
        updateShipLocation,
      },
    },
    children
  );
};

export const useCurrentShipContext = (): ICurrentShipContext => {
  return useContext(CurrentShipContext) as ICurrentShipContext;
};
