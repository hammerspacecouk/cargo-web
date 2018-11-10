import { useEffect, useRef } from "react";

export const useAllowUpdate = () => {

  // to prevent attempts to update state once unmounted
  const allowUpdate = useRef(false);

  useEffect(() => {
    allowUpdate.current = true;
    return () => {
      allowUpdate.current = false;
    };
  }, []);

  return allowUpdate.current;
};
