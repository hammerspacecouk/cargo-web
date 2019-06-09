import { parse as parseQueryString } from "query-string";
import * as React from "react";
import { ConfirmButton } from "../../components/Atoms/Button/Button";
import { TokenButton } from "../../components/Molecules/TokenButton/TokenButton";
import { Error } from "../../components/Organisms/Error/Error";
import { P } from "../../components/Atoms/Text/Text";
import { Prose } from "../../components/Atoms/Prose/Prose";
import { PanelPage } from "../../components/Templates/PanelPage/PanelPage";

interface IProps {
  query?: string;
}

export const LoginEmailPage = ({ query }: IProps) => {
  const queryData = parseQueryString(query);
  if (!queryData.token) {
    return <Error code={400} message="Bad request (Missing token)" />;
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
