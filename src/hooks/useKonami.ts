import { useEffect, useRef } from 'react';

const KONAMI_CODE = [
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

export const useKonami = (callback: () => void) => {
  const inputRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() === 'b' || e.key.toLowerCase() === 'a' ? e.key.toLowerCase() : e.key;
      const input = inputRef.current;
      input.push(key);

      // Keep array size matching Konami code length
      if (input.length > KONAMI_CODE.length) {
        input.shift();
      }

      // Check if sequence matches
      const isMatch = input.every((val, index) => val === KONAMI_CODE[index]);

      if (isMatch) {
        callback();
        inputRef.current = []; // reset
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
};
