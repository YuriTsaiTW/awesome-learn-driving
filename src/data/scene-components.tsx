import type { ScenarioId } from '../types/scenario';

const HighwayScene = () => (
  <svg viewBox="0 0 300 180" width="100%" height="100%">
    <rect width="300" height="180" fill="#1a2744" />
    <defs>
      <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e3a5f" />
      </linearGradient>
    </defs>
    <rect width="300" height="100" fill="url(#sky1)" />
    <rect x="0" y="90" width="300" height="70" fill="#2d3748" />
    <line
      x1="0"
      y1="125"
      x2="300"
      y2="125"
      stroke="#64748b"
      strokeWidth="1.5"
      strokeDasharray="18,14"
    />
    <rect x="0" y="90" width="300" height="3" fill="#475569" />
    <rect x="235" y="90" width="65" height="70" fill="#374151" />
    <line x1="235" y1="90" x2="235" y2="160" stroke="#fbbf24" strokeWidth="2.5" />
    <rect x="265" y="92" width="35" height="4" fill="#94a3b8" />
    <rect x="265" y="150" width="35" height="4" fill="#94a3b8" />
    {[270, 280, 290].map((x) => (
      <rect key={x} x={x} y="92" width="2" height="62" fill="#6b7280" />
    ))}
    <g transform="translate(252,118)">
      <rect x="-18" y="-13" width="36" height="22" fill="#dc2626" rx="3" />
      <rect x="-12" y="-22" width="24" height="12" fill="#dc2626" rx="2" />
      <rect x="-10" y="-20" width="9" height="8" fill="#bfdbfe" rx="1" opacity="0.9" />
      <rect x="1" y="-20" width="9" height="8" fill="#bfdbfe" rx="1" opacity="0.9" />
      <ellipse cx="-10" cy="9" rx="5" ry="4" fill="#111827" />
      <ellipse cx="10" cy="9" rx="5" ry="4" fill="#111827" />
      <circle cx="-15" cy="-11" r="3" fill="#f59e0b" className="anim-hazard" />
      <circle cx="15" cy="-11" r="3" fill="#f59e0b" className="anim-hazard" />
      <circle cx="-15" cy="9" r="3" fill="#f59e0b" className="anim-hazard" />
      <circle cx="15" cy="9" r="3" fill="#f59e0b" className="anim-hazard" />
    </g>
    <polygon points="195,140 201,128 207,140" fill="none" stroke="#f59e0b" strokeWidth="2" />
    <line x1="201" y1="136" x2="201" y2="132" stroke="#f59e0b" strokeWidth="1.5" />
    <circle cx="201" cy="138" r="1" fill="#f59e0b" />
    <circle cx="276" cy="112" r="4" fill="#fbbf24" />
    <rect x="274" y="116" width="4" height="14" fill="#3b82f6" rx="1" />
    <line x1="274" y1="120" x2="270" y2="126" stroke="#3b82f6" strokeWidth="2" />
    <line x1="278" y1="120" x2="282" y2="126" stroke="#3b82f6" strokeWidth="2" />
    <g transform="translate(80,108)">
      <rect x="-20" y="-10" width="40" height="18" fill="#1d4ed8" rx="2" />
      <rect x="-14" y="-17" width="28" height="10" fill="#1d4ed8" rx="2" />
      <circle cx="-14" cy="8" r="4" fill="#111" />
      <circle cx="14" cy="8" r="4" fill="#111" />
    </g>
    <g transform="translate(150,138)">
      <rect x="-20" y="-10" width="40" height="18" fill="#15803d" rx="2" />
      <rect x="-14" y="-17" width="28" height="10" fill="#15803d" rx="2" />
      <circle cx="-14" cy="8" r="4" fill="#111" />
      <circle cx="14" cy="8" r="4" fill="#111" />
    </g>
    <text x="150" y="174" textAnchor="middle" fill="#64748b" fontSize="9">
      國道一號・時速 100 km/h
    </text>
  </svg>
);

