import * as React from "react";
import { LoginForm } from "@src/components/Organisms/LoginForm";
import { messageQueryString } from "@src/utils/messageQueryString";
import { ILoginOptions } from "@src/interfaces";
import { SimplePage } from "@src/components/Templates/SimplePage";
import { PanelPage } from "@src/components/Templates/PanelPage";
import { ParsedUrlQuery } from "querystring";

export const LoginPage = ({ loginOptions, query }: IProps) => {
  return (
    <SimplePage disablePlayButton>
      <PanelPage title="Login">
        <LoginForm loginOptions={loginOptions} redirect={String(query?.r)} messages={messageQueryString(query)} />
      </PanelPage>
    </SimplePage>
  );
};

interface IProps {
  loginOptions: ILoginOptions;
  query?: ParsedUrlQuery;
}
