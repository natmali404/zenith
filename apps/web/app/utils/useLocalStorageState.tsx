"use client";
import * as React from "react";

function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = React.useState<T>(() => {
    try {
      const localValue = window.localStorage.getItem(key);
      return localValue == null ? defaultValue : JSON.parse(localValue);
    } catch (error) {
      console.error("Oops! Error with parsing local value to JSON: ", error);
      return defaultValue;
    }
  });

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Oops! Error with parsing JSON to local value: ", error);
    }
  }, [key, state]);

  //return [state, setState]
  return [state, setState] as [T, React.Dispatch<React.SetStateAction<T>>];
}

export { useLocalStorageState };
