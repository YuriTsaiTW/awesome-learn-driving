import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ExamProgress, ExamSession } from '../../types/exam';
import { EXAM_QUESTION_MAP } from '../../data/exam-questions';
import { SCENARIOS } from '../../data/scenarios';
import type { ExamCategory } from '../../types/exam';

interface ExamTestProps {
  session: ExamSession;
  progress: ExamProgress;
  onUpdate: (session: ExamSession, progress: ExamProgress) => void;
  onComplete: (session: ExamSession, progress: ExamProgress) => void;
  onPause: () => void;
}

const CATEGORY_LABELS: Record<ExamCategory, string> = {
  'regulation-tf': '法規是非',
  'regulation-mc': '法規選擇',
  'sign-tf': '標誌是非',
  'sign-mc': '標誌選擇',
  mechanical: '機械常識',
};

const OPT_LABELS = ['A', 'B', 'C', 'D'];

function ExamTest({ session, progress, onUpdate, onComplete, onPause }: ExamTestProps) {
  const navigate = useNavigate();

  // Use refs for stale-closure-safe event listener access
  const sessionRef = useRef(session);
  const progressRef = useRef(progress);
  sessionRef.current = session;
  progressRef.current = progress;

  const idx = session.currentIndex;
  const questionId = session.questionIds[idx];
  const question = EXAM_QUESTION_MAP.get(questionId);
  const selected = session.answers[idx];
  const isAnswered = selected !== null;
  const isBookmarked = session.bookmarks.includes(idx);
  const linkedScenario = question?.scenarioId
    ? SCENARIOS.find((s) => s.id === question.scenarioId)
    : null;

  const totalQ = session.questionIds.length;
  const answeredCount = session.answers.filter((a) => a !== null).length;

  // Keyboard shortcuts: 1-4 to select options, right arrow / enter for next
  const handleKey = useCallback(
    function (e: KeyboardEvent) {
      const s = sessionRef.current;
      const p = progressRef.current;
      const curIdx = s.currentIndex;
      const curAnswer = s.answers[curIdx];
      const q = EXAM_QUESTION_MAP.get(s.questionIds[curIdx]);
      if (!q) return;

      const numKey = parseInt(e.key);
      if (numKey >= 1 && numKey <= q.options.length && curAnswer === null) {
        e.preventDefault();
        handleSelect(numKey - 1, s, p);
        return;
      }
      if ((e.key === 'ArrowRight' || e.key === 'Enter') && curAnswer !== null) {
        e.preventDefault();
        handleNext(s, p);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(
    function () {
      window.addEventListener('keydown', handleKey);
      return function () {
        window.removeEventListener('keydown', handleKey);
      };
    },
    [handleKey],
  );

  function handleSelect(optionIdx: number, s: ExamSession, p: ExamProgress) {
    if (s.answers[s.currentIndex] !== null) return;
    const q = EXAM_QUESTION_MAP.get(s.questionIds[s.currentIndex]);
    if (!q) return;

    const correct = optionIdx === q.correct;
    const newAnswers = [...s.answers];
    newAnswers[s.currentIndex] = optionIdx;

    const newStatus = { ...p.questionStatus };
    // Only override if not already correct (don't downgrade a previously correct answer)
    if (newStatus[q.id] !== 'correct') {
      newStatus[q.id] = correct ? 'correct' : 'incorrect';
    } else if (!correct) {
      newStatus[q.id] = 'incorrect';
    }

    const newSession = { ...s, answers: newAnswers };
    const newProgress = { ...p, questionStatus: newStatus };
    onUpdate(newSession, newProgress);
  }

  function handleNext(s: ExamSession, p: ExamProgress) {
    if (s.currentIndex < s.questionIds.length - 1) {
      onUpdate({ ...s, currentIndex: s.currentIndex + 1 }, p);
    } else {
      finishSession(s, p);
    }
  }

  function finishSession(s: ExamSession, p: ExamProgress) {
    const correctCount = s.questionIds.filter(function (qid, i) {
      const q = EXAM_QUESTION_MAP.get(qid);
      return q && s.answers[i] === q.correct;
    }).length;

    const summary = {
      sessionId: s.sessionId,
      date: Date.now(),
      totalQuestions: s.questionIds.length,
      correctCount,
    };
    const newHistory = [...p.history, summary].slice(-50);
    const completedSession = { ...s, completed: true };
    const newProgress = { ...p, history: newHistory };
    onComplete(completedSession, newProgress);
  }

  function toggleBookmark() {
    const bookmarks = session.bookmarks.includes(idx)
      ? session.bookmarks.filter((b) => b !== idx)
      : [...session.bookmarks, idx];

    // Also sync bookmarkedIds in progress
    const newBookmarkedIds = new Set(progress.bookmarkedIds);
    if (bookmarks.includes(idx)) {
      newBookmarkedIds.add(questionId);
    } else {
      newBookmarkedIds.delete(questionId);
    }

    onUpdate({ ...session, bookmarks }, { ...progress, bookmarkedIds: [...newBookmarkedIds] });
  }

  function jumpTo(targetIdx: number) {
    onUpdate({ ...session, currentIndex: targetIdx }, progress);
  }

  if (!question) return null;

  const progressPct = ((idx + (isAnswered ? 1 : 0)) / totalQ) * 100;

  return (
    <div className="exam-inner">
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 16,
        }}
      >
        <button
          onClick={onPause}
          style={{
            background: 'transparent',
            border: '1px solid #334155',
            borderRadius: 12,
            color: '#94a3b8',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          ⏸ 暫停
        </button>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              color: '#64748b',
              marginBottom: 4,
            }}
          >
            <span>
              第 {idx + 1} / {totalQ} 題
            </span>
            <span>{answeredCount} 已作答</span>
          </div>
          <div style={{ height: 4, background: '#1e293b', borderRadius: 2, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPct}%`,
                background: '#1d4ed8',
                borderRadius: 2,
                transition: 'width 0.2s',
              }}
            />
          </div>
        </div>
      </div>

      {/* Question card */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 20,
          padding: '18px 20px',
          marginBottom: 14,
          position: 'relative',
        }}
      >
        {/* Top row: category badge + bookmark */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span
              style={{
                padding: '2px 10px',
                borderRadius: 10,
                background: '#0f172a',
                color: '#60a5fa',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {CATEGORY_LABELS[question.category]}
            </span>
            {linkedScenario && (
              <button
                onClick={function () {
                  navigate(`/scenario/${linkedScenario.id}`);
                }}
                style={{
                  padding: '2px 10px',
                  borderRadius: 10,
                  background: 'rgba(96,165,250,0.12)',
                  border: '1px solid rgba(96,165,250,0.3)',
                  color: '#60a5fa',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                🚗 {linkedScenario.title} →
              </button>
            )}
          </div>
          <button
            onClick={toggleBookmark}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 20,
              cursor: 'pointer',
              color: isBookmarked ? '#f59e0b' : '#334155',
              lineHeight: 1,
              padding: '2px 4px',
            }}
            title={isBookmarked ? '取消書籤' : '加入書籤'}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
        </div>

        {/* Question image */}
        {question.image && (
          <img
            src={`${import.meta.env.BASE_URL}${question.image}`}
            alt="題目圖片"
            style={{ display: 'block', maxWidth: 200, marginBottom: 12, borderRadius: 8 }}
          />
        )}

        {/* Question text */}
        <div
          className="quiz-q"
          style={{ color: 'white', fontSize: 15, fontWeight: 600, lineHeight: 1.6 }}
        >
          {question.question}
        </div>
      </div>

      {/* Options */}
      <div className="quiz-options" style={{ marginBottom: 14 }}>
        {question.options.map(function (opt, i) {
          let bg = '#1e293b';
          let borderColor = '#334155';
          let textColor = '#cbd5e1';

          if (isAnswered) {
            if (i === question.correct) {
              bg = 'rgba(74,222,128,0.12)';
              borderColor = '#4ade80';
              textColor = '#4ade80';
            } else if (i === selected && i !== question.correct) {
              bg = 'rgba(248,113,113,0.12)';
              borderColor = '#f87171';
              textColor = '#f87171';
            }
          } else if (selected === i) {
            bg = '#1e3a5f';
            borderColor = '#60a5fa';
            textColor = '#93c5fd';
          }

          return (
            <button
              key={i}
              onClick={function () {
                handleSelect(i, session, progress);
              }}
              disabled={isAnswered}
              className="btn-choice"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 16,
                border: `1px solid ${borderColor}`,
                background: bg,
                cursor: isAnswered ? 'default' : 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  border: `2px solid ${borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: textColor,
                  flexShrink: 0,
                }}
              >
                {OPT_LABELS[i]}
              </span>
              <span
                className="opt-text"
                style={{ color: textColor, fontSize: 14, lineHeight: 1.55, flex: 1 }}
              >
                {opt}
              </span>
              {isAnswered && i === question.correct && (
                <span style={{ color: '#4ade80', fontSize: 16, flexShrink: 0 }}>✓</span>
              )}
              {isAnswered && i === selected && i !== question.correct && (
                <span style={{ color: '#f87171', fontSize: 16, flexShrink: 0 }}>✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isAnswered && (
        <div
          className="anim-slide"
          style={{
            background:
              selected === question.correct ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
            border: `1px solid ${selected === question.correct ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
            borderRadius: 16,
            padding: '12px 16px',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: selected === question.correct ? '#4ade80' : '#f87171',
              marginBottom: 6,
            }}
          >
            {selected === question.correct ? '✓ 答對了！' : '✗ 答錯了'}
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
            {question.explanation}
          </div>
        </div>
      )}

      {/* Next / Finish button */}
      {isAnswered && (
        <button
          className="anim-slide"
          onClick={function () {
            handleNext(session, progress);
          }}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 18,
            border: 'none',
            background: 'linear-gradient(135deg,#1d4ed8,#1e40af)',
            color: 'white',
            fontSize: 15,
            fontWeight: 800,
            cursor: 'pointer',
            marginBottom: 20,
          }}
        >
          {idx < totalQ - 1 ? '下一題 →' : '查看結果 →'}
        </button>
      )}

      {/* Progress dots navigation */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          justifyContent: 'center',
          paddingBottom: 12,
        }}
      >
        {session.questionIds.map(function (qid, i) {
          const ans = session.answers[i];
          const q = EXAM_QUESTION_MAP.get(qid);
          const isCorrect = q && ans !== null && ans === q.correct;
          const isWrong = q && ans !== null && ans !== q.correct;
          const isBookmarkedDot = session.bookmarks.includes(i);
          const isCurrent = i === idx;

          let bg = '#334155'; // unanswered
          if (isCorrect) bg = '#4ade80';
          else if (isWrong) bg = '#f87171';

          return (
            <button
              key={i}
              onClick={function () {
                jumpTo(i);
              }}
              title={`第 ${i + 1} 題`}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: bg,
                border: isCurrent
                  ? '2px solid white'
                  : isBookmarkedDot
                    ? '2px solid #f59e0b'
                    : '2px solid transparent',
                cursor: 'pointer',
                fontSize: 10,
                color: ans !== null ? '#0f172a' : '#64748b',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ExamTest;
