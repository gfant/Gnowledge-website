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

export interface User {
  title: string;
  questions: string;
}

export interface Answer {
  content: string;
}