import { useState, useEffect, useRef } from 'react';

// Use a tuple return type for better destructuring support
type UseLocalStorageReturn<T> = [T, (value: T | ((val: T) => T)) => void];

function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): UseLocalStorageReturn<T> {
  // 1. Lazy initialization
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null
        ? (JSON.parse(storedValue) as T)
        : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  // Track the key to prevent overwriting new keys with old data during transitions
  const lastKeyRef = useRef(key);

  // 2. Sync inward (Cross-tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  // 3. Sync outward (State to Storage)
  useEffect(() => {
    // Prevent writing if the key just changed but state hasn't updated yet
    if (lastKeyRef.current !== key) {
      lastKeyRef.current = key;
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}

export default useLocalStorage;
