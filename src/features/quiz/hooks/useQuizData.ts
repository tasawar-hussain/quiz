import { useEffect, useState } from 'react';

import type { TQuiz } from '@/shared/types/quiz';
import { fetchQuizData } from '../services/api';

interface useQuizDataResult {
  data: TQuiz | null;
  loading: boolean;
  error: string | null;
}

export const useQuizData = (): useQuizDataResult => {
  const [data, setData] = useState<TQuiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const { quiz } = await fetchQuizData();
        setData(quiz);
        setLoading(false);
      } catch (error) {
        let errorMessage = 'Failed to do something exceptional';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setError(errorMessage || 'Failed to fetch quiz data');
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  return { data, loading, error };
};
