
import { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';

export function useAuth() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
