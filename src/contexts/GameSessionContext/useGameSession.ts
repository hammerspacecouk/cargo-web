import { useEffect, useRef, useState } from "react";
import { IEvent, IFleetShip, IMission, IPlayer, IPort, IRankStatus, IScore } from "@src/interfaces";
import { useMounted } from "@src/hooks/useMounted";
import { getSession, IGameSessionResponse } from "@src/data/game";
import { CurrentPage } from "@src/contexts/GameSessionContext/GameSessionContainer";

export interface IGameSession extends IGameSessionState {
  refreshSession: () => void;
  setSession: (newSession: IGameSessionResponse) => void;
  setActiveShipById: (shipId?: string) => void;
  updateScore: (val: IScore) => void;
  updateFleet: (newFleet: IFleetShip[]) => void;
  updateRankStatus: IUpdateRankStatus;
}

// game session data calculation
export const useGameSession = (
  initialSession?: IGameSessionResponse,
  currentPage: CurrentPage = null
): IGameSession => {
  const [sessionState, setSessionState] = useState(() => getNewSessionState({}, initialSession));
  const isMounted = useMounted();
  const sessionRefreshInProgress = useRef<number>(null);

  const refreshSession = async () => {
    const id = (sessionRefreshInProgress.current = Date.now());
    const session: IGameSessionResponse = await getSession();
    if (sessionRefreshInProgress.current === id) {
      // prevents out of order refreshes. only the last one applies
      setSession(session);
    }
  };

  const setSession = (newSession: IGameSessionResponse) => {
    setSessionState((prev) => getNewSessionState(prev, newSession));
  };

  const updateSession = (skipFirstTime: boolean) => {
    if (!isMounted()) {
      return;
    }
    // don't fetch if we're in a background tab, but carry on for the next time
    if (!skipFirstTime && !document.hidden) {
      refreshSession();
    }
    window.setTimeout(updateSession, sessionRefreshTime);
  };

  useEffect(() => {
    updateSession(!!initialSession);
  }, [initialSession]);

  return {
    ...sessionState,
    currentPage,
    setSession,
    setActiveShipById: (id) => isMounted() && setSessionState((prev) => setActiveShipById(prev, id)),
    updateRankStatus: (newScore) =>
      isMounted() && setSessionState((prev) => setPropIfChanged(prev, "rankStatus", newScore)),
    updateScore: (newScore) => isMounted() && setSessionState((prev) => setPropIfChanged(prev, "score", newScore)),
    refreshSession,
    updateFleet: (newFleet) => isMounted() && setSessionState((prev) => setPropIfChanged(prev, "ships", newFleet)),
  };
};

interface IGameSessionState {
  activeShip?: IFleetShip;
  player?: IPlayer;
  score?: IScore;
  ships?: IFleetShip[];
  events?: IEvent[];
  rankStatus?: IRankStatus;
  currentPage?: CurrentPage | null;
  isGameOver?: boolean;
  currentMissions?: IMission[];
  allMissions?: IMission[];
  showTrialEnded?: boolean;
  showTrialWarning?: boolean;
  tutorialStep?: number | null;
  goalCrateLocations?: IPort[];
}

const getNewSessionState = (state: IGameSessionState, session: IGameSessionResponse): IGameSessionState => {
  let newState = state;
  if (session?.sessionState.isLoggedIn) {
    newState = setPropIfChanged(newState, "isGameOver", !session.fleet.hasStarterShip);
    newState = setPropIfChanged(newState, "score", session.sessionState?.player?.score);
    newState = setPropIfChanged(newState, "player", session.sessionState.player);
    newState = setPropIfChanged(newState, "rankStatus", session.sessionState.rankStatus);
    newState = setPropIfChanged(newState, "ships", session.fleet.ships);
    newState = setPropIfChanged(newState, "events", session.fleet.events);
    newState = setPropIfChanged(newState, "currentMissions", session.currentMissions);
    newState = setPropIfChanged(newState, "allMissions", session.allMissions);
    newState = setPropIfChanged(newState, "showTrialEnded", session.showTrialEnded);
    newState = setPropIfChanged(newState, "showTrialWarning", session.showTrialWarning);
    newState = setPropIfChanged(newState, "tutorialStep", session.tutorialStep);
    newState = setPropIfChanged(newState, "goalCrateLocations", session.goalCrateLocations);
  } else {
    newState = setPropIfChanged(newState, "isGameOver", null);
    newState = setPropIfChanged(newState, "score", null);
    newState = setPropIfChanged(newState, "player", null);
    newState = setPropIfChanged(newState, "rankStatus", null);
    newState = setPropIfChanged(newState, "ships", null);
    newState = setPropIfChanged(newState, "events", null);
    newState = setPropIfChanged(newState, "currentMissions", []);
    newState = setPropIfChanged(newState, "allMissions", []);
    newState = setPropIfChanged(newState, "showTrialEnded", false);
    newState = setPropIfChanged(newState, "showTrialWarning", false);
    newState = setPropIfChanged(newState, "tutorialStep", null);
    newState = setPropIfChanged(newState, "goalCrateLocations", []);
  }
  return newState;
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

  if (newShip?.ship.id !== currentShip?.ship.id) {
    return {
      ...state,
      activeShip: newShip,
    };
  }
  // no changes
  return state;
};

const sessionRefreshTime: number = 1000 * 60 * 2;

type IUpdateRankStatus = (rankStatus: IRankStatus) => void;
