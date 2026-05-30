import React, { createContext, useContext, useEffect, useState } from 'react';
import { getGPUTier } from 'detect-gpu';

export type PerformanceTier = 'high' | 'mid' | 'low' | 'mobile';

interface PerformanceContextProps {
  tier: PerformanceTier;
  loading: boolean;
}

const PerformanceContext = createContext<PerformanceContextProps | undefined>(undefined);

export const PerformanceTierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<PerformanceTier>('mid'); // optimistic default
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectTier = async () => {
      try {
        // Mobile fallback
        if (window.innerWidth < 768) {
          setTier('mobile');
          setLoading(false);
          return;
        }

        // Get GPU tier
        const gpu = await getGPUTier();
        const cores = navigator.hardwareConcurrency ?? 4;
        // deviceMemory is in GB (default to 4 if unsupported)
        const ram = (navigator as any).deviceMemory ?? 4;

        // Categorize based on criteria
        // High: GPU tier >= 2, cores >= 4, ram >= 4
        if (gpu.tier >= 2 && cores >= 4 && ram >= 4) {
          setTier('high');
        } else if (gpu.tier >= 1 && cores >= 2) {
          setTier('mid');
        } else {
          setTier('low');
        }
      } catch (err) {
        console.error('Failed to detect GPU or performance capabilities, falling back to mid-tier:', err);
        setTier('mid');
      } finally {
        setLoading(false);
      }
    };

    detectTier();
  }, []);

  return (
    <PerformanceContext.Provider value={{ tier, loading }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformanceTier = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceTier must be used within a PerformanceTierProvider');
  }
  return context;
};
