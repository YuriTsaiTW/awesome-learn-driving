import React from 'react';

interface SimWheelProps {
  angle: number;
  active: boolean;
  activeGrip: boolean;
  doneGrip: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onHubClick: () => void;
}

const SimWheel = ({
  angle,
  active,
  activeGrip,
  doneGrip,
  onMouseDown,
  onTouchStart,
  onHubClick,
}: SimWheelProps) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        cursor: active ? 'grab' : 'default',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
        animation: active
          ? 'simGlow 1.4s ease-in-out infinite'
          : activeGrip
            ? 'simGlow 1.4s ease-in-out infinite'
            : 'none',
      }}
    >
      <svg
        viewBox="0 0 140 140"
        width="130"
        height="130"
        style={{
          transform: 'rotate(' + angle + 'deg)',
          transition: angle === 0 ? 'transform 0.4s ease' : 'none',
          display: 'block',
        }}
      >
        <defs>
          <radialGradient id="swHub" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1e2d40" />
            <stop offset="100%" stopColor="#0a1220" />
          </radialGradient>
        </defs>
        {/* Outer rim */}
        <circle
          cx="70"
          cy="70"
          r="64"
          fill="none"
          stroke={active ? '#f59e0b' : '#253445'}
          strokeWidth="15"
        />
        {/* Rim inner accent */}
        <circle
          cx="70"
          cy="70"
          r="57"
          fill="none"
          stroke={active ? 'rgba(245,158,11,0.18)' : '#111d2a'}
          strokeWidth="2"
        />
        {/* Spokes — 3 spokes at 90°, 210°, 330° */}
        {[90, 210, 330].map(function (deg, i) {
          const r = (deg * Math.PI) / 180;
          const x1 = 70 + 19 * Math.cos(r);
          const y1 = 70 + 19 * Math.sin(r);
          const x2 = 70 + 55 * Math.cos(r);
          const y2 = 70 + 55 * Math.sin(r);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={active ? '#f59e0b' : '#253445'}
              strokeWidth="13"
              strokeLinecap="round"
            />
          );
        })}
        {/* Hub center — clickable for wheel-grip */}
        <circle
          cx="70"
          cy="70"
          r="19"
          fill="url(#swHub)"
          stroke={activeGrip ? '#f59e0b' : doneGrip ? '#22c55e' : active ? '#f59e0b' : '#253445'}
          strokeWidth="2.5"
          onClick={onHubClick}
          style={{ cursor: activeGrip ? 'pointer' : 'default' }}
        />
        {/* Logo mark */}
        <text
          x="70"
          y="75"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill={activeGrip ? '#f59e0b' : doneGrip ? '#22c55e' : active ? '#f59e0b' : '#3b5470'}
          onClick={onHubClick}
          style={{ cursor: activeGrip ? 'pointer' : 'default' }}
        >
          {doneGrip ? '\u2713' : '\u25C6'}
        </text>
        {/* Grip bumps on rim */}
        {[30, 90, 150, 210, 270, 330].map(function (deg, i) {
          const r = (deg * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={70 + 61 * Math.cos(r)}
              cy={70 + 61 * Math.sin(r)}
              r="4"
              fill={active || activeGrip ? 'rgba(245,158,11,0.25)' : '#111d2a'}
            />
          );
        })}
        {/* Active glow pulse ring (drag or grip) */}
        {(active || activeGrip) && (
          <circle
            cx="70"
            cy="70"
            r="64"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            opacity="0.4"
            style={{ animation: 'simPulse 1s ease-in-out infinite' }}
          />
        )}
        {/* Drag hint */}
        {active && (
          <g>
            <path
              d="M 98,56 L 118,70 L 98,84"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
            <text x="70" y="112" textAnchor="middle" fontSize="9" fill="#f59e0b" fontWeight="800">
              向右拖曳 / → 鍵
            </text>
          </g>
        )}
        {/* Grip hint */}
        {activeGrip && (
          <g>
            <circle
              cx="70"
              cy="70"
              r="19"
              fill="rgba(245,158,11,0.15)"
              onClick={onHubClick}
              style={{ cursor: 'pointer' }}
            />
            <text x="70" y="112" textAnchor="middle" fontSize="9" fill="#f59e0b" fontWeight="800">
              點擊握緊 / W 鍵
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default SimWheel;
