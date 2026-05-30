'use client';
import { useState, useEffect } from 'react';
import { fetchGitHubStats, GitHubStats } from '@/lib/github';

interface UseGitHubStatsReturn {
  stats: GitHubStats | null;
  loading: boolean;
  error: string | null;
}

export function useGitHubStats(): UseGitHubStatsReturn {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchGitHubStats();
        if (!cancelled) {
          setStats(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch');
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading, error };
}
