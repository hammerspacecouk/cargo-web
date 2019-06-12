import * as React from "react";
import { IChildrenProps } from "../../Interfaces";
import { Loading } from "../../components/Atoms/Loading/Loading";
import { RequireLogin } from "../../components/Organisms/RequireLogin/RequireLogin";
import { IGameSession, useGameSession } from "./useGameSession";
import { FlexAllCenter } from "../../components/Atoms/Flex/Flex";

interface IProps extends IChildrenProps {
  useChildren?: boolean;
}

const GameContext = React.createContext({});
export const GameContextComponent = ({ children, useChildren }: IProps) => {
  const gameSession = useGameSession();

  if (gameSession.player === undefined) {
    return (
      <FlexAllCenter>
        <Loading />
      </FlexAllCenter>
    ); // todo - skeleton
  }

  const body = useChildren || gameSession.player ? children : <RequireLogin />;

  return <GameContext.Provider value={gameSession}>{body}</GameContext.Provider>;
};

export const useGameContext = (): IGameSession => {
  const context = React.useContext(GameContext) as IGameSession;
  if (!context) {
    throw "useGameContext called outside of the provider";
  }
  return context;
};
