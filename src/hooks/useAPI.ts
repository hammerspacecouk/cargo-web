import { useEffect, useRef, useState } from "react";

export const useApi = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // to prevent attempts to update state once unmounted
  const allowUpdate = useRef(true);

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    if (allowUpdate.current) {
      setData(data);
      setLoading(false);
    }
    return () => {
      allowUpdate.current = false;
    };
  }, []);

  return { data, loading };
};
