type BaseProp = {
  statement: string;
  currentQuestionIndex: number;
};
export type OpenEndedProps = BaseProp;

export type TrueFalseProps = BaseProp & {
  options: string[];
};
