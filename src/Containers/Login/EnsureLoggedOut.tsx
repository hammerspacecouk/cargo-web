import * as React from "react";
import { Redirect } from "react-router";
import { SessionContext } from "../../Context/SessionContext";

export interface PropsInterface {
  readonly children: any;
}

export default (props: PropsInterface) => (
  <SessionContext.Consumer>
    {({ player }) => {
      // if there is already a player, bounce them to the play window
      if (player) {
        return <Redirect to="/play" />;
      }
      return props.children;
    }}
  </SessionContext.Consumer>
);
