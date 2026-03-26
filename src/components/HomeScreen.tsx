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
    <div className="home-inner anim-fade">
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
                <div style={{ color: '#64748b', fontSize: 14, marginBottom: 4 }}>{sc.subtitle}</div>
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
      <p
        style={{
          textAlign: 'center',
          color: '#334155',
          fontSize: 14,
          marginTop: 24,
          paddingBottom: 8,
        }}
      >
        ⚠️ 本訓練內容僅供學習參考，實際緊急情況請依現場狀況判斷
      </p>
    </div>
  );
}

export default HomeScreen;
