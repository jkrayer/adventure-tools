import { useEffect, useState } from "react";

type SyncStateUpdater<T> = T | ((oldValue: T) => T);

export const useSyncState = <T>(
  key: string,
  initialValue: T = {} as T,
): [T, (newValue: SyncStateUpdater<T>) => void] => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return initialValue;
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return initialValue;
    }
  });

  const setSyncedState = (newValue: SyncStateUpdater<T>) => {
    setState((prevState) => {
      const resolvedValue =
        typeof newValue === "function"
          ? (newValue as (oldValue: T) => T)(prevState)
          : newValue;

      return resolvedValue;
    });
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setSyncedState];
};
