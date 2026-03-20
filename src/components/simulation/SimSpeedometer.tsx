interface SimSpeedometerProps {
  speed: number;
}

const SimSpeedometer = ({ speed }: SimSpeedometerProps) => {
  const max = 140;
  const pct = Math.min(1, speed / max);
  const startAngle = -225;
  const endAngle = 45;
  const angleDeg = startAngle + pct * (endAngle - startAngle);
  const rad = (angleDeg * Math.PI) / 180;
  const needleX = 40 + 28 * Math.cos(rad);
  const needleY = 42 + 28 * Math.sin(rad);
  const arcLen = Math.round(pct * 126);
  return (
    <svg viewBox="0 0 80 76" width="80" height="76">
      <defs>
        <linearGradient id="ssArc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="55%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="42" r="36" fill="#060b14" stroke="#1e3a5f" strokeWidth="2" />
      <path
        d="M 12,60 A 29,29 0 1,1 68,60"
        fill="none"
        stroke="#1a2535"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M 12,60 A 29,29 0 1,1 68,60"
        fill="none"
        stroke="url(#ssArc)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={arcLen + ' 126'}
      />
      <line
        x1="40"
        y1="42"
        x2={needleX}
        y2={needleY}
        stroke="#ef4444"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="40" cy="42" r="4" fill="#ef4444" />
      <circle cx="40" cy="42" r="2" fill="#ff6b6b" />
      <text x="40" y="65" textAnchor="middle" fontSize="11" fontWeight="900" fill="white">
        {speed}
      </text>
      <text x="40" y="73" textAnchor="middle" fontSize="7" fill="#475569">
        km/h
      </text>
    </svg>
  );
};

export default SimSpeedometer;
