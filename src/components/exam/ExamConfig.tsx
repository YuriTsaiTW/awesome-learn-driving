import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { ExamCategory, ExamProgress, ExamSession, QuestionStatus } from '../../types/exam';
import { EXAM_QUESTIONS } from '../../data/exam-questions';

interface ExamConfigProps {
  progress: ExamProgress;
  onStart: (session: ExamSession) => void;
}

const CATEGORY_LABELS: Record<ExamCategory, string> = {
  'regulation-tf': '法規是非',
  'regulation-mc': '法規選擇',
  'sign-tf': '標誌是非',
  'sign-mc': '標誌選擇',
  mechanical: '機械常識',
};

const ALL_CATEGORIES: ExamCategory[] = [
  'regulation-tf',
  'regulation-mc',
  'sign-tf',
  'sign-mc',
  'mechanical',
];

const PRESET_COUNTS = [10, 20, 40];

type SourceFilter = 'unanswered' | 'incorrect' | 'correct' | 'bookmarks';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ExamConfig({ progress, onStart }: ExamConfigProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookmarksOnly = searchParams.get('source') === 'bookmarks';

  const [countInput, setCountInput] = useState<number | 'custom'>(20);
  const [customCount, setCustomCount] = useState('');
  const [sources, setSources] = useState<Set<SourceFilter>>(
    bookmarksOnly ? new Set(['bookmarks']) : new Set(['unanswered', 'incorrect']),
  );
  const [categories, setCategories] = useState<Set<ExamCategory>>(new Set(ALL_CATEGORIES));

  const { questionStatus, bookmarkedIds } = progress;

  const availableQuestions = useMemo(
    function () {
      return EXAM_QUESTIONS.filter(function (q) {
        if (!categories.has(q.category)) return false;
        const status: QuestionStatus = questionStatus[q.id] ?? 'unanswered';
        if (sources.has('unanswered') && status === 'unanswered') return true;
        if (sources.has('incorrect') && status === 'incorrect') return true;
        if (sources.has('correct') && status === 'correct') return true;
        if (sources.has('bookmarks') && bookmarkedIds.includes(q.id)) return true;
        return false;
      });
    },
    [sources, categories, questionStatus, bookmarkedIds],
  );

  const requestedCount =
    countInput === 'custom'
      ? Math.max(1, Math.min(parseInt(customCount) || 0, availableQuestions.length))
      : countInput;

  const finalCount = Math.min(requestedCount, availableQuestions.length);

  function toggleSource(s: SourceFilter) {
    setSources(function (prev) {
      const next = new Set(prev);
      if (next.has(s)) {
        next.delete(s);
      } else {
        next.add(s);
      }
      return next;
    });
  }

  function toggleCategory(c: ExamCategory) {
    setCategories(function (prev) {
      const next = new Set(prev);
      if (next.has(c)) {
        next.delete(c);
      } else {
        next.add(c);
      }
      return next;
    });
  }

  function handleStart() {
    if (finalCount === 0) return;
    const picked = shuffle(availableQuestions).slice(0, finalCount);
    const session: ExamSession = {
      sessionId: String(Date.now()),
      questionIds: picked.map((q) => q.id),
      answers: picked.map(() => null),
      bookmarks: [],
      currentIndex: 0,
      startedAt: Date.now(),
      completed: false,
    };
    onStart(session);
  }

  const sourceOptions: { key: SourceFilter; label: string; count: number }[] = [
    {
      key: 'unanswered',
      label: '未答題',
      count: EXAM_QUESTIONS.filter(
        (q) => !questionStatus[q.id] || questionStatus[q.id] === 'unanswered',
      ).length,
    },
    {
      key: 'incorrect',
      label: '答錯的題目',
      count: EXAM_QUESTIONS.filter((q) => questionStatus[q.id] === 'incorrect').length,
    },
    {
      key: 'correct',
      label: '已答對的題目',
      count: EXAM_QUESTIONS.filter((q) => questionStatus[q.id] === 'correct').length,
    },
    {
      key: 'bookmarks',
      label: '書籤題目',
      count: bookmarkedIds.length,
    },
  ];

  return (
    <div className="exam-inner anim-fade">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <button
          onClick={function () {
            navigate('/exam');
          }}
          style={{
            background: 'transparent',
            border: '1px solid #334155',
            borderRadius: 12,
            color: '#94a3b8',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          ← 返回
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 900, color: 'white', margin: 0 }}>考前設定</h2>
      </div>

      {/* Question count */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 20,
          padding: '16px 20px',
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600, marginBottom: 12 }}>
          題數
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PRESET_COUNTS.map(function (n) {
            const active = countInput === n;
            return (
              <button
                key={n}
                onClick={function () {
                  setCountInput(n);
                }}
                style={{
                  padding: '6px 16px',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: active ? '#60a5fa' : '#334155',
                  background: active ? '#1e3a5f' : 'transparent',
                  color: active ? '#93c5fd' : '#64748b',
                  fontSize: 14,
                  fontWeight: active ? 700 : 400,
                  cursor: 'pointer',
                }}
              >
                {n} 題
              </button>
            );
          })}
          <button
            onClick={function () {
              setCountInput('custom');
            }}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              border: '1px solid',
              borderColor: countInput === 'custom' ? '#60a5fa' : '#334155',
              background: countInput === 'custom' ? '#1e3a5f' : 'transparent',
              color: countInput === 'custom' ? '#93c5fd' : '#64748b',
              fontSize: 14,
              fontWeight: countInput === 'custom' ? 700 : 400,
              cursor: 'pointer',
            }}
          >
            自訂
          </button>
        </div>
        {countInput === 'custom' && (
          <input
            type="number"
            min={1}
            max={availableQuestions.length}
            value={customCount}
            onChange={function (e) {
              setCustomCount(e.target.value);
            }}
            placeholder={`1 ~ ${availableQuestions.length}`}
            style={{
              marginTop: 10,
              width: 100,
              padding: '6px 10px',
              borderRadius: 10,
              border: '1px solid #334155',
              background: '#0f172a',
              color: 'white',
              fontSize: 14,
            }}
          />
        )}
      </div>

      {/* Source filter */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 20,
          padding: '16px 20px',
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600, marginBottom: 12 }}>
          題目來源
        </div>
        {sourceOptions.map(function (opt) {
          const checked = sources.has(opt.key);
          return (
            <label
              key={opt.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 0',
                cursor: 'pointer',
                borderBottom: '1px solid #0f172a',
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={function () {
                  toggleSource(opt.key);
                }}
                style={{ width: 16, height: 16, accentColor: '#60a5fa', cursor: 'pointer' }}
              />
              <span style={{ color: checked ? '#94a3b8' : '#475569', fontSize: 14, flex: 1 }}>
                {opt.label}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: '#475569',
                  background: '#0f172a',
                  padding: '2px 8px',
                  borderRadius: 10,
                }}
              >
                {opt.count} 題
              </span>
            </label>
          );
        })}
      </div>

      {/* Category filter */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 20,
          padding: '16px 20px',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>分類篩選</div>
          <button
            onClick={function () {
              if (categories.size === ALL_CATEGORIES.length) {
                setCategories(new Set());
              } else {
                setCategories(new Set(ALL_CATEGORIES));
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#60a5fa',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {categories.size === ALL_CATEGORIES.length ? '取消全選' : '全選'}
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ALL_CATEGORIES.map(function (cat) {
            const active = categories.has(cat);
            const catCount = EXAM_QUESTIONS.filter((q) => q.category === cat).length;
            return (
              <button
                key={cat}
                onClick={function () {
                  toggleCategory(cat);
                }}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: active ? '#60a5fa' : '#334155',
                  background: active ? '#1e3a5f' : 'transparent',
                  color: active ? '#93c5fd' : '#475569',
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {CATEGORY_LABELS[cat]}
                <span
                  style={{
                    fontSize: 11,
                    color: active ? '#60a5fa' : '#334155',
                    background: active ? 'rgba(96,165,250,0.15)' : '#0f172a',
                    padding: '0 5px',
                    borderRadius: 8,
                  }}
                >
                  {catCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Available count + start */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 20,
          padding: '16px 20px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2 }}>符合條件的題目</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: availableQuestions.length > 0 ? '#4ade80' : '#f87171',
            }}
          >
            {availableQuestions.length} 題
          </div>
          {finalCount > 0 && finalCount < requestedCount && (
            <div style={{ fontSize: 12, color: '#f59e0b', marginTop: 2 }}>
              （可用題數不足，將出 {finalCount} 題）
            </div>
          )}
        </div>
        <button
          onClick={handleStart}
          disabled={finalCount === 0}
          style={{
            padding: '12px 28px',
            borderRadius: 18,
            border: finalCount > 0 ? 'none' : '1px solid #334155',
            background: finalCount > 0 ? 'linear-gradient(135deg,#1d4ed8,#1e40af)' : '#1e293b',
            color: finalCount > 0 ? 'white' : '#475569',
            fontSize: 15,
            fontWeight: 800,
            cursor: finalCount > 0 ? 'pointer' : 'not-allowed',
          }}
        >
          ✏️ 開始測驗 {finalCount > 0 ? `(${finalCount} 題)` : ''}
        </button>
      </div>
    </div>
  );
}

export default ExamConfig;
