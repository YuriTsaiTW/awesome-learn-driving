import { useState } from 'react';
import type { Scenario } from '../types/scenario';

interface QuizPhaseProps {
  scenario: Scenario;
  onComplete: (score: number, total: number) => void;
}

const QuizPhase = ({ scenario, onComplete }: QuizPhaseProps) => {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const q = scenario.quiz[qIdx];

  const pick = (i: number) => {
    if (selected === null) setSelected(i);
  };

  const next = () => {
    const newAnswers = [...answers, selected === q.correct];
    if (qIdx < scenario.quiz.length - 1) {
      setAnswers(newAnswers);
      setQIdx(qIdx + 1);
      setSelected(null);
    } else {
      onComplete(newAnswers.filter(Boolean).length, newAnswers.length);
    }
  };

  const optionStyle = (i: number) => {
    let bg = 'var(--bg-card)',
      border = 'var(--border-base)',
      color = 'var(--text-secondary)';
    if (selected !== null) {
      if (i === q.correct) {
        bg = 'var(--green-bg)';
        border = 'var(--green-deep)';
        color = 'var(--green-text)';
      } else if (i === selected) {
        bg = 'var(--red-bg)';
        border = 'var(--red)';
        color = 'var(--red-text)';
      } else {
        bg = 'var(--bg-muted)';
        color = 'var(--text-disabled)';
      }
    }
    return { bg, border, color };
  };

  const optLabel = (i: number, sel: number | null, correct: number) => {
    if (sel === null) return String.fromCharCode(65 + i);
    if (i === correct) return '\u2713';
    if (i === sel) return '\u2717';
    return String.fromCharCode(65 + i);
  };

  return (
    <div className="anim-fade">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <span style={{ color: 'var(--text-faint)', fontSize: 14 }}>
          第 {qIdx + 1} 題 ／ 共 {scenario.quiz.length} 題
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {scenario.quiz.map((_, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 6,
                borderRadius: 3,
                background:
                  i < qIdx ? 'var(--green)' : i === qIdx ? 'var(--accent)' : 'var(--border-base)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 20,
          padding: 18,
          marginBottom: 14,
          border: '1px solid var(--border-base)',
        }}
      >
        <div style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          📝 測驗
        </div>
        <p
          className="quiz-q"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: 14,
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {q.question}
        </p>
      </div>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          const s = optionStyle(i);
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: s.bg,
                borderRadius: 16,
                border: `1px solid ${s.border}`,
                cursor: selected === null ? 'pointer' : 'default',
                textAlign: 'left',
                transition: 'all 0.15s',
                width: '100%',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 14,
                  fontWeight: 800,
                  background:
                    selected !== null && i === q.correct
                      ? 'var(--green)'
                      : selected === i && selected !== q.correct
                        ? 'var(--red)'
                        : 'var(--border-base)',
                  color: 'var(--text-primary)',
                }}
              >
                {optLabel(i, selected, q.correct)}
              </div>
              <span className="opt-text" style={{ fontSize: 14, color: s.color, lineHeight: 1.5 }}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div
          className="anim-slide"
          style={{
            borderRadius: 16,
            padding: 14,
            marginBottom: 14,
            fontSize: 14,
            background: selected === q.correct ? 'var(--green-bg-soft)' : 'var(--bg-card)',
            border: `1px solid ${selected === q.correct ? 'var(--green-deep)' : 'var(--border-base)'}`,
            color: 'var(--text-body)',
            lineHeight: 1.7,
          }}
        >
          <strong
            style={{ color: selected === q.correct ? 'var(--green-light)' : 'var(--accent-light)' }}
          >
            {selected === q.correct ? '✅ 正確！' : '💡 解析：'}
          </strong>{' '}
          {q.explanation}
        </div>
      )}
      {selected !== null && (
        <button
          onClick={next}
          className="anim-slide"
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 20,
            fontWeight: 800,
            fontSize: 16,
            color: 'var(--cta-fg)',
            border: 'none',
            cursor: 'pointer',
            background: 'var(--gradient-cta)',
          }}
        >
          {qIdx < scenario.quiz.length - 1 ? '下一題 →' : '查看結果 →'}
        </button>
      )}
    </div>
  );
};

export default QuizPhase;
