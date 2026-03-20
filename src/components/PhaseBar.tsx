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
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                background: i < idx ? '#22c55e' : i === idx ? '#f59e0b' : '#334155',
                color: i <= idx ? '#000' : '#64748b',
                transition: 'all 0.3s ease',
              }}
            >
              {i < idx ? '\u2713' : i + 1}
            </div>
            <span
              style={{
                fontSize: 10,
                display: window.innerWidth > 400 ? 'block' : 'none',
                color: i <= idx ? '#e2e8f0' : '#475569',
              }}
            >
              {label}
            </span>
          </div>
          {i < PHASE_LABELS.length - 1 && (
            <div
              style={{
                height: 2,
                width: 12,
                background: i < idx ? '#22c55e' : '#334155',
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
