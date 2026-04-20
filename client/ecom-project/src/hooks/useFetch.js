import { useState, useEffect } from "react";

export const useFetch = (url, refresh) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    })();
  }, [url, refresh]);
  return { data, error, loading };
};
