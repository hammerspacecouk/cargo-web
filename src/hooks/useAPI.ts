import { useEffect, useState } from "react";
import { ApiClient } from "../util/ApiClient";

export const useApi = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // to prevent attempts to update state once unmounted
  let allowUpdate = true;
  const getData = async () => {
    const resultData = await ApiClient.fetch(url);
    if (allowUpdate) {
      setData(resultData);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      allowUpdate = false;
    };
  }, []);

  return { data, loading };
};
