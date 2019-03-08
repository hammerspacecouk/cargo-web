import * as React from "react";
import { Error } from "./Error";

interface IProps {
  message?: string;
}

export const NotFound = (props: IProps) => (
  <Error
    code={404}
    message={
      props.message ||
      "This page was not found. Please check the address and try again."
    }
  />
);
