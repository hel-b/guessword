import { useSyncExternalStore, useCallback } from 'react';

/**
 * Server Snapshot: Used during SSR/Hydration.
 * Returning the default value prevents hydration mismatch errors.
 * No dependencies - define once, reuse everywhere.
 */
const getServerSnapshot = <T,>(defaultValue: T) => defaultValue;

/**
 * Subscribe: Listens for changes from OTHER tabs.
 * No dependencies - define once, reuse everywhere.
 */
const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

/**
 * Custom hook to manage state in localStorage with cross-tab synchronization.
 * Uses useSyncExternalStore (React 18+) to treat localStorage as the single source of truth.
 */
export default function useLocalStorage<T>(key: string, defaultValue: T) {
  // 1. Snapshot: Read directly from localStorage.
  // Wrapped in useCallback for referential stability to prevent re-render loops.
  const getSnapshot = useCallback(() => {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? (JSON.parse(value) as T) : defaultValue;
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e);
      return defaultValue;
    }
  }, [key, defaultValue]);

  const state = useSyncExternalStore(subscribe, getSnapshot, () => getServerSnapshot(defaultValue));

  // 2. Setter: Updates localStorage and notifies the current tab.
  const setState = useCallback(
    (newValue: T | ((val: T) => T)) => {
      try {
        const nextValue =
          typeof newValue === 'function'
            ? (newValue as (val: T) => T)(getSnapshot())
            : newValue;

        localStorage.setItem(key, JSON.stringify(nextValue));

        // Native 'storage' event only fires in other tabs.
        // We manually dispatch to notify useSyncExternalStore in the current tab.
        window.dispatchEvent(new StorageEvent('storage', { key }));
      } catch (e) {
        console.error(`Error setting localStorage key "${key}":`, e);
      }
    },
    [key, getSnapshot],
  );

  return [state, setState] as const;
}
