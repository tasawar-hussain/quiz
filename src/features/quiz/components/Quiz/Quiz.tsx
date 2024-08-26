import { QuizLayout } from '../QuizLayout';
import { useQuizData } from '../../hooks/useQuizData';

import styles from './Quiz.module.css';

export const Quiz: React.FC = () => {
  const { data, loading, error } = useQuizData();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!data) {
    return <div>No quiz data available.</div>;
  }

  return (
    <div className={styles.quizContainer}>
      <QuizLayout quizData={data} />
    </div>
  );
};
