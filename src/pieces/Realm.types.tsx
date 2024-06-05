export interface Question {
  topics: string;
  question: string;
  score: number;
  author: string;
  id: string;
  createdOn: string;
}

export interface QuestionsMap {
  [key: string]: Question;
}

export interface Answer {
  response: string;
  score: number;
  author: string;
  createdOn: string;
}

export interface AnswersMap {
  [key: string]: Answer;
}

export interface User {
  title: string;
  questions: string;
}