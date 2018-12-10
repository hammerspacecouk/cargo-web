import * as React from "react";
import { useEffect } from "react";
import RequireLogin from "./RequireLogin";
import Loading from "../Navigation/Loading";
import { useSessionContext } from "../../context/SessionContext";

interface InitialPropsInterface {
  readonly children: any;
}

// Client-side login check
export default ({ children }: InitialPropsInterface) => {
  const { player, refreshSession } = useSessionContext();

  useEffect(
    () => {
      if (player === undefined) {
        refreshSession();
      }
    },
    [player]
  );

  if (player === undefined) {
    return <Loading />;
  }
  if (!player) {
    return <RequireLogin />;
  }
  return children;
};
