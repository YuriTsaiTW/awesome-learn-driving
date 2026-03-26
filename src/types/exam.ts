import type { ScenarioId } from './scenario';

export type ExamQuestionType = 'tf' | 'mc';

export type ExamCategory =
  | 'regulation-tf' // 法規是非題
  | 'regulation-mc' // 法規選擇題
  | 'sign-tf' // 標誌是非題
  | 'sign-mc' // 標誌選擇題
  | 'mechanical'; // 機械常識

export type QuestionStatus = 'unanswered' | 'correct' | 'incorrect';

export interface ExamQuestion {
  id: string; // "EQ-0001"
  category: ExamCategory;
  question: string;
  options: string[]; // tf: ["O","X"]; mc: 3-4 options
  correct: number; // 0-based index into options
  explanation: string;
  tags?: string[];
  scenarioId?: ScenarioId; // links to one of the 12 scenarios
  image?: string; // path under public/ for sign questions
}

export interface ExamSession {
  sessionId: string;
  questionIds: string[];
  answers: (number | null)[];
  bookmarks: number[]; // indices into questionIds
  currentIndex: number;
  startedAt: number;
  completed: boolean;
}

export interface ExamSessionSummary {
  sessionId: string;
  date: number;
  totalQuestions: number;
  correctCount: number;
}

export interface ExamProgress {
  questionStatus: Record<string, QuestionStatus>;
  bookmarkedIds: string[];
  history: ExamSessionSummary[];
}
