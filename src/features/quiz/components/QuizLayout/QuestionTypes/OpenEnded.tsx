import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './OpenEnded.module.css';

import { type OpenEndedProps } from './types';

const OpenEnded: React.FC<OpenEndedProps> = ({
  statement,
  currentQuestionIndex,
}) => {
  const { register } = useFormContext();

  return (
    <div className={styles.openEndedQuestion}>
      <h3>Question No: {currentQuestionIndex + 1}</h3>
      <p>{statement}</p>
      <input
        type="text"
        {...register(currentQuestionIndex.toString(), { required: true })}
        className={styles.openEndedInput}
      />
    </div>
  );
};

export default OpenEnded;
