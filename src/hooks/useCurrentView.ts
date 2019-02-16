import { useSessionContext } from "../context/SessionContext";
import * as React from "react";

export const useCurrentView = (VIEW_NAME: string) => {
  const { setCurrentView } = useSessionContext();
  React.useEffect(() => {
    setCurrentView(VIEW_NAME);
    return () => {
      setCurrentView(null);
    };
  }, []);
};
