import * as React from "react";
import { SessionContext } from "../../Context/SessionContext";
import RequireLogin from "../../Components/Login/RequireLogin";
import Loading from "../../Components/Navigation/Loading";

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
