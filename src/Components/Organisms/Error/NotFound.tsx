import * as React from "react";
import { Error } from "./Error";

interface PropsInterface {
  message?: string;
}

export const NotFound = (props: PropsInterface) => (
  <Error
    code={404}
    message={props.message ||
    "This page was not found. Please check the address and try again."}
  />
);
