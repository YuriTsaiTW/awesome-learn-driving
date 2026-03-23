import type { Scenario } from '../types/scenario';
import { SCENARIOS } from '../data/scenarios';
import { SCENE_COMPONENTS } from '../data/scene-components';

interface HomeScreenProps {
  onSelect: (sc: Scenario) => void;
  completed: string[];
}

const HomeScreen = ({ onSelect, completed }: HomeScreenProps) => (
  <div
    style={{
      minHeight: '100vh',
      padding: 20,
      background: 'linear-gradient(160deg,#0f172a,#1e293b)',
    }}
  >
    <div className="home-inner">
      <div className="anim-fade" style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}>🚗</div>
        <h1
          className="home-title"
          style={{ fontSize: 26, fontWeight: 900, color: 'white', margin: '0 0 8px' }}
        >
          Awesome Learn Driving
        </h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Safe Driving Makes Happy Life</p>
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}
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
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="scenario-list">
        {SCENARIOS.map((sc) => {
          const SceneComp = SCENE_COMPONENTS[sc.id];
          const done = completed.includes(sc.id);
          return (
            <button
              key={sc.id}
              onClick={() => onSelect(sc)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 14,
                background: '#1e293b',
                borderRadius: 20,
                border: done ? '1px solid #16a34a' : '1px solid #334155',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                width: '100%',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = sc.accent)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = done ? '#16a34a' : '#334155')
              }
            >
              <div
                className="scenario-thumb"
                style={{
                  width: 80,
                  height: 56,
                  borderRadius: 12,
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#0f172a',
                }}
              >
                {SceneComp && <SceneComp />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span
                    className="scenario-card-title"
                    style={{ color: 'white', fontWeight: 700, fontSize: 14 }}
                  >
                    {sc.title}
                  </span>
                  {done && <span style={{ color: '#4ade80', fontSize: 11 }}>✓ 完成</span>}
                </div>
                <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{sc.subtitle}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: sc.difficultyColor }}>
                  難度：{sc.difficulty}
                </div>
              </div>
              <div style={{ color: '#475569', fontSize: 18 }}>›</div>
            </button>
          );
        })}
      </div>
      <p style={{ textAlign: 'center', color: '#334155', fontSize: 10, marginTop: 24 }}>
        ⚠️ 本訓練內容僅供學習參考，實際緊急情況請依現場狀況判斷
      </p>
    </div>
  </div>
);

export default HomeScreen;
