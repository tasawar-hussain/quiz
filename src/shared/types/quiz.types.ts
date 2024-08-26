export type ComparisonOperation =
  | 'equals'
  | 'notEquals'
  | 'lessThan'
  | 'greaterThan'
  | 'lessThanOrEqualTo'
  | 'greaterThanOrEqualTo';

type NavigationCondition = {
  matcher: ComparisonOperation;
  value: string | number;
};

type DefaultNavigationCondition = {
  matcher: 'always';
};

export type TNavigationRule = {
  condition: NavigationCondition | DefaultNavigationCondition;
  nextQuestionNumber: number | 'end';
};

type BaseQuestion = {
  questionStatement: string;
  navigationRules: TNavigationRule[];
};

type QuestionWithOptions = BaseQuestion & {
  type: 'yes/no';
  options: string[];
};

type QuestionWithoutOptions = BaseQuestion & {
  type: 'openEnded';
};

type Meta = {
  initialScreen?: string;
  lastScreen?: string;
};

export type TQuestions = (QuestionWithOptions | QuestionWithoutOptions)[];

export type TQuiz = {
  questions: TQuestions;
  meta?: Meta;
};

export type TQuizData = {
  quiz: TQuiz;
};
