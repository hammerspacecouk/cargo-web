import * as React from "react";
import { LoginForm } from "./Components/LoginForm";
import { messageQueryString } from "../../util/MessageQueryString";
import { PanelPage } from "../../components/Templates/PanelPage/PanelPage";
import { GameContextComponent } from "./GameContext";

interface IProps {
  query?: string;
}

export const LoginContainer = ({ query }: IProps) => {
  return (
    <GameContextComponent useChildren>
      <PanelPage title="Login">
        <LoginForm messages={messageQueryString(query)} />
      </PanelPage>
    </GameContextComponent>
  );
};
