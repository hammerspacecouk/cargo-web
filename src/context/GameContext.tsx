import * as React from "react";
import { IChildrenProps } from "../Interfaces";
import { Loading } from "../components/Atoms/Loading/Loading";
import { RequireLogin } from "../components/Organisms/RequireLogin/RequireLogin";
import { IGameSession, useGameSession } from "../hooks/useGameSession";

interface IProps extends IChildrenProps {
  useChildren?: boolean;
}

const GameContext = React.createContext({});
export const GameContextComponent = ({ children, useChildren }: IProps) => {
  const gameSession = useGameSession();

  if (gameSession.player === undefined) {
    return <Loading />; // todo - skeleton
  }

  const body = useChildren || gameSession.player ? children : <RequireLogin />;

  return (
    <GameContext.Provider value={gameSession}>{body}</GameContext.Provider>
  );
};

export const useGameContext = (): IGameSession => {
  return React.useContext(GameContext) as IGameSession;
};
