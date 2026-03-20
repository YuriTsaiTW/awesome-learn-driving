import React from 'react';

interface SimGearShifterProps {
  activeGearDown: boolean;
  doneGearDown: boolean;
  onGearDown: () => void;
}

const SimGearShifter = ({ activeGearDown, doneGearDown, onGearDown }: SimGearShifterProps) => {
  const positions = [
    { g: 'P', y: 18 },
    { g: 'R', y: 31 },
    { g: 'N', y: 44 },
    { g: 'D', y: 57 },
    { g: '2', y: 70 },
  ];
  const selIdx = doneGearDown ? 4 : 3; // D → 2 after downshift
  return (
    <svg
      viewBox="0 0 44 96"
      width="44"
      height="96"
      onClick={activeGearDown ? onGearDown : undefined}
      style={{ cursor: activeGearDown ? 'pointer' : 'default', display: 'block' }}
    >
      <rect
        x="4"
        y="6"
        width="36"
        height="82"
        rx="7"
        fill="#060b14"
        stroke={activeGearDown ? '#f59e0b' : doneGearDown ? '#22c55e' : '#1e3a5f'}
        strokeWidth={activeGearDown || doneGearDown ? 2 : 1.5}
        style={{ animation: activeGearDown ? 'simPulse 1s ease-in-out infinite' : 'none' }}
      />
      {positions.map(function (item, i) {
        const sel = i === selIdx;
        return (
          <React.Fragment key={i}>
            <circle
              cx="22"
              cy={item.y}
              r="8"
              fill={sel ? (doneGearDown && i === 4 ? '#22c55e' : '#f59e0b') : '#0f172a'}
              stroke={sel ? (doneGearDown && i === 4 ? '#22c55e' : '#f59e0b') : '#1e3a5f'}
              strokeWidth="1.5"
            />
            <text
              x="22"
              y={item.y + 3.5}
              textAnchor="middle"
              fontSize="8"
              fontWeight="900"
              fill={sel ? '#000' : '#2d4a6e'}
            >
              {item.g}
            </text>
          </React.Fragment>
        );
      })}
      {activeGearDown && (
        <g>
          <text x="22" y="90" textAnchor="middle" fontSize="7" fill="#f59e0b" fontWeight="800">
            點擊降檔
          </text>
          <path
            d="M 18,75 L 22,82 L 26,75"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      )}
      {!activeGearDown && (
        <text
          x="22"
          y="92"
          textAnchor="middle"
          fontSize="7"
          fill={doneGearDown ? '#22c55e' : '#2d4a6e'}
        >
          排檔
        </text>
      )}
    </svg>
  );
};

export default SimGearShifter;
