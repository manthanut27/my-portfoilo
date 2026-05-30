'use client';
import { useState, useCallback } from 'react';

export function useCommandHistory(maxHistory = 20) {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = useCallback((command: string) => {
    setHistory(prev => {
      const newHistory = [command, ...prev.slice(0, maxHistory - 1)];
      return newHistory;
    });
    setHistoryIndex(-1);
  }, [maxHistory]);

  const navigateUp = useCallback((): string | null => {
    if (history.length === 0) return null;
    const newIndex = Math.min(historyIndex + 1, history.length - 1);
    setHistoryIndex(newIndex);
    return history[newIndex];
  }, [history, historyIndex]);

  const navigateDown = useCallback((): string | null => {
    if (historyIndex <= 0) {
      setHistoryIndex(-1);
      return '';
    }
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    return history[newIndex];
  }, [history, historyIndex]);

  const resetIndex = useCallback(() => {
    setHistoryIndex(-1);
  }, []);

  return { history, addToHistory, navigateUp, navigateDown, resetIndex };
}
