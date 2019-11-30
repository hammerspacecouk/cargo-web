import * as React from "react";
import { LoginForm } from "../Organisms/LoginForm";
import { messageQueryString } from "../../utils/messageQueryString";
import { ILoginOptions } from "../../interfaces";
import { SimplePage } from "../Templates/SimplePage";
import { PanelPage } from "../Templates/PanelPage";
import { ParsedUrlQuery } from "querystring";

export const LoginPage = ({ loginOptions, query }: IProps) => {
  return (
    <SimplePage disablePlayButton>
      <PanelPage title="Login">
        <LoginForm loginOptions={loginOptions} messages={messageQueryString(query)} />
      </PanelPage>
    </SimplePage>
  );
};

interface IProps {
  loginOptions: ILoginOptions;
  query?: ParsedUrlQuery;
}
