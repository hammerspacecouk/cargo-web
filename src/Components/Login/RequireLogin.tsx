import * as React from "react";
import LoginForm from "./LoginForm";
import Status from "../Navigation/Status";

export default () => (
  <Status code={403}>
    <div className="t-doc">
      <div className="t-doc__title">
        <h1>You must first log in</h1>
      </div>
      <div className="t-doc__main">
        <LoginForm />
      </div>
    </div>
  </Status>
);
