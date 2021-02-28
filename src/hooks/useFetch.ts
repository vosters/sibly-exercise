import { useState, useEffect, useRef } from 'react';

export interface Result<T> {
  loading: boolean;
  data: null | T;
  error: null | any;
  fetch: () => void;
}

export const useFetch = <T>(url: string): Result<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json.message);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  //   const fetch = useCallback(async (): void => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const res = await fetch(url, options);
  //       const json = await res.json();
  //       setData(json);
  //     } catch (error) {
  //       setError(error);
  //     }

  //     setLoading(false);
  //   }, [url]);

  //   useEffect(() => {
  //     fetch();
  //   }, [fetch]);

  return {
    loading,
    error,
    data,
    fetch,
  };
};
