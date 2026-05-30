'use client';
import { useEffect, useState, useCallback } from 'react';
import { KONAMI_SEQUENCE } from '@/lib/constants';

export function useKonami(callback: () => void) {
  const [sequence, setSequence] = useState<string[]>([]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setSequence(prev => {
      const newSeq = [...prev, e.code].slice(-KONAMI_SEQUENCE.length);

      if (
        newSeq.length === KONAMI_SEQUENCE.length &&
        newSeq.every((key, i) => key === KONAMI_SEQUENCE[i])
      ) {
        callback();
        return [];
      }

      return newSeq;
    });
  }, [callback]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
