/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ErrorFormObject {
  [key: string | number]: string | ErrorFormObject | ErrorFormObject[];
}

export interface EntityError {
  status: 422;
  data: {
    error: ErrorFormObject;
  };
}

export type UsePrefetch = (endpointName: string, options?: UsePrefetchOptions) => PrefetchCallback;

export type UsePrefetchOptions =
  | {
      // If specified, only runs the query if the difference between `new Date()` and the last
      // `fulfilledTimeStamp` is greater than the given value (in seconds)
      ifOlderThan?: false | number;
    }
  | {
      // If `force: true`, it will ignore the `ifOlderThan` value if it is set and the query
      // will be run even if it exists in the cache.
      force?: boolean;
    };

export type PrefetchCallback = (arg: any, options?: UsePrefetchOptions) => void;
