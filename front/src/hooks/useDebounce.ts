import {useCallback, useEffect, useMemo, useState} from 'react';

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const updateDebouncedValue = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(updateDebouncedValue, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, updateDebouncedValue]);

  return useMemo(() => debouncedValue, [debouncedValue]);
}

export default useDebounce;
