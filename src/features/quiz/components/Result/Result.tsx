import { useFormContext } from 'react-hook-form';

import React from 'react';
import styles from './Result.module.css';

interface ResultProps {
  attemptedQuestions: number[];
  quizData: Record<number, string>;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({
  attemptedQuestions,
  quizData,
  onReset,
}) => {
  const { getValues } = useFormContext();

  return (
    <div className={styles.resultContainer}>
      <h2 className={styles.title}>Thank you!</h2>
      <table className={styles.resultTable}>
        <thead>
          <tr>
            <th>Question No</th>
            <th>Question</th>
            <th>Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {attemptedQuestions.map((questionNumber) => (
            <tr key={questionNumber}>
              <td>{questionNumber + 1}</td>
              <td>{quizData[questionNumber]}</td>
              <td>{getValues(questionNumber.toString())}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onReset} className={styles.resetButton}>
        Retake Quiz
      </button>
    </div>
  );
};

export default Result;
