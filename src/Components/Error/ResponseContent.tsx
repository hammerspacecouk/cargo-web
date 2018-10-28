import * as React from "react";
import { ErrorResponseInterface } from "../../util/HttpClient";
import LoginForm from "../Login/LoginForm";
import Error from "./Error";
import Loading from "../Navigation/Loading";

export interface Props {
  error: ErrorResponseInterface|null;
}

export default ({error}: Props) => {
  if (error) {
    let loginForm = null;
    if (error.statusCode === 429) {
      loginForm = (
        <div>
          <h2>Login</h2>
          <LoginForm />
        </div>
      );
    }
    return (
      <>
        <Error
          code={error.statusCode}
          message={error.message}
        />
        {loginForm}
      </>
    );
  }

  return <Loading />;
};
