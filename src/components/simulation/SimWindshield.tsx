import type { CockpitState } from '../../types/simulation';

interface SimWindshieldProps {
  cockpit: CockpitState;
  foggy: boolean;
}

const SimWindshield = ({ cockpit, foggy }: SimWindshieldProps) => {
  const { hazardOn, onShoulder, trianglePlaced, fogOn } = cockpit;
  const fogOpacity = foggy ? (fogOn ? 0.46 : 0.78) : 0;
  return (
    <svg viewBox="0 0 360 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="swSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020817" />
          <stop offset="100%" stopColor="#0d1b33" />
        </linearGradient>
        <linearGradient id="swRoad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#181818" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
        {hazardOn && (
          <radialGradient id="swHazGlow" cx="50%" cy="100%" r="70%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      {/* Sky */}
      <rect width="360" height="112" fill="url(#swSky)" />

      {/* Stars */}
      {[
        [18, 12],
        [55, 7],
        [108, 20],
        [162, 4],
        [205, 16],
        [252, 9],
        [304, 24],
        [342, 11],
        [78, 32],
        [322, 38],
        [140, 28],
        [290, 15],
      ].map(function (pos, i) {
        return (
          <circle
            key={i}
            cx={pos[0]}
            cy={pos[1]}
            r={0.9}
            fill="white"
            opacity={0.6 + (i % 3) * 0.15}
          />
        );
      })}

      {/* Far city glow on horizon */}
      <ellipse cx="180" cy="103" rx="130" ry="18" fill="#1e3a5f" opacity="0.4" />
      <ellipse cx="180" cy="103" rx="60" ry="8" fill="#3b82f6" opacity="0.1" />

      {/* Road polygon — shifts right when on shoulder */}
      <polygon
        points={onShoulder ? '60,180 300,180 252,102 208,102' : '0,180 360,180 235,102 125,102'}
        fill="url(#swRoad)"
      />

      {/* Road shoulders */}
      <polygon
        points={onShoulder ? '0,180 60,180 208,102 198,102' : '0,180 125,102 115,102 0,175'}
        fill="#12202e"
      />
      <polygon
        points={
          onShoulder ? '300,180 360,180 360,175 252,102 262,102' : '360,180 235,102 245,102 360,175'
        }
        fill="#12202e"
      />

      {/* Center lane dashes */}
      {[0, 1, 2, 3, 4].map(function (i) {
        const t = i / 4;
        const cx = onShoulder ? 230 : 180;
        const x = cx - t * (onShoulder ? -10 : 0);
        const y = 102 + t * 78;
        const w = 2.5 + t * 4;
        const h = 7 + t * 14;
        return (
          <rect
            key={i}
            x={x - w / 2}
            y={y}
            width={w}
            height={h}
            fill="white"
            opacity={0.65}
            rx={1}
          />
        );
      })}

      {/* Right edge yellow line */}
      {[0, 1, 2, 3, 4].map(function (i) {
        const t = i / 4;
        const x = (onShoulder ? 248 : 210) - t * (onShoulder ? 60 : 74);
        const y = 102 + t * 78;
        const w = 1.5 + t * 3;
        const h = 6 + t * 13;
        return (
          <rect
            key={i}
            x={x - w / 2}
            y={y}
            width={w}
            height={h}
            fill="#fbbf24"
            opacity={0.8}
            rx={1}
          />
        );
      })}

      {/* Guard rail right */}
      <line
        x1={onShoulder ? 310 : 258}
        y1="102"
        x2={onShoulder ? 360 : 340}
        y2="180"
        stroke="#2d4a6e"
        strokeWidth="3"
      />
      {/* Guard rail posts */}
      {[0, 1, 2].map(function (i) {
        const t = i / 2;
        const rx = (onShoulder ? 310 : 258) + t * (onShoulder ? 50 : 82);
        const ry = 102 + t * 78;
        return (
          <line key={i} x1={rx} y1={ry - 4} x2={rx} y2={ry + 6} stroke="#3b6291" strokeWidth="2" />
        );
      })}

      {/* Distant car tail lights */}
      <circle cx={onShoulder ? 235 : 185} cy="108" r="2.5" fill="#ef4444" opacity="0.9" />
      <circle cx={onShoulder ? 244 : 194} cy="108" r="2.5" fill="#ef4444" opacity="0.9" />
      <ellipse cx={onShoulder ? 239 : 189} cy="110" rx="6" ry="2" fill="#ef4444" opacity="0.15" />

      {/* Left A-pillar dark fade */}
      <rect x="0" y="0" width="32" height="180" fill="#020817" opacity="0.7" />
      {/* Right A-pillar dark fade */}
      <rect x="328" y="0" width="32" height="180" fill="#020817" opacity="0.7" />

      {/* Hazard orange glow on windshield */}
      {hazardOn && (
        <rect
          width="360"
          height="180"
          fill="url(#swHazGlow)"
          style={{ animation: 'hazard 0.75s ease-in-out infinite' }}
        />
      )}

      {/* Triangle warning visible ahead (after placed) */}
      {trianglePlaced && (
        <g style={{ animation: 'hazard 1.2s ease-in-out infinite' }}>
          <polygon points="180,90 172,103 188,103" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          <text x="180" y="101" textAnchor="middle" fontSize="5" fill="#ef4444" fontWeight="bold">
            !
          </text>
        </g>
      )}

      {/* "路肩" label when on shoulder */}
      {onShoulder && (
        <text
          x="316"
          y="168"
          textAnchor="middle"
          fontSize="9"
          fill="#22c55e"
          fontWeight="bold"
          opacity="0.8"
        >
          路肩
        </text>
      )}

      {/* Speed motion lines */}
      {[1, 2, 3].map(function (i) {
        return (
          <line
            key={i}
            x1={30 + i * 130}
            y1={130 + i * 8}
            x2={18 + i * 130}
            y2={134 + i * 8}
            stroke="white"
            strokeWidth="0.6"
            opacity="0.12"
          />
        );
      })}

      {/* FOG / RAIN overlay (heavy-rain-fog scenario) */}
      {fogOpacity > 0 && (
        <g>
          {/* Fog white veil */}
          <rect width="360" height="180" fill="#b8cee0" opacity={fogOpacity} />
          {/* Rain streaks (only when fog lights off = worst visibility) */}
          {!fogOn &&
            [
              20, 55, 88, 120, 155, 188, 222, 255, 290, 325, 350, 30, 70, 110, 160, 200, 240, 280,
              310, 340,
            ].map(function (x, i) {
              const yOff = (i * 31) % 140;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={yOff}
                  x2={x - 3}
                  y2={yOff + 22}
                  stroke="#8ab4d0"
                  strokeWidth="1"
                  opacity="0.55"
                  style={{
                    animation: 'rainFall ' + (0.5 + (i % 4) * 0.12) + 's linear infinite',
                    animationDelay: i * 0.08 + 's',
                  }}
                />
              );
            })}
          {/* Fog-on improvement hint */}
          {fogOn && (
            <text
              x="180"
              y="96"
              textAnchor="middle"
              fontSize="10"
              fill="#ffffff"
              fontWeight="700"
              opacity="0.65"
            >
              霧燈開啟・能見度改善
            </text>
          )}
        </g>
      )}
    </svg>
  );
};

export default SimWindshield;
