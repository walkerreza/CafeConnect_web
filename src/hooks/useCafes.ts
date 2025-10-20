import { useState, useEffect } from 'react';
import { getCafes } from '../services/api';
import type { Cafe } from '../types';

export const useCafes = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCafes();
      setCafes(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cafes');
      console.error('Error fetching cafes:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchCafes();
  };

  return { cafes, loading, error, refetch };
};
