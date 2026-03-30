import { useNavigate } from 'react-router-dom';
import type { ExamProgress, ExamSession } from '../../types/exam';
import { ALL_EXAM_QUESTIONS as EXAM_QUESTIONS } from '../../data/exam-questions';
import { SCENARIOS } from '../../data/scenarios';
import type { ExamCategory } from '../../types/exam';

interface ExamDashboardProps {
  progress: ExamProgress;
  session: ExamSession | null;
  onClearProgress: () => void;
}

const CATEGORY_LABELS: Record<ExamCategory, string> = {
  'regulation-tf': '法規是非',
  'regulation-mc': '法規選擇',
  'sign-tf': '標誌是非',
  'sign-mc': '標誌選擇',
  mechanical: '機械常識',
};

const CATEGORIES: ExamCategory[] = [
  'regulation-tf',
  'regulation-mc',
  'sign-tf',
  'sign-mc',
  'mechanical',
];

function DonutChart({
  correct,
  incorrect,
  unanswered,
  total,
}: {
  correct: number;
  incorrect: number;
  unanswered: number;
  total: number;
}) {
  const r = 52;
  const cx = 64;
  const cy = 64;
  const circ = 2 * Math.PI * r;

  function arc(value: number, offset: number, color: string) {
    if (total === 0 || value === 0) return null;
    const dash = (value / total) * circ;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        style={{ stroke: color }}
        strokeWidth={18}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={-offset}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    );
  }

  const correctOffset = 0;
  const incorrectOffset = (correct / total) * circ;
  const unansweredOffset = incorrectOffset + (incorrect / total) * circ;

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div style={{ position: 'relative', width: 128, height: 128 }}>
      <svg viewBox="0 0 128 128" width={128} height={128}>
        {/* Background ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          style={{ stroke: 'var(--border-subtle)' }}
          strokeWidth={18}
        />
        {total > 0 ? (
          <>
            {arc(unanswered, unansweredOffset, 'var(--border-base)')}
            {arc(incorrect, incorrectOffset, 'var(--red-light)')}
            {arc(correct, correctOffset, 'var(--green-light)')}
          </>
        ) : null}
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}
        >
          {pct}%
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>正確率</span>
      </div>
    </div>
  );
}

function ExamDashboard({ progress, session, onClearProgress }: ExamDashboardProps) {
  const navigate = useNavigate();
  const { questionStatus, bookmarkedIds } = progress;

  const total = EXAM_QUESTIONS.length;
  const correct = EXAM_QUESTIONS.filter((q) => questionStatus[q.id] === 'correct').length;
  const incorrect = EXAM_QUESTIONS.filter((q) => questionStatus[q.id] === 'incorrect').length;
  const answered = correct + incorrect;
  const unanswered = total - answered;

  const bookmarkedQuestions = EXAM_QUESTIONS.filter((q) => bookmarkedIds.includes(q.id));

  return (
    <div className="exam-inner anim-fade">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{ fontSize: 30, fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 6px' }}
        >
          📝 筆試測驗
        </h2>
        <p style={{ color: 'var(--text-faint)', fontSize: 14, margin: 0 }}>
          台灣汽車駕照筆試題庫練習
        </p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 10,
          marginBottom: 24,
        }}
      >
        {[
          { val: `${answered}/${total}`, label: '已作答', color: 'var(--accent-light)' },
          {
            val: answered > 0 ? Math.round((correct / answered) * 100) + '%' : '—',
            label: '答對率',
            color: 'var(--green-light)',
          },
          { val: bookmarkedIds.length, label: '書籤', color: 'var(--accent)' },
        ].map(function (s, i) {
          return (
            <div
              key={i}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 16,
                padding: '14px 8px',
                textAlign: 'center',
                border: '1px solid var(--border-base)',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 13, color: 'var(--text-faint)', marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Donut + category breakdown */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 20,
          padding: '20px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <DonutChart correct={correct} incorrect={incorrect} unanswered={unanswered} total={total} />
        <div style={{ flex: 1, minWidth: 160 }}>
          {/* Legend */}
          {[
            { label: '答對', count: correct, color: 'var(--green-light)' },
            { label: '答錯', count: incorrect, color: 'var(--red-light)' },
            { label: '未答', count: unanswered, color: 'var(--text-disabled)' },
          ].map(function (item) {
            return (
              <div
                key={item.label}
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: item.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: 'var(--text-muted)', fontSize: 13, flex: 1 }}>
                  {item.label}
                </span>
                <span style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700 }}>
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category progress */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-base)',
          borderRadius: 20,
          padding: '16px 20px',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: 'var(--text-faint)',
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          分類進度
        </div>
        {CATEGORIES.map(function (cat) {
          const catQs = EXAM_QUESTIONS.filter((q) => q.category === cat);
          if (catQs.length === 0) return null;
          const catCorrect = catQs.filter((q) => questionStatus[q.id] === 'correct').length;
          const catAnswered = catQs.filter((q) => questionStatus[q.id] !== 'unanswered').length;
          const pct = catQs.length > 0 ? Math.round((catCorrect / catQs.length) * 100) : 0;
          return (
            <div key={cat} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {CATEGORY_LABELS[cat]}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-disabled)' }}>
                  {catAnswered}/{catQs.length} 題 · {pct}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: 'var(--bg-elevated)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${pct}%`,
                    background:
                      pct >= 80
                        ? 'var(--green-light)'
                        : pct >= 60
                          ? 'var(--accent-light)'
                          : 'var(--blue)',
                    borderRadius: 3,
                    transition: 'width 0.4s',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {session && !session.completed && (
          <button
            onClick={function () {
              navigate('/exam/test');
            }}
            style={{
              padding: '14px',
              borderRadius: 18,
              border: '1px solid var(--accent)',
              background: 'var(--accent-bg)',
              color: 'var(--accent-light)',
              fontSize: 15,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            ▶ 繼續未完成的測驗（{session.questionIds.length} 題）
          </button>
        )}
        <button
          onClick={function () {
            navigate('/exam/config');
          }}
          style={{
            padding: '14px',
            borderRadius: 18,
            border: 'none',
            background: 'linear-gradient(135deg,#1d4ed8,#1e40af)',
            color: 'white',
            fontSize: 15,
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          ✏️ 開始新測驗
        </button>
      </div>

      {/* Bookmarks accordion */}
      {bookmarkedQuestions.length > 0 && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-base)',
            borderRadius: 20,
            marginBottom: 20,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 20px',
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: 14,
              borderBottom: '1px solid var(--border-base)',
            }}
          >
            ★ 書籤題目（{bookmarkedQuestions.length} 題）
          </div>
          <div style={{ padding: '10px 14px 14px' }}>
            {bookmarkedQuestions.map(function (q, idx) {
              const sc = q.scenarioId ? SCENARIOS.find((s) => s.id === q.scenarioId) : null;
              return (
                <div
                  key={q.id}
                  style={{
                    padding: '10px 0',
                    borderBottom:
                      idx < bookmarkedQuestions.length - 1
                        ? '1px solid var(--border-subtle)'
                        : 'none',
                  }}
                >
                  <div style={{ color: 'var(--text-body)', fontSize: 13, marginBottom: 4 }}>
                    {q.question}
                  </div>
                  {sc && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 10,
                        background: 'rgba(96,165,250,0.15)',
                        border: '1px solid rgba(96,165,250,0.3)',
                        color: 'var(--blue)',
                        fontSize: 11,
                      }}
                    >
                      🚗 {sc.title}
                    </span>
                  )}
                </div>
              );
            })}
            <button
              onClick={function () {
                navigate('/exam/config?source=bookmarks');
              }}
              style={{
                marginTop: 10,
                width: '100%',
                padding: '10px',
                borderRadius: 12,
                border: '1px solid var(--border-base)',
                background: 'transparent',
                color: 'var(--accent)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              只測書籤題目 →
            </button>
          </div>
        </div>
      )}

      {/* History */}
      {progress.history.length > 0 && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-base)',
            borderRadius: 20,
            padding: '16px 20px',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: 'var(--text-faint)',
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            最近測驗記錄
          </div>
          {progress.history
            .slice(-5)
            .reverse()
            .map(function (h) {
              const pct =
                h.totalQuestions > 0 ? Math.round((h.correctCount / h.totalQuestions) * 100) : 0;
              const d = new Date(h.date);
              return (
                <div
                  key={h.sessionId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--bg-elevated)',
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: 'var(--text-faint)' }}>
                    {d.getMonth() + 1}/{d.getDate()} {String(d.getHours()).padStart(2, '0')}:
                    {String(d.getMinutes()).padStart(2, '0')}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>{h.totalQuestions} 題</span>
                  <span
                    style={{
                      fontWeight: 700,
                      color:
                        pct >= 80
                          ? 'var(--green-light)'
                          : pct >= 60
                            ? 'var(--accent-light)'
                            : 'var(--red-light)',
                    }}
                  >
                    {pct}%
                  </span>
                </div>
              );
            })}
        </div>
      )}

      {/* Reset progress */}
      {answered > 0 && (
        <div style={{ textAlign: 'center', paddingBottom: 8 }}>
          <button
            onClick={function () {
              if (confirm('確定要清除所有作答記錄嗎？')) onClearProgress();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-disabled)',
              fontSize: 12,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            清除作答記錄
          </button>
        </div>
      )}
    </div>
  );
}

export default ExamDashboard;
