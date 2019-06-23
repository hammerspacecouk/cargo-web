import { parse as parseQueryString } from "query-string";
import * as React from "react";
import { ConfirmButton } from "../../Atoms/Button";
import { TokenButton } from "../../Molecules/TokenButton";
import { P } from "../../Atoms/Text";
import { Prose } from "../../Atoms/Prose";
import { PanelPage } from "../../Templates/PanelPage";

interface IProps {
  query?: string;
}

export const LoginEmailPage = ({ query }: IProps) => {
  const queryData = parseQueryString(query);
  if (!queryData.token) {
    return 'Bad request (Missing token)'; // todo - status page and 400 response
  }

  const token = {
    path: "/login/email",
    token: queryData.token as string,
  };

  return (
    <PanelPage title="Email Login">
      <Prose>
        <P>
          You clicked a login link in your email. If you didn't mean to, don't worry; Nothing has happened yet. To
          perform the login and continue to your game click below.
        </P>
        <TokenButton token={token}>
          <ConfirmButton>Continue</ConfirmButton>
        </TokenButton>
      </Prose>
    </PanelPage>
  );
};
