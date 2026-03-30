import React from 'react';
import { PHASES, PHASE_LABELS } from '../constants/phases';

interface PhaseBarProps {
  phase: string;
}

const PhaseBar = ({ phase }: PhaseBarProps) => {
  const idx = PHASES.indexOf(phase as (typeof PHASES)[number]);
  return (
    <div className="flex items-center justify-center gap-1 mb-5">
      {PHASE_LABELS.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-1">
            <div
              className="phasebar-dot"
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                background:
                  i < idx ? 'var(--green)' : i === idx ? 'var(--accent)' : 'var(--border-base)',
                color: i <= idx ? 'var(--cta-fg)' : 'var(--text-faint)',
                transition: 'all 0.3s ease',
              }}
            >
              {i < idx ? '\u2713' : i + 1}
            </div>
            <span
              className="phasebar-label"
              style={{
                fontSize: 14,
                color: i <= idx ? 'var(--text-secondary)' : 'var(--text-disabled)',
              }}
            >
              {label}
            </span>
          </div>
          {i < PHASE_LABELS.length - 1 && (
            <div
              className="phasebar-line"
              style={{
                height: 2,
                width: 12,
                background: i < idx ? 'var(--green)' : 'var(--border-base)',
                transition: 'background 0.3s',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PhaseBar;