const TireBlowoutScene = () => (
  <svg viewBox="0 0 300 180" width="100%" height="100%">
    <rect width="300" height="180" fill="#1a2744" />
    <rect width="300" height="90" fill="#0f172a" />
    <rect x="0" y="90" width="300" height="65" fill="#2d3748" />
    <line
      x1="0"
      y1="122"
      x2="300"
      y2="122"
      stroke="#64748b"
      strokeWidth="1.5"
      strokeDasharray="18,14"
    />
    <path
      d="M 60 130 Q 130 126 180 128"
      stroke="#1f2937"
      strokeWidth="4"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M 60 135 Q 130 131 180 133"
      stroke="#111827"
      strokeWidth="3"
      fill="none"
      opacity="0.5"
    />
    <g transform="translate(148,108)" className="anim-wobble">
      <rect x="-42" y="-20" width="84" height="34" fill="#7c3aed" rx="4" />
      <rect x="-30" y="-32" width="60" height="17" fill="#6d28d9" rx="3" />
      <rect x="-26" y="-30" width="22" height="12" fill="#bfdbfe" rx="1" opacity="0.85" />
      <rect x="4" y="-30" width="22" height="12" fill="#bfdbfe" rx="1" opacity="0.85" />
      <ellipse cx="-28" cy="14" rx="11" ry="7" fill="#111827" />
      <ellipse cx="-28" cy="14" rx="6" ry="3.5" fill="#374151" />
      <ellipse cx="28" cy="16" rx="13" ry="4" fill="#111827" opacity="0.6" />
      <path d="M 18 12 Q 28 7 38 12" stroke="#6b7280" strokeWidth="2.5" fill="none" />
      <text x="24" y="30" fontSize="14" textAnchor="middle">
        💥
      </text>
      <circle cx="-38" cy="-18" r="3" fill="#f59e0b" className="anim-hazard" />
      <circle cx="38" cy="-18" r="3" fill="#f59e0b" className="anim-hazard" />
    </g>
    <circle
      cx="176"
      cy="108"
      r="6"
      fill="#6b7280"
      className="anim-smoke"
      style={{ animationDelay: '0s' }}
    />
    <circle
      cx="184"
      cy="102"
      r="9"
      fill="#4b5563"
      className="anim-smoke"
      style={{ animationDelay: '0.4s' }}
    />
    <circle
      cx="170"
      cy="98"
      r="7"
      fill="#6b7280"
      className="anim-smoke"
      style={{ animationDelay: '0.8s' }}
    />
    <text x="150" y="174" textAnchor="middle" fill="#64748b" fontSize="9">
      高速公路・時速 110 km/h・右前輪爆胎
    </text>
  </svg>
);

