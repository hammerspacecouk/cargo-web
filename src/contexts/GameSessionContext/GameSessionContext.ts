import { createContext, createElement, ReactNode, useContext } from "react";
import { IGameSession, useGameSession } from "./useGameSession";
import { IGameSessionResponse } from "../../data/game";

// hook to use for getting at the game session context
export const useGameSessionContext = (): IGameSession => {
  const context = useContext(GameSessionContext) as IGameSession;
  if (!context) {
    throw new Error("useGameSessionContext called outside of the provider");
  }
  return context;
};

// responsible for being the session provider
export const GameContextComponent = ({ initialSession, children, isAtHome = false }: IProps) => {
  const gameSession = useGameSession(initialSession, isAtHome);
  return createElement(GameSessionContext.Provider, { value: gameSession }, children);
};

interface IProps {
  isAtHome?: boolean;
  initialSession?: IGameSessionResponse;
  children?: ReactNode;
}

const GameSessionContext = createContext({});
