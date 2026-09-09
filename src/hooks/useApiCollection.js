import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/config/site';

export function useApiCollection(resource) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/${resource}`);
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'שגיאה בטעינת הנתונים');
        if (!cancelled) setData(result.data || []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'שגיאה בטעינת הנתונים');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [resource]);

  return { data, loading, error };
}
