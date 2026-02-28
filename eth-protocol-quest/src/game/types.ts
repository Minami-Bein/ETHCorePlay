export type Topic = 'EL' | 'CL' | 'EVM' | 'TX' | 'ENGINE' | 'EIP' | 'CLIENT';

export type QuizQuestion = {
  id: string;
  type: 'single';
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Level = {
  id: number;
  slug: string;
  title: string;
  topic: Topic;
  goal: string;
  story: string;
  knowledgeCards: string[];
  bossChallenge: string;
  quiz: QuizQuestion[];
};
