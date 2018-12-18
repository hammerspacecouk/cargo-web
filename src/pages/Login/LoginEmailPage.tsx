import * as React from "react";
import { parse as parseQueryString } from "query-string";
import { Error } from "../../components/Organisms/Error/Error";
import TokenButton from "../../components/Molecules/TokenButton/TokenButton";

interface PropsInterface {
  query?: string;
}

export default function LoginEmailPage({ query }: PropsInterface) {
  const queryData = parseQueryString(query);
  if (!queryData.token) {
    return <Error code={400} message="Bad request (Missing token)" />;
  }

  const token = {
    path: "/login/email",
    token: queryData.token
  };

  return (
    <div className="t-doc">
      <div className="t-doc__title">
        <h1>Log in using e-mail</h1>
      </div>
      <div className="t-doc__main">
        <p>
          Thank you for clicking the link in your e-mail. If you didn't mean to,
          don't worry; Nothing has happened yet. To perform the login and
          continue to your game click below.
        </p>
        <TokenButton token={token}>
          <button className="button button--confirm">Continue</button>
        </TokenButton>
      </div>
    </div>
  );
}
