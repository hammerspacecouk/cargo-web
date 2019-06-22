import { useEffect, useState } from "react";
import { IEvent, IFleetShip, ILoginOptions, IPlayer, IRankStatus, IScore } from "../../Interfaces";
import { ApiClient } from "../../util/ApiClient";
import { useMounted } from "../../hooks/useMounted";

export const useGameSession = (): IGameSession => {
  const [sessionState, setSessionState] = useState({});
  const isMounted = useMounted();

  const refreshSession = async () => {
    const session: IGameSessionResponse = await getSession();
    setSessionState(prev => getNewSessionState(prev, session));
  };

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

  useEffect(() => {
    updateSession(true);
  }, []);

  return {
    ...sessionState,
    setActiveShipById: id => isMounted() && setSessionState(prev => setActiveShipById(prev, id)),
    setIsAtHome: val => isMounted() && setSessionState(prev => setIsAtHome(prev, val)),
    updateRankStatus: newScore =>
      isMounted() && setSessionState(prev => setPropIfChanged(prev, "rankStatus", newScore)),
    updateScore: newScore => isMounted() && setSessionState(prev => setPropIfChanged(prev, "score", newScore)),
    refreshSession,
    updateAShipProperty: (id: string, newProps: object) =>
      isMounted() && setSessionState(prev => updateAShipProperty(prev, id, newProps)),
  };
};

export interface IGameSession extends IGameSessionState {
  refreshSession: () => void;
  setIsAtHome: (val: boolean) => void;
  setActiveShipById: (shipId?: string) => void;
  updateScore: (val: IScore) => void;
  updateAShipProperty: (id: string, newProp: object) => void;
  updateRankStatus: IUpdateRankStatus;
}

interface IGameSessionState {
  activeShip?: IFleetShip;
  player?: IPlayer;
  loginOptions?: ILoginOptions;
  score?: IScore;
  ships?: IFleetShip[];
  events?: IEvent[];
  rankStatus?: IRankStatus;
  isAtHome?: boolean;
}

const getNewSessionState = (state: IGameSessionState, session: IGameSessionResponse) => {
  let newState = state;
  if (session.sessionState.isLoggedIn) {
    newState = setPropIfChanged(newState, "score", session.sessionState.player.score);
    newState = setPropIfChanged(newState, "player", session.sessionState.player);
    newState = setPropIfChanged(newState, "rankStatus", session.sessionState.rankStatus);
    newState = setPropIfChanged(newState, "ships", session.fleet.ships);
    newState = setPropIfChanged(newState, "events", session.fleet.events);
    newState = setPropIfChanged(newState, "loginOptions", null);
  } else {
    newState = setPropIfChanged(newState, "score", null);
    newState = setPropIfChanged(newState, "player", null);
    newState = setPropIfChanged(newState, "rankStatus", null);
    newState = setPropIfChanged(newState, "ships", null);
    newState = setPropIfChanged(newState, "events", null);
    newState = setPropIfChanged(newState, "loginOptions", session.sessionState.loginOptions);
  }
  return newState;
};

const updateAShipProperty = (state: IGameSessionState, id: string, newProps: object) => {
  const updatedShips: IFleetShip[] = state.ships.map(fleetShip => {
    if (fleetShip.ship.id === id) {
      const newShip = { ...fleetShip.ship, ...newProps };
      return {
        ...fleetShip,
        ship: newShip,
      };
    }
    return fleetShip;
  });
  setPropIfChanged(state, "ships", updatedShips);
};

const setPropIfChanged = (
  state: IGameSessionState,
  prop: keyof IGameSessionState,
  newValue: any
): IGameSessionState => {
  if (JSON.stringify(state[prop]) === JSON.stringify(newValue)) {
    return state;
  }
  return {
    ...state,
    [prop]: newValue,
  };
};

const setIsAtHome = (state: IGameSessionState, newValue: boolean) => {
  // undefined is allowed to be equivalent to false here
  if (!!state.isAtHome === newValue) {
    return state;
  }
  return {
    ...state,
    isAtHome: newValue,
  };
};

const setActiveShipById = (state: IGameSessionState, id?: string) => {
  const currentShip = state.activeShip;
  let newShip = null;

  if (state.ships && id) {
    const foundShip = state.ships.find((ship: IFleetShip): boolean => ship.ship.id === id);
    // only select the ship if it differs from the current ship
    if (foundShip && (!state.activeShip || state.activeShip.ship.id !== foundShip.ship.id)) {
      newShip = foundShip;
    }
  }

  if (newShip != currentShip) {
    return {
      ...state,
      activeShip: newShip,
    };
  }
  // no changes
  return state;
};

const sessionRefreshTime: number = 1000 * 60 * 2;

const getSession = (): Promise<IGameSessionResponse> => {
  return ApiClient.fetch("/play");
};

interface IFleetResponse {
  ships: IFleetShip[];
  events: IEvent[];
}

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
