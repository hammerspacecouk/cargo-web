import * as React from "react";
import { Loading } from "../../components/Atoms/Loading/Loading";
import { RequireLogin } from "../../components/Organisms/RequireLogin/RequireLogin";
import { useSessionContext } from "../../context/SessionContext";

interface IInitialProps {
  readonly children: any;
}

// Client-side login check
export const EnsureLoggedIn = ({ children }: IInitialProps) => {
  const { player, refreshSession } = useSessionContext();

  React.useEffect(
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