const HeavyFogScene = () => {
  const drops = Array.from({ length: 28 }, (_, i) => ({
    x: (i * 41 + 10) % 295,
    y: (i * 29) % 80,
    delay: (i * 0.09) % 1.4,
    dur: 0.7 + (i % 5) * 0.15,
  }));
  return (
    <svg viewBox="0 0 300 180" width="100%" height="100%">
      <defs>
        <radialGradient id="fogCenter" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="180" fill="#1e293b" />
      <rect x="0" y="95" width="300" height="65" fill="#374151" />
      <line
        x1="0"
        y1="127"
        x2="300"
        y2="127"
        stroke="#4b5563"
        strokeWidth="1.5"
        strokeDasharray="14,12"
      />
      <rect
        width="300"
        height="180"
        fill="#94a3b8"
        className="anim-fog"
        style={{ opacity: 0.35 }}
      />
      <g transform="translate(148,112)" opacity="0.8">
        <rect x="-40" y="-20" width="80" height="34" fill="#065f46" rx="4" />
        <rect x="-28" y="-32" width="56" height="16" fill="#047857" rx="3" />
        <rect x="-24" y="-30" width="20" height="11" fill="#bfdbfe" rx="1" opacity="0.7" />
        <rect x="4" y="-30" width="20" height="11" fill="#bfdbfe" rx="1" opacity="0.7" />
        <circle cx="-36" cy="12" r="5" fill="#fef3c7" opacity="0.95" />
        <circle cx="36" cy="12" r="5" fill="#fef3c7" opacity="0.95" />
        <path d="M -41 12 L -80 4 L -80 20 Z" fill="#fef3c7" opacity="0.12" />
        <path d="M 41 12 L 80 4 L 80 20 Z" fill="#fef3c7" opacity="0.12" />
        <circle cx="-36" cy="-18" r="3" fill="#f59e0b" className="anim-hazard" />
        <circle cx="36" cy="-18" r="3" fill="#f59e0b" className="anim-hazard" />
      </g>
      {drops.map((d, i) => (
        <line
          key={i}
          x1={d.x}
          y1={d.y}
          x2={d.x - 5}
          y2={d.y + 18}
          stroke="#93c5fd"
          strokeWidth="1.5"
          opacity="0.5"
          style={{ animation: `rainFall ${d.dur}s linear ${d.delay}s infinite` }}
        />
      ))}
      <rect width="300" height="180" fill="url(#fogCenter)" />
      <text x="150" y="174" textAnchor="middle" fill="#64748b" fontSize="9">
        山區道路・能見度不足 30 公尺
      </text>
    </svg>
  );
};

const RearEndScene = () => (
  <svg viewBox="0 0 300 180" width="100%" height="100%">
    <rect width="300" height="180" fill="#1a2744" />
    <rect width="300" height="90" fill="#0f172a" />
    <rect x="0" y="90" width="300" height="65" fill="#2d3748" />
    <line
      x1="0"
      y1="122"
      x2="300"
      y2="122"
      stroke="#64748b"
      strokeWidth="1.5"
      strokeDasharray="14,12"
    />
    <rect x="248" y="40" width="16" height="40" fill="#374151" rx="4" />
    <circle cx="256" cy="50" r="6" fill="#ef4444" />
    <circle cx="256" cy="64" r="6" fill="#374151" />
    <circle cx="256" cy="78" r="6" fill="#374151" />
    <g transform="translate(168,110)">
      <rect x="-42" y="-20" width="84" height="34" fill="#1d4ed8" rx="4" />
      <rect x="-30" y="-32" width="60" height="16" fill="#1e40af" rx="3" />
      <rect x="-26" y="-30" width="22" height="11" fill="#bfdbfe" rx="1" opacity="0.85" />
      <rect x="4" y="-30" width="22" height="11" fill="#bfdbfe" rx="1" opacity="0.85" />
      <circle cx="-38" cy="12" r="5" fill="#ef4444" />
      <circle cx="38" cy="12" r="5" fill="#ef4444" />
      <ellipse cx="-28" cy="14" rx="10" ry="6" fill="#111" />
      <ellipse cx="28" cy="14" rx="10" ry="6" fill="#111" />
    </g>
    <g transform="translate(88,110)">
      <rect x="-42" y="-20" width="84" height="34" fill="#dc2626" rx="4" />
      <rect x="-30" y="-32" width="60" height="16" fill="#b91c1c" rx="3" />
      <rect x="-26" y="-30" width="22" height="11" fill="#bfdbfe" rx="1" opacity="0.85" />
      <rect x="4" y="-30" width="22" height="11" fill="#bfdbfe" rx="1" opacity="0.85" />
      <circle cx="-38" cy="-18" r="4" fill="#fef9c3" />
      <circle cx="38" cy="-18" r="4" fill="#fef9c3" />
      <ellipse cx="-28" cy="14" rx="10" ry="6" fill="#111" />
      <ellipse cx="28" cy="14" rx="10" ry="6" fill="#111" />
    </g>
    <g transform="translate(130,110)" className="anim-impact">
      <circle r="8" fill="#fbbf24" opacity="0.9" />
      <line x1="-12" y1="-12" x2="12" y2="12" stroke="#f59e0b" strokeWidth="3" />
      <line x1="12" y1="-12" x2="-12" y2="12" stroke="#f59e0b" strokeWidth="3" />
      <line x1="0" y1="-14" x2="0" y2="14" stroke="#fcd34d" strokeWidth="2" />
      <line x1="-14" y1="0" x2="14" y2="0" stroke="#fcd34d" strokeWidth="2" />
    </g>
    <text x="150" y="174" textAnchor="middle" fill="#64748b" fontSize="9">
      市區路口・等待紅燈時被追撞
    </text>
  </svg>
);

