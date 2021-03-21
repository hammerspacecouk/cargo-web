import * as React from "react";
import { LoginForm } from "@src/components/Organisms/LoginForm";
import { messageQueryString } from "@src/utils/messageQueryString";
import { ILoginOptions } from "@src/interfaces";
import { SimplePage } from "@src/components/Templates/SimplePage";
import { PanelPage } from "@src/components/Templates/PanelPage";
import { ParsedUrlQuery } from "querystring";
import { H3 } from "@src/components/Atoms/Heading";

export const LoginPage = ({ loginOptions, query }: IProps) => {
  return (
    <SimplePage disablePlayButton>
      <PanelPage title="Login">
        <H3 as="p">
          Sorry, new players are not being accepted right now.
        </H3>
        <LoginForm
          loginOptions={loginOptions}
          redirect={String(query?.r || "/play")}
          messages={messageQueryString(query)}
        />
      </PanelPage>
    </SimplePage>
  );
};

interface IProps {
  loginOptions: ILoginOptions;
  query?: ParsedUrlQuery;
}
