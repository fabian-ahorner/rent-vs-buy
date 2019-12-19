import React from 'react'

export default function useStateWithLocalStorage(localStorageKey, defaultValue) {
  const [value, setState] = React.useState(
    () => {
      const existingValue = localStorage.getItem(localStorageKey)
      console.log("existingValue: ", existingValue, defaultValue)
      return existingValue ? JSON.parse(existingValue) : defaultValue
    }
  );
  React.useEffect(() => {
  }, [value]);

  const setValue = (value, ...other) => {
    localStorage.setItem(JSON.stringify(localStorageKey), value);
    return setState(value, ...other)
  }
  return [value, setValue];
};