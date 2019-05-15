import { useEffect, useState } from "react";
import {
  IEvent,
  IFleetShip,
  ILoginOptions,
  IPlayer,
  IRankStatus,
  IScore,
} from "../../Interfaces";
import { ApiClient } from "../../util/ApiClient";
import { useMounted } from "../../hooks/useMounted";
import { IFleetResponse } from "../../context/Page/FleetContext";

interface IGameSessionResponse {
  fleet: IFleetResponse;
  sessionState: ISessionResponse;
}

interface ISessionResponse {
  readonly isLoggedIn: boolean;
  readonly hasProfileNotification: boolean;
  readonly player?: IPlayer;
  readonly rankStatus?: IRankStatus;
  readonly loginOptions?: ILoginOptions;
}

interface IUpdateRankStatus {
  (rankStatus: IRankStatus): void;
}
interface IUpdateFleetShips {
  (fleetShips: IFleetShip[]): void;
}

export interface IGameSession {
  activeShip?: IFleetShip;
  player?: IPlayer;
  loginOptions?: ILoginOptions;
  score?: IScore;
  ships?: IFleetShip[];
  events?: IEvent[];
  rankStatus?: IRankStatus;
  refreshSession: () => void;
  isAtHome: boolean;
  setIsAtHome: (val: boolean) => void;
  setActiveShipById: (shipId?: string) => void;
  updateScore: (val: IScore) => void;
  updateAShipProperty: (id: string, newProp: object) => void;
  updateRankStatus: IUpdateRankStatus;
}

const sessionRefreshTime: number = 1000 * 60 * 2;

const getSession = (): Promise<IGameSessionResponse> => {
  return ApiClient.fetch("/play");
};

export const useGameSession = (): IGameSession => {
  const [player, setPlayer] = useState(undefined);
  const [rankStatus, updateRankStatus]: [
    IRankStatus,
    IUpdateRankStatus
  ] = useState(undefined);
  const [score, updateScore] = useState(undefined);
  const [ships, setShips]: [IFleetShip[], IUpdateFleetShips] = useState(
    undefined
  );
  const [activeShip, setActiveShip] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const [loginOptions, setLoginOptions] = useState(undefined);
  const [isAtHome, setIsAtHome] = useState(false);

  const isMounted = useMounted();

  const updateSession = (firstTime: boolean) => {
    if (!isMounted()) {
      return;
    }
    // don't fetch if we're in a background tab, but carry on for the next time
    if (firstTime || !document.hidden) {
      refreshSession();
    }
    window.setTimeout(updateSession, sessionRefreshTime);
  };

  const refreshSession = async () => {
    const session: IGameSessionResponse = await getSession();
    if (session.sessionState.isLoggedIn) {
      updateScore(session.sessionState.player.score);
      updateRankStatus(session.sessionState.rankStatus);
      setShips(session.fleet.ships);
      setEvents(session.fleet.events);
      setPlayer(session.sessionState.player);
      setLoginOptions(null);
      // setHasProfileNotification(session.hasProfileNotification);
    } else {
      updateScore(null);
      updateRankStatus(null);
      setShips(null);
      setPlayer(null);
      setEvents(null);
      setLoginOptions(session.sessionState.loginOptions);
    }
  };

  const setActiveShipById = (id: string) => {
    if (!isMounted()) {
      return;
    }
    if (!ships) {
      setActiveShip(null);
    }
    const foundShip = ships.find(
      (ship: IFleetShip): boolean => ship.ship.id === id
    );
    setActiveShip(foundShip || null);
  };

  const updateAShipProperty = (id: string, newProps: object) => {
    if (isMounted()) {
      const updatedShips: IFleetShip[] = ships.map(fleetShip => {
        if (fleetShip.ship.id === id) {
          const newShip = { ...fleetShip.ship, ...newProps };
          return {
            ...fleetShip,
            ship: newShip,
          };
        }
        return fleetShip;
      });
      setShips(updatedShips);
    }
  };

  useEffect(() => {
    updateSession(true);
  }, []);

  return {
    activeShip,
    loginOptions,
    player,
    rankStatus,
    events,
    refreshSession,
    score,
    isAtHome,
    setActiveShipById,
    setIsAtHome,
    ships,
    updateScore,
    updateAShipProperty,
    updateRankStatus,
  };
};
