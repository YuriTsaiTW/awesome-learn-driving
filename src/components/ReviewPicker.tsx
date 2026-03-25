import type { Scenario } from '../types/scenario';
import { REVIEW_PHASES } from '../constants/phases';
import { SIM_STEPS } from '../data/sim-steps';

interface ReviewPickerProps {
  scenario: Scenario;
  onPick: (phase: string) => void;
  onRestart: () => void;
}

const ReviewPicker = ({ scenario, onPick, onRestart }: ReviewPickerProps) => {
  return (
    <div className="anim-fade">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 44, marginBottom: 10 }}>✅</div>
        <div style={{ color: '#4ade80', fontWeight: 900, fontSize: 19, marginBottom: 6 }}>
          已完成此情境
        </div>
        <div style={{ color: '#64748b', fontSize: 14 }}>選擇想複習的環節，或從頭再來一遍</div>
      </div>

      {/* Phase cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {REVIEW_PHASES.map(function (p, idx) {
          const noSim = p.id === 'simulation' && !SIM_STEPS[scenario.id]?.length;
          return (
            <button
              key={p.id}
              onClick={function () {
                if (!noSim) onPick(p.id);
              }}
              disabled={noSim}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                background: '#1e293b',
                borderRadius: 16,
                border: '1px solid #334155',
                cursor: noSim ? 'not-allowed' : 'pointer',
                width: '100%',
                textAlign: 'left',
                opacity: noSim ? 0.35 : 1,
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={function (e) {
                if (!noSim) {
                  e.currentTarget.style.borderColor = '#f59e0b';
                  e.currentTarget.style.background = 'rgba(245,158,11,0.05)';
                }
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.background = '#1e293b';
              }}
            >
              {/* Step number badge */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#475569',
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </div>
              {/* Icon */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#0f172a',
                  border: '1px solid #334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>
              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{p.label}</div>
                <div style={{ color: '#475569', fontSize: 14, marginTop: 2 }}>{p.desc}</div>
              </div>
              <div style={{ color: '#334155', fontSize: 18, flexShrink: 0 }}>›</div>
            </button>
          );
        })}
      </div>

      {/* Restart button */}
      <button
        onClick={onRestart}
        style={{
          width: '100%',
          padding: '13px',
          background: 'transparent',
          border: '1px solid #475569',
          borderRadius: 14,
          color: '#94a3b8',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        onMouseEnter={function (e) {
          e.currentTarget.style.borderColor = '#f59e0b';
          e.currentTarget.style.color = '#f59e0b';
        }}
        onMouseLeave={function (e) {
          e.currentTarget.style.borderColor = '#475569';
          e.currentTarget.style.color = '#94a3b8';
        }}
      >
        🔄 從頭開始
      </button>
    </div>
  );
};

export default ReviewPicker;
