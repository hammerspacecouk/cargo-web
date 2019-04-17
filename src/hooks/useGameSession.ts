import { useEffect, useState } from "react";
import {
  IEvent,
  IFleetShip,
  ILoginOptions,
  IPlayer,
  IRankStatus,
  IScore
} from "../Interfaces";
import { ApiClient } from "../util/ApiClient";
import { useMounted } from "./useMounted";
import { IFleetResponse } from "../context/Page/FleetContext";

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

export interface IGameSession {
  player?: IPlayer;
  loginOptions?: ILoginOptions;
  score?: IScore;
  ships?: IFleetShip[];
  events?: IEvent[];
  rankStatus?: IRankStatus;
  refreshSession: () => void;
  isAtHome: boolean;
  setIsAtHome: (val: boolean) => void;
}

const sessionRefreshTime: number = 1000 * 60 * 2;

const getSession = (): Promise<IGameSessionResponse> => {
  return ApiClient.fetch("/play");
};

export const useGameSession = (): IGameSession => {
  const [player, setPlayer] = useState(undefined);
  const [rankStatus, updateRankStatus] = useState(undefined);
  const [score, updateScore] = useState(undefined);
  const [ships, setShips] = useState(undefined);
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

  useEffect(() => {
    updateSession(true);
  }, []);

  return {
    loginOptions,
    player,
    rankStatus,
    events,
    refreshSession,
    score,
    isAtHome,
    setIsAtHome,
    ships,
  };
};
