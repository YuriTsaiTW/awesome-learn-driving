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
    let bg = '#1e293b',
      border = '#334155',
      color = '#e2e8f0';
    if (selected !== null) {
      if (i === q.correct) {
        bg = 'rgba(21,128,61,0.25)';
        border = '#16a34a';
        color = '#bbf7d0';
      } else if (i === selected) {
        bg = 'rgba(185,28,28,0.25)';
        border = '#dc2626';
        color = '#fecaca';
      } else {
        bg = 'rgba(30,41,59,0.4)';
        color = '#475569';
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
        <span style={{ color: '#64748b', fontSize: 12 }}>
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
                background: i < qIdx ? '#22c55e' : i === qIdx ? '#f59e0b' : '#334155',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          background: '#1e293b',
          borderRadius: 20,
          padding: 18,
          marginBottom: 14,
          border: '1px solid #334155',
        }}
      >
        <div style={{ color: '#f59e0b', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
          📝 測驗
        </div>
        <p style={{ color: 'white', fontWeight: 700, fontSize: 14, lineHeight: 1.65, margin: 0 }}>
          {q.question}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
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
                  fontSize: 12,
                  fontWeight: 800,
                  background:
                    selected !== null && i === q.correct
                      ? '#22c55e'
                      : selected === i && selected !== q.correct
                        ? '#dc2626'
                        : '#334155',
                  color: 'white',
                }}
              >
                {optLabel(i, selected, q.correct)}
              </div>
              <span style={{ fontSize: 13, color: s.color, lineHeight: 1.5 }}>{opt}</span>
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
            fontSize: 12,
            background: selected === q.correct ? 'rgba(21,128,61,0.15)' : '#1e293b',
            border: `1px solid ${selected === q.correct ? '#16a34a' : '#334155'}`,
            color: '#cbd5e1',
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: selected === q.correct ? '#4ade80' : '#fbbf24' }}>
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
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg,#f59e0b,#d97706)',
          }}
        >
          {qIdx < scenario.quiz.length - 1 ? '下一題 →' : '查看結果 →'}
        </button>
      )}
    </div>
  );
};

export default QuizPhase;
