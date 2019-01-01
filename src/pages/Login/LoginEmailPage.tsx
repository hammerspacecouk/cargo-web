import * as React from "react";
import { parse as parseQueryString } from "query-string";
import { Error } from "../../components/Organisms/Error/Error";
import { TokenButton } from "../../components/Molecules/TokenButton/TokenButton";
import { SimplePage } from "../../components/Templates/SimplePage/SimplePage";
import { ConfirmButton } from "../../components/Atoms/Button/Button";

interface PropsInterface {
  query?: string;
}

export const LoginEmailPage = ({ query }: PropsInterface) => {
  const queryData = parseQueryString(query);
  if (!queryData.token) {
    return <Error code={400} message="Bad request (Missing token)"/>;
  }

  const token = {
    path: "/login/email",
    token: queryData.token
  };

  return (
    <SimplePage title="Log in using e-mail">
      <p>
        Thank you for clicking the link in your e-mail. If you didn't mean to,
        don't worry; Nothing has happened yet. To perform the login and
        continue to your game click below.
      </p>
      <TokenButton token={token}>
        <ConfirmButton>Continue</ConfirmButton>
      </TokenButton>
    </SimplePage>
  );
};
