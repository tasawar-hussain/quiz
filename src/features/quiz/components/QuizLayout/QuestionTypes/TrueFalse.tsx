import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './TrueFalse.module.css';

import { type TrueFalseProps } from './types';

const TrueFalse: React.FC<TrueFalseProps> = ({
  statement,
  options,
  currentQuestionIndex,
}) => {
  const { register } = useFormContext();

  return (
    <div className={styles.trueFalseQuestion}>
      <h3>Question No: {currentQuestionIndex + 1}</h3>
      <p>{statement}</p>

      {options.map((option, index) => (
        <label key={index} className={styles.trueFalseOption}>
          <input
            type="radio"
            value={option}
            {...register(currentQuestionIndex.toString(), { required: true })}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default TrueFalse;
