
import { useEffect, useState } from 'react';
import { getAffiliateStats } from '../api/stats';

export function useStats() {
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    getAffiliateStats().then(({ data, error }) => {
      if (!error) setStats(data);
    });
  }, []);

  return { stats };
}
