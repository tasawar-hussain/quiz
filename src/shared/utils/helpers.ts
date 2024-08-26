import type {
  ComparisonOperation,
  TNavigationRule,
} from '@/shared/types/quiz.types';

type ComparisonType = string | number;
type ComparisonFunction = (a: ComparisonType, b: ComparisonType) => boolean;

export function isNumber(x: number | string | null | undefined): x is number {
  return typeof x === 'number';
}

export const operationsMap: Map<ComparisonOperation, ComparisonFunction> =
  new Map([
    ['equals', (a, b) => a === b],
    ['notEquals', (a, b) => a !== b],
    ['lessThan', (a, b) => a < b],
    ['greaterThan', (a, b) => a > b],
    ['lessThanOrEqualTo', (a, b) => a <= b],
    ['greaterThanOrEqualTo', (a, b) => a >= b],
  ]);

export const getNextQuestionIndex = (
  answer: string | number,
  navigationRules: TNavigationRule[],
): number | 'end' | null => {
  try {
    for (const rule of navigationRules) {
      const { condition } = rule;

      if (condition.matcher === 'always') {
        return rule.nextQuestionNumber;
      }

      const compareFunc = operationsMap.get(condition.matcher);
      if (compareFunc) {
        let userAnswer = answer;
        if (isNumber(condition.value) && !isNumber(userAnswer)) {
          userAnswer = parseFloat(userAnswer);
        }

        const res = compareFunc(userAnswer, condition.value);
        if (res) {
          return rule.nextQuestionNumber;
        }
      }
    }
  } catch (error) {
    console.error('error parsing rule', error);
  }

  return null;
};
