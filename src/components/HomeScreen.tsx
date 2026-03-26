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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            marginTop: 16,
            paddingBottom: 8,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="https://github.com/YuriTsaiTW/awesome-learn-driving"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 20,
              border: '1px solid #334155',
              background: '#1e293b',
              color: '#94a3b8',
              fontSize: 14,
              textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#64748b';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://buymeacoffee.com/yurijournaltw"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 20,
              border: '1px solid #334155',
              background: '#1e293b',
              color: '#94a3b8',
              fontSize: 14,
              textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#64748b';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            ☕ 小額支持
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
