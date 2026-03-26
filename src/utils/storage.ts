import type { ExamProgress, ExamSession } from '../types/exam';

const KEYS = {
  COMPLETED: 'ald-completed-scenarios',
  EXAM_PROGRESS: 'ald-exam-progress',
  EXAM_SESSION: 'ald-exam-session',
} as const;

function safeGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

// --- Scenario completion ---

export function loadCompletedScenarios(): string[] {
  return safeGet<string[]>(KEYS.COMPLETED) ?? [];
}

export function saveCompletedScenarios(ids: string[]): void {
  safeSet(KEYS.COMPLETED, ids);
}

// --- Exam progress ---

const DEFAULT_PROGRESS: ExamProgress = {
  questionStatus: {},
  bookmarkedIds: [],
  history: [],
};

export function loadExamProgress(): ExamProgress {
  return safeGet<ExamProgress>(KEYS.EXAM_PROGRESS) ?? { ...DEFAULT_PROGRESS };
}

export function saveExamProgress(progress: ExamProgress): void {
  safeSet(KEYS.EXAM_PROGRESS, progress);
}

// --- Exam session (resumable) ---

export function loadExamSession(): ExamSession | null {
  return safeGet<ExamSession>(KEYS.EXAM_SESSION);
}

export function saveExamSession(session: ExamSession): void {
  safeSet(KEYS.EXAM_SESSION, session);
}

export function clearExamSession(): void {
  try {
    localStorage.removeItem(KEYS.EXAM_SESSION);
  } catch {
    // ignore
  }
}
