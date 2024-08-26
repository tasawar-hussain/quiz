import type { TQuizData } from '@/shared/types/quiz.types';

export const fetchQuizData = (): Promise<TQuizData> => {
  const data: TQuizData = {
    quiz: {
      questions: [
        {
          questionStatement: 'Does your business operate in CA?',
          type: 'yes/no',
          options: ['yes', 'no'],
          navigationRules: [
            {
              condition: {
                matcher: 'equals',
                value: 'yes',
              },
              nextQuestionNumber: 2,
            },
            {
              condition: {
                matcher: 'equals',
                value: 'no',
              },
              nextQuestionNumber: 'end',
            },
          ],
        },
        {
          questionStatement: 'How many employees do you have?',
          type: 'openEnded',
          navigationRules: [
            {
              condition: {
                matcher: 'greaterThan',
                value: 100,
              },
              nextQuestionNumber: 'end',
            },
            {
              condition: {
                matcher: 'always',
              },
              nextQuestionNumber: 3,
            },
          ],
        },
        {
          questionStatement: 'Do you serve food?',
          type: 'yes/no',
          options: ['yes', 'no'],
          navigationRules: [
            {
              condition: {
                matcher: 'equals',
                value: 'yes',
              },
              nextQuestionNumber: 4,
            },
            {
              condition: {
                matcher: 'equals',
                value: 'no',
              },
              nextQuestionNumber: 6,
            },
          ],
        },
        {
          questionStatement: 'Do you serve hot food?',
          type: 'yes/no',
          options: ['yes', 'no'],
          navigationRules: [],
        },
        {
          questionStatement: 'Are you open past midnight?',
          type: 'yes/no',
          options: ['yes', 'no'],
          navigationRules: [],
        },
        {
          questionStatement: 'Do you host live music?',
          type: 'yes/no',
          options: ['yes', 'no'],
          navigationRules: [],
        },
      ],
      meta: {
        initialScreen: 'Lets be friends, we would like to know more about you!',
        lastScreen: 'It was great knowing about you!',
      },
    },
  };

  return Promise.resolve(data);
};
