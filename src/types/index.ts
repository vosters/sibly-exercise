import { Colors } from '../constants';

export type ImagesObj = { [key: string]: string[] };

export type ColorProps = {
  color?: Colors;
};

export type Query<T> = (...args: any) => Promise<T>;
export interface CacheResult<T> {
  loading: boolean;
  data: null | T;
  error: null | any;
  fetch: () => void;
}
