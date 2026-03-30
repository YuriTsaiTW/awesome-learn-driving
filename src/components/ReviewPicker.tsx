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
        <div
          style={{ color: 'var(--green-light)', fontWeight: 900, fontSize: 19, marginBottom: 6 }}
        >
          已完成此情境
        </div>
        <div style={{ color: 'var(--text-faint)', fontSize: 14 }}>
          選擇想複習的環節，或從頭再來一遍
        </div>
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
                background: 'var(--bg-card)',
                borderRadius: 16,
                border: '1px solid var(--border-base)',
                cursor: noSim ? 'not-allowed' : 'pointer',
                width: '100%',
                textAlign: 'left',
                opacity: noSim ? 0.35 : 1,
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={function (e) {
                if (!noSim) {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.background = 'var(--accent-bg-hover)';
                }
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = 'var(--border-base)';
                e.currentTarget.style.background = 'var(--bg-card)';
              }}
            >
              {/* Step number badge */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-base)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 800,
                  color: 'var(--text-disabled)',
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
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-base)',
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
                <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 14 }}>
                  {p.label}
                </div>
                <div style={{ color: 'var(--text-disabled)', fontSize: 14, marginTop: 2 }}>
                  {p.desc}
                </div>
              </div>
              <div style={{ color: 'var(--border-base)', fontSize: 18, flexShrink: 0 }}>›</div>
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
          border: '1px solid var(--border-base)',
          borderRadius: 14,
          color: 'var(--text-muted)',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        onMouseEnter={function (e) {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.color = 'var(--accent)';
        }}
        onMouseLeave={function (e) {
          e.currentTarget.style.borderColor = 'var(--border-base)';
          e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        🔄 從頭開始
      </button>
    </div>
  );
};

export default ReviewPicker;
