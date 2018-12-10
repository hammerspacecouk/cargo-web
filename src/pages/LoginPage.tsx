import * as React from "react";
import LoginForm from "../components/Organisms/LoginForm/LoginForm";
import messageQueryString from "../util/MessageQueryString";

interface PropsInterface {
  query?: string;
}

export default function LoginPage({ query }: PropsInterface) {
  return (
    <div className="t-doc">
      <div className="t-doc__title">
        <h1>Login</h1>
      </div>
      <div className="t-doc__main">
        <LoginForm messages={messageQueryString(query)} />
      </div>
    </div>
  );
}
