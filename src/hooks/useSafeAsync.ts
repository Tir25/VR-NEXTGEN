import { useEffect, useRef } from 'react';

/**
 * useSafeAsync
 * Guards against state updates on unmounted components and provides
 * a cancellable run helper for async flows. Returns a ref `isMountedRef`
 * and a `run` wrapper that swallows cancellations but rethrows other errors.
 */
export function useSafeAsync() {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  function run<T>(promise: Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      promise
        .then((value) => {
          if (isMountedRef.current) resolve(value);
        })
        .catch((error) => {
          if (isMountedRef.current) reject(error);
        });
    });
  }

  return { isMountedRef, run };
}

export type UseSafeAsyncReturn = ReturnType<typeof useSafeAsync>;


