import { useState, useCallback } from 'react';
import { Result, Query } from '../types';

export const useQuery = <T>(query: Query<T>): Result<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const fetch = useCallback(
    (...args): void => {
      setLoading(true);
      setError(null);
      query(...args)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    },
    [query],
  );

  return {
    loading,
    error,
    data,
    fetch,
  };
};
