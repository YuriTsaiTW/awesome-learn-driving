import { useNavigate } from 'react-router-dom';
import type { ExamProgress, ExamSession, ExamCategory } from '../../types/exam';
import { EXAM_QUESTION_MAP } from '../../data/exam-questions';
import { SCENARIOS } from '../../data/scenarios';

interface ExamResultProps {
  session: ExamSession;
  progress: ExamProgress;
  onRetry: () => void;
  onRetryWrong: (session: ExamSession) => void;
  onHome: () => void;
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

const OPT_LABELS = ['A', 'B', 'C', 'D'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ExamResult({ session, onRetry, onRetryWrong, onHome }: ExamResultProps) {
  const navigate = useNavigate();
  const total = session.questionIds.length;

  const results = session.questionIds.map(function (qid, i) {
    const q = EXAM_QUESTION_MAP.get(qid);
    const ans = session.answers[i] ?? null;
    return { q, ans, correct: q ? ans === q.correct : false };
  });

  const correctCount = results.filter((r) => r.correct).length;
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const grade =
    pct >= 85
      ? { label: '優秀', color: '#4ade80', emoji: '🏆', sub: '已充分掌握這些題目！' }
      : pct >= 70
        ? { label: '良好', color: '#fbbf24', emoji: '👍', sub: '再加強一下，就能穩過！' }
        : { label: '需加強', color: '#f87171', emoji: '📚', sub: '建議重新複習錯題' };

  const wrongItems = results.filter((r) => !r.correct && r.q);

  // Category breakdown
  const catStats = CATEGORIES.map(function (cat) {
    const catIds = session.questionIds.filter(function (qid) {
      const q = EXAM_QUESTION_MAP.get(qid);
      return q?.category === cat;
    });
    if (catIds.length === 0) return null;
    const catCorrect = catIds.filter(function (qid) {
      const globalIdx = session.questionIds.indexOf(qid);
      const q = EXAM_QUESTION_MAP.get(qid);
      return q && session.answers[globalIdx] === q.correct;
    }).length;
    return { cat, total: catIds.length, correct: catCorrect };
  }).filter(Boolean) as { cat: ExamCategory; total: number; correct: number }[];

  function handleRetryWrong() {
    const wrongIds = wrongItems.map((r) => r.q!.id);
    if (wrongIds.length === 0) return;
    const shuffled = shuffle(wrongIds);
    const newSession: ExamSession = {
      sessionId: String(Date.now()),
      questionIds: shuffled,
      answers: shuffled.map(() => null),
      bookmarks: [],
      currentIndex: 0,
      startedAt: Date.now(),
      completed: false,
    };
    onRetryWrong(newSession);
  }

  return (
    <div className="exam-inner anim-fade">
      {/* Grade */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56, marginBottom: 10 }}>{grade.emoji}</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: grade.color, marginBottom: 4 }}>
          {grade.label}
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, color: 'white', marginBottom: 4 }}>
          {pct}
          <span style={{ fontSize: 18 }}>%</span>
        </div>
        <div style={{ color: '#64748b', fontSize: 14, marginBottom: 4 }}>
          {correctCount} ／ {total} 題答對
        </div>
        <div style={{ color: '#94a3b8', fontSize: 13 }}>{grade.sub}</div>
      </div>

      {/* Category breakdown */}
      {catStats.length > 0 && (
        <div
          style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 20,
            padding: '16px 20px',
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 12 }}>
            分類分析
          </div>
          {catStats.map(function (cs) {
            const cpct = Math.round((cs.correct / cs.total) * 100);
            return (
              <div key={cs.cat} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>{CATEGORY_LABELS[cs.cat]}</span>
                  <span style={{ fontSize: 12, color: '#475569' }}>
                    {cs.correct}/{cs.total} · {cpct}%
                  </span>
                </div>
                <div
                  style={{ height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${cpct}%`,
                      background: cpct >= 80 ? '#4ade80' : cpct >= 60 ? '#fbbf24' : '#f87171',
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {wrongItems.length > 0 && (
          <button
            onClick={handleRetryWrong}
            style={{
              padding: '13px',
              borderRadius: 18,
              border: '1px solid #f87171',
              background: 'rgba(248,113,113,0.1)',
              color: '#f87171',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            🔁 重測錯題（{wrongItems.length}）
          </button>
        )}
        <button
          onClick={onRetry}
          style={{
            padding: '13px',
            borderRadius: 18,
            border: '1px solid #475569',
            background: 'transparent',
            color: 'white',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ✏️ 再測一次
        </button>
        <button
          onClick={onHome}
          style={{
            gridColumn: wrongItems.length > 0 ? '1 / -1' : 'auto',
            padding: '13px',
            borderRadius: 18,
            border: 'none',
            background: 'linear-gradient(135deg,#f59e0b,#d97706)',
            color: '#000',
            fontSize: 13,
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          🏠 返回測驗首頁
        </button>
      </div>

      {/* Wrong answers review */}
      {wrongItems.length > 0 && (
        <div
          style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          <div
            style={{
              padding: '14px 20px',
              color: '#f87171',
              fontWeight: 700,
              fontSize: 14,
              borderBottom: '1px solid #334155',
            }}
          >
            ✗ 答錯的題目（{wrongItems.length} 題）
          </div>
          <div style={{ padding: '10px 0' }}>
            {wrongItems.map(function (r, wi) {
              const q = r.q!;
              const ans = r.ans;
              const sc = q.scenarioId ? SCENARIOS.find((s) => s.id === q.scenarioId) : null;
              return (
                <div
                  key={q.id}
                  style={{
                    padding: '14px 20px',
                    borderBottom: wi < wrongItems.length - 1 ? '1px solid #0f172a' : 'none',
                  }}
                >
                  {q.image && (
                    <img
                      src={`${import.meta.env.BASE_URL}${q.image}`}
                      alt="題目圖片"
                      style={{ display: 'block', maxWidth: 120, marginBottom: 8, borderRadius: 6 }}
                    />
                  )}
                  <div style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                    {q.question}
                  </div>
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}
                  >
                    {q.options.map(function (opt, oi) {
                      const isCorrectOpt = oi === q.correct;
                      const isUserOpt = oi === ans;
                      if (!isCorrectOpt && !isUserOpt) return null;
                      return (
                        <div
                          key={oi}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: 12,
                            color: isCorrectOpt ? '#4ade80' : '#f87171',
                          }}
                        >
                          <span
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              border: `1.5px solid ${isCorrectOpt ? '#4ade80' : '#f87171'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 10,
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {OPT_LABELS[oi]}
                          </span>
                          {opt}
                          {isCorrectOpt && <span>✓ 正確</span>}
                          {isUserOpt && !isCorrectOpt && <span>（你的答案）</span>}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      background: 'rgba(248,113,113,0.08)',
                      borderRadius: 10,
                      padding: '8px 10px',
                      fontSize: 12,
                      color: '#94a3b8',
                      lineHeight: 1.6,
                      marginBottom: sc ? 8 : 0,
                    }}
                  >
                    {q.explanation}
                  </div>
                  {sc && (
                    <button
                      onClick={function () {
                        navigate(`/scenario/${sc.id}`);
                      }}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 10,
                        background: 'rgba(96,165,250,0.12)',
                        border: '1px solid rgba(96,165,250,0.3)',
                        color: '#60a5fa',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      🚗 前往「{sc.title}」情境學習 →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamResult;
