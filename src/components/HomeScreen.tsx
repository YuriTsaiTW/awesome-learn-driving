import { useState } from 'react';
import type { Scenario } from '../types/scenario';
import { SCENARIOS } from '../data/scenarios';
import { SCENE_COMPONENTS } from '../data/scene-components';

type SortKey = 'default' | 'difficulty-asc' | 'difficulty-desc' | 'freq-desc' | 'freq-asc';

interface HomeScreenProps {
  onSelect: (sc: Scenario) => void;
  completed: string[];
}

const DIFFICULTY_RANK: Record<string, number> = { 低: 1, 中: 2, 高: 3 };

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'default', label: '預設' },
  { key: 'difficulty-asc', label: '難度 低→高' },
  { key: 'difficulty-desc', label: '難度 高→低' },
  { key: 'freq-desc', label: '頻率 多→少' },
  { key: 'freq-asc', label: '頻率 少→多' },
];

function sortScenarios(scenarios: Scenario[], key: SortKey): Scenario[] {
  if (key === 'default') return scenarios;
  return [...scenarios].sort((a, b) => {
    if (key === 'difficulty-asc')
      return (DIFFICULTY_RANK[a.difficulty] ?? 2) - (DIFFICULTY_RANK[b.difficulty] ?? 2);
    if (key === 'difficulty-desc')
      return (DIFFICULTY_RANK[b.difficulty] ?? 2) - (DIFFICULTY_RANK[a.difficulty] ?? 2);
    if (key === 'freq-desc') return b.annualFrequency - a.annualFrequency;
    if (key === 'freq-asc') return a.annualFrequency - b.annualFrequency;
    return 0;
  });
}

function FrequencyInfoPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: '#0f172a',
        border: '1px solid #334155',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          fontSize: 14,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span>📊 資料來源與計算說明</span>
        <span style={{ fontSize: 14 }}>{open ? '▲ 收起' : '▼ 展開'}</span>
      </button>
      {open && (
        <div
          style={{
            padding: '0 14px 12px',
            color: '#64748b',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: '0 0 6px', color: '#94a3b8', fontWeight: 600 }}>主要資料來源</p>
          <p style={{ margin: '0 0 8px' }}>
            交通部道安資訊平台（roadsafety.tw）—「事故肇因分析」—
            114年全國小型車事故肇因排行（初估值，產製日期：民國 115 年 3 月 24 日）
          </p>
          <p style={{ margin: '0 0 6px', color: '#94a3b8', fontWeight: 600 }}>
            直接對應官方數據的情境
          </p>
          <ul style={{ margin: '0 0 8px', paddingLeft: 16 }}>
            <li>
              路口碰撞危機：有號誌路口 13,448 件 + 無號誌路口轉彎 6,190 件 + 無號誌路口支線 5,907 件
              = 25,545 件
            </li>
            <li>追尾碰撞：未保持行車安全距離 9,148 件（小型車第 2 大肇因）</li>
            <li>疲勞駕駛：恍神、分心駕駛 7,786 件（小型車第 4 大肇因，含疲勞）</li>
            <li>機車鑽車縫：起步時未注意安全 6,768 件（小型車第 6 大肇因）</li>
          </ul>
          <p style={{ margin: '0 0 6px', color: '#94a3b8', fontWeight: 600 }}>推估值的情境</p>
          <ul style={{ margin: '0 0 4px', paddingLeft: 16 }}>
            <li>大雨濃霧：天候因素占全國事故約 1.2–1.5%，推估 ~5,000 件</li>
            <li>窄路會車：無號誌路口及山區鄉道事故，推估 ~4,500 件</li>
            <li>高速公路拋錨：依高速公路局年報救援案件推估 ~3,000 件</li>
            <li>爆胎：警政署機械故障肇因統計，推估 ~800 件</li>
            <li>水漂失控：複合因素難以獨立統計，專家估計 ~300 件</li>
            <li>煞車失靈：現代雙迴路煞車系統極可靠，推估 ~120 件</li>
          </ul>
          <p style={{ margin: '4px 0 0', color: '#475569', fontSize: 14 }}>
            ※ 以上數據均為「小型車為第一當事者」統計，推估值僅供排序參考。
          </p>
        </div>
      )}
    </div>
  );
}

