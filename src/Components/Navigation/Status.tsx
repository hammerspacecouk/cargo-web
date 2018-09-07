import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";

interface Props {
  code: number;
  children: any;
}

export default (props: Props) => (
  <Route
    render={({
      staticContext
    }: RouteComponentProps<any, StaticContext, any>) => {
      if (staticContext) {
        staticContext.statusCode = props.code;
      }
      return props.children;
    }}
  />
);
