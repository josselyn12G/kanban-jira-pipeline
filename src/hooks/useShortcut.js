import { useEffect } from 'react';

/** Ejecuta `handler` al presionar ⌘+key (macOS) o Ctrl+key (Windows/Linux). */
export function useShortcut(key, handler) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        handler();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, handler]);
}
