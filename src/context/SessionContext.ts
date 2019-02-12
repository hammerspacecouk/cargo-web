import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { PromotionModal } from "../components/Organisms/PromotionModal/PromotionModal";
import { IChildrenProps, IPlayer, IRankStatus, IScore } from "../Interfaces";
import { ApiClient } from "../util/ApiClient";

export interface ISessionResponse {
  readonly isLoggedIn: boolean;
  readonly hasProfileNotification: boolean;
  readonly player?: IPlayer;
  readonly rankStatus?: IRankStatus;
  readonly loginToken?: string;
}

interface ISessionProperties {
  player?: IPlayer;
  rankStatus?: IRankStatus;
  score?: IScore;
  hasProfileNotification: boolean;
  loginToken?: string;
}

interface ISessionContext extends ISessionProperties {
  updateScore: (newScore: IScore) => void;
  updateRankStatus: (newRankStatus: IRankStatus) => void;
  setSession: (session: ISessionResponse) => void;
  refreshSession: () => void;
}

export const initialSession: ISessionProperties = {
  hasProfileNotification: false,
  loginToken: undefined,
  player: undefined,
  score: undefined,
};

const SessionContext = createContext({});

const getSession = (cookies?: any): Promise<ISessionResponse> => {
  return ApiClient.fetch("/login/check", null, cookies);
};

const sessionRefreshTime: number = 1000 * 60 * 2;

export const SessionContextComponent = ({ children }: IChildrenProps) => {
  const [score, setScore] = useState(initialSession.score);
  const [rankStatus, setRanksStatus] = useState(initialSession.rankStatus);
  const [player, setPlayer] = useState(initialSession.player);
  const [loginToken, setLoginToken] = useState(initialSession.loginToken);
  const [hasProfileNotification, setHasProfileNotification] = useState(
    initialSession.hasProfileNotification
  );
  let allowUpdate = true;

  const updateScore = (newScore: IScore) => {
    setScore(newScore);
  };

  const updateRankStatus = (newRanksStatus: IRankStatus) => {
    setRanksStatus(newRanksStatus);
  };

  const updateSession = () => {
    if (!allowUpdate) {
      return;
    }
    // don't fetch if we're in a background tab, but carry on for the next time
    if (!document.hidden) {
      refreshSession();
    }
    window.setTimeout(updateSession, sessionRefreshTime);
  };

  const setSession = (session: ISessionResponse) => {
    if (session.isLoggedIn) {
      updateScore(session.player.score);
      updateRankStatus(session.rankStatus);
      setPlayer(session.player);
      setHasProfileNotification(session.hasProfileNotification);
    } else {
      updateScore(null);
      updateRankStatus(null);
      setPlayer(null);
    }
    setLoginToken(session.loginToken);
  };

  const refreshSession = async () => {
    setSession(await getSession());
  };

  useEffect(() => {
    updateSession();
    return () => {
      allowUpdate = false;
    };
  }, []);

  return createElement(
    SessionContext.Provider,
    {
      value: {
        hasProfileNotification,
        loginToken,
        player,
        rankStatus,
        refreshSession,
        score,
        setSession,
        updateRankStatus,
        updateScore,
      },
    },
    children
  );
};

export const useSessionContext = (): ISessionContext => {
  return useContext(SessionContext) as ISessionContext;
};
