import { useEffect, useRef } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonamiCode(onActivate: () => void) {
  const progress = useRef(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expected = KONAMI_SEQUENCE[progress.current];

      if (key === expected) {
        progress.current += 1;
        if (progress.current === KONAMI_SEQUENCE.length) {
          progress.current = 0;
          onActivate();
        }
      } else {
        progress.current = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onActivate]);
}