const BrakeFailureScene = () => (
  <svg viewBox="0 0 300 180" width="100%" height="100%">
    <rect width="300" height="180" fill="#0f172a" />
    <rect x="15" y="15" width="270" height="150" fill="#1e293b" rx="16" />
    <rect x="20" y="20" width="260" height="140" fill="#0f172a" rx="12" />
    <circle cx="105" cy="95" r="62" fill="#1e293b" stroke="#334155" strokeWidth="3" />
    <circle cx="105" cy="95" r="56" fill="none" stroke="#374151" strokeWidth="1" />
    <path
      d="M 52 128 A 57 57 0 1 1 158 128"
      fill="none"
      stroke="#1f2937"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <path
      d="M 52 128 A 57 57 0 1 1 158 128"
      fill="none"
      stroke="#ef4444"
      strokeWidth="10"
      strokeLinecap="round"
      strokeDasharray="230"
      strokeDashoffset="65"
    />
    {[0, 30, 60, 90, 120, 150, 180].map((deg, i) => {
      const angle = ((-210 + deg) * Math.PI) / 180;
      const r1 = 48,
        r2 = 55;
      return (
        <line
          key={i}
          x1={105 + r1 * Math.cos(angle)}
          y1={95 + r1 * Math.sin(angle)}
          x2={105 + r2 * Math.cos(angle)}
          y2={95 + r2 * Math.sin(angle)}
          stroke="#475569"
          strokeWidth="2"
        />
      );
    })}
    <line
      x1="105"
      y1="95"
      x2="148"
      y2="62"
      stroke="#f59e0b"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="105" cy="95" r="6" fill="#f59e0b" />
    <circle cx="105" cy="95" r="3" fill="#0f172a" />
    <text x="105" y="122" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold">
      76
    </text>
    <text x="105" y="135" textAnchor="middle" fill="#64748b" fontSize="8">
      km/h
    </text>
    <circle cx="210" cy="75" r="32" fill="#7f1d1d" />
    <circle cx="210" cy="75" r="29" fill="#ef4444" className="anim-impact" />
    <text x="210" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
      BRAKE
    </text>
    <text x="210" y="84" textAnchor="middle" fill="white" fontSize="9">
      FAILURE
    </text>
    <rect x="160" y="120" width="55" height="28" fill="#374151" rx="4" />
    <rect x="163" y="123" width="49" height="22" fill="#ef4444" rx="3" />
    <text x="187" y="138" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
      BRAKE
    </text>
    <path
      d="M 232 128 L 232 118 M 228 124 L 232 128 L 236 124"
      stroke="#ef4444"
      strokeWidth="2"
      fill="none"
    />
    <text x="150" y="174" textAnchor="middle" fill="#f87171" fontSize="9">
      ⚠️ 踩下煞車・車輛幾乎無反應
    </text>
  </svg>
);

