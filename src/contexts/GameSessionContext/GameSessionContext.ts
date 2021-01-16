import { createContext, createElement, ReactNode, useContext } from "react";
import { IGameSession, useGameSession } from "./useGameSession";
import { IGameSessionResponse } from "@src/data/game";
import { CurrentPage } from "@src/contexts/GameSessionContext/GameSessionContainer";

// hook to use for getting at the game session context
export const useGameSessionContext = (): IGameSession => {
  const context = useContext(GameSessionContext) as IGameSession;
  if (!context) {
    throw new Error("useGameSessionContext called outside of the provider");
  }
  return context;
};

// responsible for being the session provider
export const GameContextComponent = ({ initialSession, children, currentPage = null }: IProps) => {
  const gameSession = useGameSession(initialSession, currentPage);
  return createElement(GameSessionContext.Provider, { value: gameSession }, children);
};

interface IProps {
  currentPage: CurrentPage | null;
  initialSession?: IGameSessionResponse;
  children?: ReactNode;
}

const GameSessionContext = createContext({});
