import {
  createElement,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import PlayerInterface from "../interfaces/PlayerInterface";
import RankStatusInterface from "../interfaces/RankStatusInterface";
import ScoreInterface from "../interfaces/ScoreInterface";
import PromotionModal from "../components/Player/PromotionModal";
import { ApiClient } from "../util/ApiClient";
import { ChildrenPropsInterface } from "../interfaces/PropsInterface";

export interface SessionResponseInterface {
  readonly isLoggedIn: boolean;
  readonly hasProfileNotification: boolean;
  readonly player?: PlayerInterface;
  readonly rankStatus?: RankStatusInterface;
}

interface SessionPropertiesInterface {
  player?: PlayerInterface;
  rankStatus?: RankStatusInterface;
  score?: ScoreInterface;
  hasProfileNotification: boolean;
}

interface SessionContextInterface extends SessionPropertiesInterface {
  updateScore: (newScore: ScoreInterface) => void;
  updateRankStatus: (newRankStatus: RankStatusInterface) => void;
  setSession: (session: SessionResponseInterface) => void;
  refreshSession: () => void;
}

export const initialSession: SessionPropertiesInterface = {
  player: undefined,
  score: undefined,
  hasProfileNotification: false
};

const SessionContext = createContext({});

const getSession = (cookies?: any): Promise<SessionResponseInterface> => {
  return ApiClient.fetch("/login/check", null, cookies);
};

function useScore(): [ScoreInterface, (newScore: ScoreInterface) => void] {
  const [score, setScore] = useState(initialSession.score);
  return [
    score,
    (newScore: ScoreInterface) => {
      setScore(newScore);
    }
  ];
}

function useRankStatus(): [
  RankStatusInterface,
  (newRanksStatus: RankStatusInterface) => void
  ] {
  const [rankStatus, setRanksStatus] = useState(initialSession.rankStatus);
  return [
    rankStatus,
    (newRanksStatus: RankStatusInterface) => {
      setRanksStatus(newRanksStatus);
    }
  ];
}

const sessionRefreshTime: number = 1000 * 60 * 2;

export function SessionContextComponent({ children }: ChildrenPropsInterface) {
  const [score, updateScore] = useScore();
  const [rankStatus, updateRankStatus] = useRankStatus();
  const [player, setPlayer] = useState(initialSession.player);
  const [hasProfileNotification, setHasProfileNotification] = useState(
    initialSession.hasProfileNotification
  );
  let allowUpdate = true;

  function updateSession() {
    if (!allowUpdate) {
      return;
    }
    // don't fetch if we're in a background tab, but carry on for the next time
    if (!document.hidden) {
      refreshSession();
    }
    window.setTimeout(updateSession, sessionRefreshTime);
  }

  useEffect(() => {
    updateSession();
    return () => {
      allowUpdate = false;
    };
  }, []);

  function setSession(session: SessionResponseInterface) {
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
  }

  async function refreshSession() {
    setSession(await getSession());
  }

  return createElement(
    SessionContext.Provider,
    {
      value: {
        player,
        score,
        rankStatus,
        hasProfileNotification,
        updateScore,
        updateRankStatus,
        setSession,
        refreshSession
      }
    },
    children,
    createElement(PromotionModal)
  );
}

export function useSessionContext(): SessionContextInterface {
  return useContext(SessionContext) as SessionContextInterface;
}

export default SessionContextComponent;
