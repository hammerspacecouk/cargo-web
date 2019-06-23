import { createContext, createElement, ReactNode, useContext } from "react";
import { IGameSession, IGameSessionResponse, useGameSession } from "./useGameSession";

// hook to use for getting at the game session context
export const useGameSessionContext = (): IGameSession => {
  const context = useContext(GameSessionContext) as IGameSession;
  if (!context) {
    throw "useGameSessionContext called outside of the provider";
  }
  return context;
};

// responsible for being the session provider
export const GameContextComponent = ({ initialSession, children }: IProps) => {
  const gameSession = useGameSession(initialSession);
  return createElement(GameSessionContext.Provider, { value: gameSession }, children);
};

interface IProps {
  initialSession?: IGameSessionResponse;
  children?: ReactNode;
}

const GameSessionContext = createContext({});
