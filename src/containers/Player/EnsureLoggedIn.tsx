import * as React from "react";
import { useEffect } from "react";
import { RequireLogin } from "../../components/Organisms/RequireLogin/RequireLogin";
import { Loading } from "../../components/Atoms/Loading/Loading";
import { useSessionContext } from "../../context/SessionContext";

interface InitialPropsInterface {
  readonly children: any;
}

// Client-side login check
export const EnsureLoggedIn = ({ children }: InitialPropsInterface) => {
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
