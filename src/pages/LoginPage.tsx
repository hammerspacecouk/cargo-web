import * as React from "react";
import { LoginForm } from "../components/Organisms/LoginForm/LoginForm";
import { messageQueryString } from "../util/MessageQueryString";
import { PanelPage } from "../components/Templates/PanelPage/PanelPage";
import { GameContextComponent } from "../context/GameContext";

interface IProps {
  query?: string;
}

// todo - this is outside the context. What to do about that?
export const LoginPage = ({ query }: IProps) => {
  return (
    <GameContextComponent useChildren>
      <PanelPage title="Login">
        <LoginForm messages={messageQueryString(query)} />
      </PanelPage>
    </GameContextComponent>
  );
};
