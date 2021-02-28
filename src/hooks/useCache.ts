import { useState, useRef } from 'react';
import { hashArgs } from '../utils';

const CACHE: any = {};

type Query<T> = (...args: any) => Promise<T>;

interface CacheResult<T> {
  loading: boolean;
  data: null | T;
  error: null | any;
  fetch: () => void;
}

export const useCache = <T>(query: Query<T>, ...args): CacheResult<T> => {
  const prevArgs = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetch = () => {
    console.log('******************************');
    console.log('FETCHING!!!!!!', ...args);

    // cacheID is how a cache is identified against a unique request
    const cacheID = hashArgs(...args);

    // look in cache and set response if present
    if (CACHE[cacheID] !== undefined) {
      console.log('GOT FROM CACHE!!!!!!');
      setData(CACHE[cacheID]);
      setLoading(false);
    } else {
      console.log('GOT FROM DATABASE!!!!!!');
      // else make sure loading set to true
      setLoading(true);
      // fetch new data
      query(...args)
        .then((newData: any) => {
          CACHE[cacheID] = newData;
          setData(newData);
          setLoading(false);
        })
        .catch((err: any) => {
          setError(err);
        });
    }
    prevArgs.current = args;
  };

  return { loading, error, data, fetch };
};
