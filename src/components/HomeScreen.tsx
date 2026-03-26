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
        marginTop: 20,
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
    <div className="home-inner anim-fade">
      {/* Hero: animated car + title */}
      <div style={{ textAlign: 'center', paddingBottom: 32, paddingTop: 4 }}>
        <svg
          viewBox="0 0 300 160"
          className="anim-logo-car"
          style={{ width: '100%', maxWidth: 200, display: 'inline-block' }}
        >
          {/* Road */}
          <rect x="0" y="128" width="300" height="22" fill="#111827" rx="4" />
          <line
            x1="0"
            y1="138"
            x2="300"
            y2="138"
            stroke="#1e293b"
            strokeWidth="2"
            strokeDasharray="22 16"
          />
          {/* Car body */}
          <rect x="10" y="72" width="280" height="56" fill="#2563eb" rx="10" />
          {/* Cabin */}
          <path d="M60 32 Q68 16 88 16 L212 16 Q232 16 240 32 L258 72 L42 72Z" fill="#1d4ed8" />
          {/* Windshield */}
          <path d="M70 36 Q76 22 90 22 L148 22 L160 36Z" fill="#bfdbfe" opacity="0.85" />
          {/* Rear window */}
          <path d="M166 36 L178 22 L210 22 Q224 22 230 36Z" fill="#bfdbfe" opacity="0.62" />
          {/* B-pillar */}
          <rect x="161" y="19" width="6" height="20" fill="#1e40af" />
          {/* Headlight */}
          <rect
            x="278"
            y="86"
            width="18"
            height="11"
            fill="#fef08a"
            rx="3"
            className="anim-head-glow"
          />
          <rect
            x="296"
            y="88"
            width="5"
            height="7"
            fill="#fef08a"
            rx="1.5"
            opacity="0.35"
            className="anim-head-glow"
          />
          {/* Tail light */}
          <rect
            x="4"
            y="86"
            width="14"
            height="11"
            fill="#ef4444"
            rx="3"
            className="anim-tail-light"
          />
          {/* Front wheel */}
          <ellipse cx="222" cy="128" rx="22" ry="18" fill="#111827" />
          <g className="anim-wheel-spin">
            <ellipse cx="222" cy="128" rx="12" ry="10" fill="#334155" />
            <line
              x1="222"
              y1="118"
              x2="222"
              y2="138"
              stroke="#60a5fa"
              strokeWidth="2.5"
              opacity="0.7"
            />
            <line
              x1="212"
              y1="128"
              x2="232"
              y2="128"
              stroke="#60a5fa"
              strokeWidth="2.5"
              opacity="0.7"
            />
          </g>
          {/* Rear wheel */}
          <ellipse cx="78" cy="128" rx="22" ry="18" fill="#111827" />
          <g className="anim-wheel-spin">
            <ellipse cx="78" cy="128" rx="12" ry="10" fill="#334155" />
            <line
              x1="78"
              y1="118"
              x2="78"
              y2="138"
              stroke="#60a5fa"
              strokeWidth="2.5"
              opacity="0.7"
            />
            <line
              x1="68"
              y1="128"
              x2="88"
              y2="128"
              stroke="#60a5fa"
              strokeWidth="2.5"
              opacity="0.7"
            />
          </g>
        </svg>
        <h1
          style={{
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: 900,
            margin: '12px 0 6px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'white',
          }}
        >
          Awesome Learn Driving
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>Safe Driving Makes Happy Life</p>
      </div>

      {/* Sort controls */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontSize: 14,
            color: '#94a3b8',
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
                color: sortKey === opt.key ? '#93c5fd' : '#94a3b8',
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
                <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>{sc.subtitle}</div>
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
      <FrequencyInfoPanel />
      <p
        style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: 14,
          marginTop: 16,
          paddingBottom: 8,
        }}
      >
        ⚠️ 本訓練內容僅供學習參考，實際緊急情況請依現場狀況判斷
      </p>
    </div>
  );
}

export default HomeScreen;
