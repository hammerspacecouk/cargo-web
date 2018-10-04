import * as React from "react";
import LoginForm from "./LoginForm";
import Status from "../Navigation/Status";

export default () => {
  return (
    <Status code={403}>
      <div className="t-doc">
        <div className="t-doc__title">
          <h1>You must log in to do this</h1>
        </div>
        <div className="t-doc__main">
          <LoginForm />
        </div>
      </div>
    </Status>
  );
};
