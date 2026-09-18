'use client';

import { useState, useSyncExternalStore } from 'react';

const changedEvent = 'vequity:storage';
function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(changedEvent, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(changedEvent, onChange);
  };
}

/** Hydration-safe local progress, with an in-memory fallback when storage is blocked. */
export function useBrowserStorage(key: string, initial: string) {
  const [temporary, setTemporary] = useState<string | null>(null);
  const stored = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key) ?? initial;
      } catch {
        return initial;
      }
    },
    () => initial,
  );

  const write = (value: string) => {
    try {
      localStorage.setItem(key, value);
      setTemporary(null);
      window.dispatchEvent(new Event(changedEvent));
    } catch {
      setTemporary(value);
    }
  };
  return [temporary ?? stored, write, temporary === null] as const;
}
