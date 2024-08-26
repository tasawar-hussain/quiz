import React, { useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { TQuiz } from '@/shared/types/quiz.types';
import { getNextQuestionIndex, isNumber } from '@/shared/utils/helpers';

import TrueFalse from './QuestionTypes/TrueFalse';
import OpenEnded from './QuestionTypes/OpenEnded';
import Result from '../Result/Result';

import styles from './QuizLayout.module.css';

interface QuizLayoutProps {
  quizData: TQuiz;
}

const QuizLayout: React.FC<QuizLayoutProps> = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionsHistory = useRef<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const methods = useForm();
  const { reset, watch } = methods;

  const TotalQuestions = quizData.questions.length;
  const quizQuestions: Record<number, string> = {};
  quizData.questions.forEach(
    (q, idx) => (quizQuestions[idx] = q.questionStatement),
  );

  const questionName = currentQuestionIndex.toString();
  const currentQuestion = quizData.questions[currentQuestionIndex];

  const getAnswer = () => watch(questionName);

  const completeQuiz = () => {
    setIsComplete(true);
  };

  const handleInvalidNextQuestion = () => {
    if (currentQuestionIndex + 1 < TotalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };

  const addToQuestionHistory = () => {
    questionsHistory.current.push(currentQuestionIndex);
    questionsHistory.current = [...new Set(questionsHistory.current)];
  };

  const handleNext = () => {
    const currentAnswer = getAnswer();

    if (currentQuestion.navigationRules.length < 1) {
      handleInvalidNextQuestion();
      addToQuestionHistory();
      return;
    }

    let nextQuestionIndex = getNextQuestionIndex(
      currentAnswer,
      currentQuestion.navigationRules,
    );

    if (isNumber(nextQuestionIndex)) {
      nextQuestionIndex -= 1;
    }

    if (
      !nextQuestionIndex ||
      (isNumber(nextQuestionIndex) && nextQuestionIndex >= TotalQuestions)
    ) {
      handleInvalidNextQuestion();
    } else {
      if (nextQuestionIndex === 'end') {
        completeQuiz();
      } else {
        if (nextQuestionIndex < TotalQuestions) {
          setCurrentQuestionIndex(nextQuestionIndex);
        } else {
          handleInvalidNextQuestion();
        }
      }
    }
    addToQuestionHistory();
  };

  const goToPreviousQuestion = () => {
    if (isComplete) {
      setIsComplete(false);
    } else {
      questionsHistory.current.pop();
      const historyCount = questionsHistory.current.length;
      if (historyCount > 0) {
        setCurrentQuestionIndex(questionsHistory.current[historyCount - 1]);
      }
    }
  };

  const resetQuiz = () => {
    setIsComplete(false);
    setCurrentQuestionIndex(0);
    questionsHistory.current = [];
    reset();
  };

  const isPreviousEnabled = currentQuestionIndex !== 0 || isComplete;
  const isNextDisabled = isComplete || !getAnswer();

  console.log('questionsHistory', questionsHistory.current);
  console.log('currentQuestionIndex', currentQuestionIndex);

  return (
    <FormProvider {...methods}>
      <form className={styles.quizForm}>
        {isComplete ? (
          <Result
            attemptedQuestions={questionsHistory.current}
            quizData={quizQuestions}
            onReset={resetQuiz}
          />
        ) : currentQuestion.type === 'yes/no' ? (
          <TrueFalse
            key={currentQuestionIndex}
            statement={currentQuestion.questionStatement}
            options={currentQuestion.options || []}
            currentQuestionIndex={currentQuestionIndex}
          />
        ) : currentQuestion.type === 'openEnded' ? (
          <OpenEnded
            key={currentQuestionIndex}
            statement={currentQuestion.questionStatement}
            currentQuestionIndex={currentQuestionIndex}
          />
        ) : null}

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={goToPreviousQuestion}
            className={styles.navButton}
            disabled={!isPreviousEnabled}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={styles.navButton}
            style={{ marginLeft: '10px' }}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default QuizLayout;
