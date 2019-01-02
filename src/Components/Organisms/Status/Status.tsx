import * as React from "react";
import { StaticContext } from "react-router-dom";
import { Route, RouteComponentProps } from "react-router-dom";

interface IProps {
  code: number;
  children: any;
}

export const Status = (props: IProps) => (
  <Route
    render={({
      staticContext,
    }: RouteComponentProps<any, StaticContext, any>) => {
      if (staticContext) {
        staticContext.statusCode = props.code;
      }
      return props.children;
    }}
  />
);