const NarrowRoadScene = () => (
  <svg viewBox="0 0 300 180" width="100%" height="100%">
    <defs>
      <linearGradient id="nrSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0c1a2e" />
        <stop offset="100%" stopColor="#1a3a5c" />
      </linearGradient>
      <linearGradient id="nrRoad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#1f2937" />
      </linearGradient>
    </defs>
    <rect width="300" height="180" fill="url(#nrSky)" />
    <polygon points="0,130 0,60 50,20 90,55 110,130" fill="#1e3a1e" />
    <polygon points="0,130 0,75 40,30 70,60 95,130" fill="#15291a" />
    <polygon points="300,130 300,55 255,18 215,52 190,130" fill="#1e3a1e" />
    <polygon points="300,130 300,65 262,28 238,55 205,130" fill="#15291a" />
    <rect x="90" y="80" width="120" height="100" fill="url(#nrRoad)" />
    <line x1="90" y1="80" x2="90" y2="180" stroke="#fbbf24" strokeWidth="2.5" />
    <line x1="210" y1="80" x2="210" y2="180" stroke="#fbbf24" strokeWidth="2.5" />
    <line
      x1="150"
      y1="85"
      x2="150"
      y2="180"
      stroke="#64748b"
      strokeWidth="1.5"
      strokeDasharray="12,10"
    />
    <rect x="78" y="100" width="12" height="80" fill="#374151" />
    <rect x="80" y="100" width="8" height="80" fill="#475569" opacity="0.5" />
    <rect x="210" y="100" width="12" height="80" fill="#374151" />
    <rect x="212" y="100" width="8" height="80" fill="#475569" opacity="0.5" />
    <g transform="translate(150,155)">
      <rect x="-22" y="-18" width="44" height="30" fill="#dc2626" rx="4" />
      <rect x="-14" y="-28" width="28" height="14" fill="#b91c1c" rx="3" />
      <rect x="-12" y="-26" width="10" height="9" fill="#bfdbfe" rx="1" opacity="0.85" />
      <rect x="2" y="-26" width="10" height="9" fill="#bfdbfe" rx="1" opacity="0.85" />
      <circle cx="-22" cy="-18" r="3.5" fill="#fef3c7" opacity="0.9" />
      <circle cx="22" cy="-18" r="3.5" fill="#fef3c7" opacity="0.9" />
      <ellipse cx="-12" cy="12" rx="7" ry="5" fill="#111" />
      <ellipse cx="12" cy="12" rx="7" ry="5" fill="#111" />
    </g>
    <g transform="translate(150,100) rotate(180)">
      <rect x="-18" y="-16" width="36" height="26" fill="#2563eb" rx="4" />
      <rect x="-11" y="-24" width="22" height="12" fill="#1d4ed8" rx="3" />
      <rect x="-9" y="-22" width="8" height="8" fill="#bfdbfe" rx="1" opacity="0.85" />
      <rect x="1" y="-22" width="8" height="8" fill="#bfdbfe" rx="1" opacity="0.85" />
      <circle cx="-18" cy="-15" r="4" fill="#fef9c3" opacity="0.95" />
      <circle cx="18" cy="-15" r="4" fill="#fef9c3" opacity="0.95" />
      <ellipse cx="-10" cy="10" rx="6" ry="4" fill="#111" />
      <ellipse cx="10" cy="10" rx="6" ry="4" fill="#111" />
    </g>
    <line
      x1="150"
      y1="112"
      x2="150"
      y2="143"
      stroke="#ef4444"
      strokeWidth="1.5"
      strokeDasharray="4,3"
    />
    <text x="162" y="130" fill="#ef4444" fontSize="7" fontWeight="700">
      30m
    </text>
    <text x="150" y="174" textAnchor="middle" fill="#fb923c" fontSize="9">
      ⚠️ 單線山路・對向來車急速逼近
    </text>
  </svg>
);

export const SCENE_COMPONENTS: Partial<Record<ScenarioId, React.FC>> = {
  'highway-breakdown': HighwayScene,
  'tire-blowout': TireBlowoutScene,
  'heavy-rain-fog': HeavyFogScene,
  'rear-end-collision': RearEndScene,
  'brake-failure': BrakeFailureScene,
  'narrow-road': NarrowRoadScene,
};
