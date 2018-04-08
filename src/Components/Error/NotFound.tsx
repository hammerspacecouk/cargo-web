import * as React from "react";
import Status from "../Status";

interface PropsInterface {
  message?: string;
}

export default (props: PropsInterface) => (
  <Status code={404}>
    <div className="error">
      <h1 className="error__title">404</h1>
      <p className="error__message">
        {props.message
          ? props.message
          : "This page was not found. Please check the address and try again."}
      </p>
    </div>
  </Status>
);
