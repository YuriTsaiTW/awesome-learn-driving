import type { Phase } from '../types/scenario';

export const PHASES: Phase[] = [
  'intro',
  'decision',
  'consequence',
  'learning',
  'quiz',
  'simulation',
  'result',
];

export const PHASE_LABELS = ['情境', '決策', '後果', '教學', '測驗', '模擬', '結果'];

export interface ReviewPhase {
  id: Phase;
  label: string;
  icon: string;
  desc: string;
}

export const REVIEW_PHASES: ReviewPhase[] = [
  { id: 'intro', label: '情境介紹', icon: '📖', desc: '重新閱讀情境故事與人物背景' },
  { id: 'decision', label: '緊急決策', icon: '🤔', desc: '重做決策選擇，看看不同後果' },
  { id: 'consequence', label: '後果說明', icon: '⚡', desc: '查看正確決策的分析說明' },
  { id: 'learning', label: '教學步驟', icon: '📚', desc: '複習正確的緊急應對流程' },
  { id: 'quiz', label: '知識測驗', icon: '📝', desc: '再次挑戰知識測驗題目' },
  { id: 'simulation', label: '情境模擬', icon: '🎮', desc: '重新操作駕駛艙互動模擬' },
  { id: 'result', label: '查看成績', icon: '🏆', desc: '重溫上次的測驗成績' },
];
