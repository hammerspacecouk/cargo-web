import * as React from "react";
import { LoginForm } from "@src/components/Organisms/LoginForm";
import { messageQueryString } from "@src/utils/messageQueryString";
import { ILoginOptions } from "@src/interfaces";
import { SimplePage } from "@src/components/Templates/SimplePage";
import { PanelPage } from "@src/components/Templates/PanelPage";
import { ParsedUrlQuery } from "querystring";
import {H3} from "@src/components/Atoms/Heading";

export const LoginPage = ({ loginOptions, query }: IProps) => {
  return (
    <SimplePage disablePlayButton>
      <PanelPage title="Login">
          <H3 as="p">
              Trial the first 15% of the game (several hours of play) for <strong>FREE</strong>.
              After which you may decide to upgrade to the full game.
              <br /><br />
          </H3>
        <LoginForm loginOptions={loginOptions} redirect={String(query?.r)} messages={messageQueryString(query)} />
      </PanelPage>
    </SimplePage>
  );
};

interface IProps {
  loginOptions: ILoginOptions;
  query?: ParsedUrlQuery;
}
