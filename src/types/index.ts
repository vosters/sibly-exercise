import { Colors } from '../constants';

export type ColorProps = {
  color?: Colors;
};

export interface Result<T> {
  loading: boolean;
  data: null | T;
  error: null | any;
  fetch: () => void;
}

export type Query<T> = (...args: any) => Promise<T>;
export interface CacheResult<T> {
  loading: boolean;
  data: null | T;
  error: null | any;
  fetch: () => void;
}

export type ImagesObj = { [key: string]: string[] };

export type BreedType = {
  _key_: string;
  value: string[];
};
