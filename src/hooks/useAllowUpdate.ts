import { useEffect } from "react";

export const useAllowUpdate = () => {

  // to prevent attempts to update state once unmounted
  let allowUpdate = true;

  useEffect(() => {
    return () => {
      allowUpdate = false;
    };
  }, []);

  return allowUpdate;
};