function HomeScreen({ onSelect, completed }: HomeScreenProps) {
  const [sortKey, setSortKey] = useState<SortKey>('freq-desc');
  const sorted = sortScenarios(SCENARIOS, sortKey);
  const isFreqSort = sortKey === 'freq-desc' || sortKey === 'freq-asc';

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 20,
        background: 'linear-gradient(160deg,#0f172a,#1e293b)',
      }}
    >
      {/* Top-right links */}
      <div
        style={{
          position: 'fixed',
          top: 14,
          right: 16,
          display: 'flex',
          gap: 8,
          zIndex: 100,
        }}
      >
        <a
          href="https://github.com/YuriTsaiTW/awesome-learn-driving"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 10px',
            borderRadius: 10,
            background: 'rgba(15,23,42,0.85)',
            border: '1px solid #334155',
            color: '#94a3b8',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            backdropFilter: 'blur(6px)',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.borderColor = '#64748b';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.borderColor = '#334155';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          {/* GitHub icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a
          href="https://buymeacoffee.com/yurijournaltw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 10px',
            borderRadius: 10,
            background: 'rgba(251,191,36,0.12)',
            border: '1px solid rgba(251,191,36,0.35)',
            color: '#fbbf24',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            backdropFilter: 'blur(6px)',
            transition: 'background 0.15s, border-color 0.15s',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.background = 'rgba(251,191,36,0.22)';
            e.currentTarget.style.borderColor = 'rgba(251,191,36,0.6)';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.background = 'rgba(251,191,36,0.12)';
            e.currentTarget.style.borderColor = 'rgba(251,191,36,0.35)';
          }}
        >
          ☕ 請我喝咖啡
        </a>
      </div>

      <div className="home-inner">
        <div className="anim-fade" style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
            {/* Logo car — same flat SVG style as scenario scene cards */}
            <svg viewBox="0 0 120 72" width="120" height="72">
              {/* Body */}
              <rect x="8" y="34" width="104" height="28" fill="#1d4ed8" rx="6" />
              {/* Cabin */}
              <rect x="26" y="14" width="68" height="24" fill="#1e40af" rx="7" />
              {/* Windshield */}
              <rect x="30" y="17" width="28" height="16" fill="#93c5fd" rx="3" opacity="0.75" />
              {/* Rear window */}
              <rect x="62" y="17" width="24" height="16" fill="#93c5fd" rx="3" opacity="0.6" />
              {/* Headlight — blinking */}
              <rect
                x="106"
                y="40"
                width="8"
                height="6"
                fill="#fef08a"
                rx="2"
                className="anim-head-glow"
              />
              {/* Headlight glow beam */}
              <rect
                x="114"
                y="41"
                width="5"
                height="4"
                fill="#fef08a"
                rx="1"
                opacity="0.4"
                className="anim-head-glow"
              />
              {/* Tail light — blinking offset */}
              <rect
                x="6"
                y="40"
                width="6"
                height="6"
                fill="#ef4444"
                rx="2"
                className="anim-tail-light"
              />
              {/* Front wheel */}
              <ellipse cx="88" cy="62" rx="13" ry="10" fill="#111827" />
              <g className="anim-wheel-spin">
                <ellipse cx="88" cy="62" rx="7" ry="5.5" fill="#334155" />
                <line x1="88" y1="57" x2="88" y2="67" stroke="#475569" strokeWidth="1.5" />
                <line x1="83" y1="62" x2="93" y2="62" stroke="#475569" strokeWidth="1.5" />
              </g>
              {/* Rear wheel */}
              <ellipse cx="32" cy="62" rx="13" ry="10" fill="#111827" />
              <g className="anim-wheel-spin">
                <ellipse cx="32" cy="62" rx="7" ry="5.5" fill="#334155" />
                <line x1="32" y1="57" x2="32" y2="67" stroke="#475569" strokeWidth="1.5" />
                <line x1="27" y1="62" x2="37" y2="62" stroke="#475569" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
          <h1
            className="home-title"
            style={{ fontSize: 48, fontWeight: 900, color: 'white', margin: '0 0 10px' }}
          >
            Awesome Learn Driving
          </h1>
          <p style={{ fontSize: 20, color: '#64748b', margin: 0 }}>Safe Driving Makes Happy Life</p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            { val: SCENARIOS.length, label: '情境數', color: '#fbbf24' },
            { val: completed.length, label: '已完成', color: '#4ade80' },
            {
              val:
                completed.length > 0
                  ? Math.round((completed.length / SCENARIOS.length) * 100) + '%'
                  : '0%',
              label: '進度',
              color: '#60a5fa',
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: '#1e293b',
                borderRadius: 16,
                padding: '14px 8px',
                textAlign: 'center',
                border: '1px solid #334155',
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sort controls */}
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 14,
              color: '#64748b',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>排序</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortKey(opt.key)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: sortKey === opt.key ? '#60a5fa' : '#334155',
                  background: sortKey === opt.key ? '#1e3a5f' : '#1e293b',
                  color: sortKey === opt.key ? '#93c5fd' : '#64748b',
                  fontSize: 14,
                  cursor: 'pointer',
                  fontWeight: sortKey === opt.key ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Frequency data source panel */}
        {isFreqSort && <FrequencyInfoPanel />}

        <div className="scenario-list">
          {sorted.map((sc) => {
            const SceneComp = SCENE_COMPONENTS[sc.id];
            const done = completed.includes(sc.id);
            return (
              <button
                key={sc.id}
                onClick={() => onSelect(sc)}
                className="scenario-card"
                style={{
                  background: '#1e293b',
                  border: done ? '1px solid #16a34a' : '1px solid #334155',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = sc.accent)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = done ? '#16a34a' : '#334155')
                }
              >
                <div className="scenario-thumb" style={{ background: '#0f172a' }}>
                  {SceneComp && <SceneComp />}
                </div>
                <div className="scenario-card-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span
                      className="scenario-card-title"
                      style={{ color: 'white', fontWeight: 700, fontSize: 14 }}
                    >
                      {sc.title}
                    </span>
                    {done && <span style={{ color: '#4ade80', fontSize: 14 }}>✓ 完成</span>}
                  </div>
                  <div style={{ color: '#64748b', fontSize: 14, marginBottom: 4 }}>
                    {sc.subtitle}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: sc.difficultyColor }}>
                    難度：{sc.difficulty}
                  </div>
                  {isFreqSort && (
                    <div style={{ fontSize: 14, color: '#60a5fa', marginTop: 3 }}>
                      年約 {sc.annualFrequency.toLocaleString()} 件
                    </div>
                  )}
                </div>
                <div className="scenario-arrow">›</div>
              </button>
            );
          })}
        </div>
        <p style={{ textAlign: 'center', color: '#334155', fontSize: 14, marginTop: 24 }}>
          ⚠️ 本訓練內容僅供學習參考，實際緊急情況請依現場狀況判斷
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;
