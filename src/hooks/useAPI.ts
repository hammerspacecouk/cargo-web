import { useEffect, useState } from "react";
import { ApiClient } from "../util/ApiClient";

export const useApi = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // to prevent attempts to update state once unmounted
  let allowUpdate = true;

  useEffect(async () => {
    const data = await ApiClient.fetch(url);
    if (allowUpdate) {
      setData(data);
      setLoading(false);
    }
    return () => {
      allowUpdate = false;
    };
  }, []);

  return { data, loading };
};
