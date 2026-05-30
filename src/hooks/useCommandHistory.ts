import { useState } from 'react';

export const useCommandHistory = (maxHistory = 20) => {
  const [history, setHistory] = useState<string[]>([]);
  const [pointer, setPointer] = useState(-1);

  const addCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    setHistory((prev) => {
      // Remove duplicate if it was the last command
      if (prev[0] === cmd) return prev;

      const newHistory = [cmd, ...prev];
      if (newHistory.length > maxHistory) {
        newHistory.pop();
      }
      return newHistory;
    });

    setPointer(-1); // Reset index pointer on new entry
  };

  const getPrevious = () => {
    if (history.length === 0) return '';
    const newPointer = Math.min(pointer + 1, history.length - 1);
    setPointer(newPointer);
    return history[newPointer];
  };

  const getNext = () => {
    if (pointer <= 0) {
      setPointer(-1);
      return '';
    }
    const newPointer = pointer - 1;
    setPointer(newPointer);
    return history[newPointer];
  };

  return { addCommand, getPrevious, getNext, history };
};
