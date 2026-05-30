'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface HiringManagerContextType {
  isHiringMode: boolean;
  toggleHiringMode: () => void;
}

const HiringManagerContext = createContext<HiringManagerContextType>({
  isHiringMode: false,
  toggleHiringMode: () => {},
});

export function useHiringManager() {
  return useContext(HiringManagerContext);
}

export function HiringManagerProvider({ children }: { children: ReactNode }) {
  const [isHiringMode, setIsHiringMode] = useState(false);

  const toggleHiringMode = useCallback(() => {
    setIsHiringMode(prev => !prev);
  }, []);

  return (
    <HiringManagerContext.Provider value={{ isHiringMode, toggleHiringMode }}>
      {children}
    </HiringManagerContext.Provider>
  );
}
