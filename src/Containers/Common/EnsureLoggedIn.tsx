import * as React from "react";
import { SessionContext } from "../../Context/SessionContext";
import RequireLogin from "../../Components/RequireLogin";
import Loading from "../../Components/Loading";

export interface PropsInterface {
  readonly children: any;
}

export default (props: PropsInterface) => (
  <SessionContext.Consumer>
    {({ player, playerFetched }) => {
      if (!player) {
        return playerFetched ? <RequireLogin /> : <Loading />;
      }
      return props.children;
    }}
  </SessionContext.Consumer>
);
