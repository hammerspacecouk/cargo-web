import * as React from "react";
import { PanelPage } from "../Templates/PanelPage";
import { LoginForm } from "../Organisms/LoginForm";
import { messageQueryString } from "../../utils/messageQueryString";
import { ILoginOptions } from "../../interfaces";

export const LoginPage = ({ loginOptions, query }: IProps) => {
  return (
    <PanelPage title="Login">
      <LoginForm loginOptions={loginOptions} messages={messageQueryString(query)} />
    </PanelPage>
  );
};

interface IProps {
  loginOptions: ILoginOptions;
  query?: string;
}
