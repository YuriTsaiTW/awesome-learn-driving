import { useState, useEffect, useCallback } from 'react';

interface SimTriangleModalProps {
  targetMin: number;
  targetMax: number;
  onCorrect: () => void;
}

// Road perspective helpers
// Road polygon: "50,88 190,88 240,210 0,210"
// Right shoulder line: (215, 210) → (186, 88)
const ROAD_SLOPE = 50 / 122; // (240-190)/(210-88)

function roadRightX(y: number): number {
  return 190 + (y - 88) * ROAD_SLOPE;
}
function roadLeftX(y: number): number {
  return 50 - (y - 88) * ROAD_SLOPE;
}

// Figure walks along right shoulder (inside road's right edge)
// At d=0 (near car): y≈192, x≈210  At d=80 (horizon): y≈88, x≈183
function figY(d: number): number {
  return 192 - (d / 80) * 104;
}
function figX(d: number): number {
  return 210 - (d / 80) * 27;
}
function figScale(d: number): number {
  return 1.0 - (d / 80) * 0.75;
}

function SimTriangleModal({ targetMin, targetMax, onCorrect }: SimTriangleModalProps) {
  const [distance, setDistance] = useState(0);
  const [shake, setShake] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const inZone = distance >= targetMin && distance <= targetMax;

  const move = useCallback(
    (delta: number) => {
      if (placed || shake) return;
      setDistance((prev) => Math.max(0, Math.min(80, prev + delta)));
    },
    [placed, shake],
  );

  useEffect(
    function () {
      function handler(e: KeyboardEvent) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
          e.preventDefault();
          move(5);
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
          e.preventDefault();
          move(-5);
        }
      }
      window.addEventListener('keydown', handler);
      return function () {
        window.removeEventListener('keydown', handler);
      };
    },
    [move],
  );

  function handlePlace() {
    if (placed || shake) return;
    if (inZone) {
      setPlaced(true);
      setTimeout(onCorrect, 900);
    } else {
      const msg =
        distance < targetMin
          ? `距離太近！需至少 ${targetMin} 公尺`
          : `距離太遠！最多 ${targetMax} 公尺`;
      setErrorMsg(msg);
      setShake(true);
      setTimeout(function () {
        setShake(false);
        setErrorMsg('');
      }, 600);
    }
  }

  const fy = figY(distance);
  const fx = figX(distance);
  const fs = figScale(distance);

  // Progress bar
  const barH = 200;
  const safeTop = barH - (targetMax / 80) * barH;
  const safeBot = barH - (targetMin / 80) * barH;
  const indicatorY = barH - (distance / 80) * barH;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.88)',
        zIndex: 8000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 12px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          background: '#0f172a',
          borderRadius: 24,
          border: '2px solid #1e3a5f',
          boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#07101e',
            borderBottom: '1px solid #1e3a5f',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: 14 }}>🔺 放置警告三角架</div>
            <div style={{ color: '#475569', fontSize: 13, marginTop: 2 }}>
              使用方向鍵控制距離，放置於 {targetMin}～{targetMax} 公尺處
            </div>
          </div>
          <div
            style={{
              color: inZone ? '#4ade80' : '#f59e0b',
              fontWeight: 900,
              fontSize: 20,
              minWidth: 52,
              textAlign: 'right',
              fontFamily: 'monospace',
            }}
          >
            {distance}m
          </div>
        </div>

        {/* Main content: road scene + progress bar */}
        <div style={{ display: 'flex', gap: 0 }}>
          {/* Road scene SVG */}
          <div style={{ flex: 1 }}>
            <svg
              viewBox="0 0 240 215"
              width="100%"
              style={{
                display: 'block',
                animation: shake ? 'simWrongShake 0.5s ease' : 'none',
              }}
            >
              {/* Sky */}
              <rect x="0" y="0" width="240" height="88" fill="#0a1628" />
              {/* Distant hills */}
              <ellipse cx="60" cy="88" rx="80" ry="18" fill="#0d1f3a" />
              <ellipse cx="180" cy="88" rx="70" ry="14" fill="#0d1f3a" />

              {/* Road surface */}
              <polygon points="50,88 190,88 240,215 0,215" fill="#1e293b" />

              {/* Road center lane dashes */}
              {[0, 1, 2, 3, 4].map(function (i) {
                const t = (i + 0.5) / 5;
                const y = 88 + t * 127;
                const w = 2.5 + t * 7;
                const x = 120 - w * 0.5;
                const h = 5 + t * 9;
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    fill="#475569"
                    opacity="0.6"
                    rx="1"
                  />
                );
              })}

              {/* Right shoulder white line */}
              <line
                x1="180"
                y1="88"
                x2="215"
                y2="215"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="6,5"
                opacity="0.5"
              />

              {/* Safe-zone distance markers */}
              {[targetMin, targetMax].map(function (d, idx) {
                const my = figY(d);
                const lx = roadLeftX(my);
                const rx = roadRightX(my);
                const color = idx === 0 ? '#fbbf24' : '#f97316';
                const sw = 0.5 + ((my - 88) / 127) * 1.5;
                return (
                  <g key={d}>
                    <line
                      x1={lx}
                      y1={my}
                      x2={rx}
                      y2={my}
                      stroke={color}
                      strokeWidth={sw}
                      strokeDasharray={`${sw * 5},${sw * 3}`}
                      opacity="0.75"
                    />
                    <text
                      x={lx - 2}
                      y={my + 4}
                      fill={color}
                      fontSize={7 + ((my - 88) / 127) * 5}
                      fontWeight="bold"
                      textAnchor="end"
                    >
                      {d}m
                    </text>
                  </g>
                );
              })}

              {/* Road edges */}
              <line x1="50" y1="88" x2="0" y2="215" stroke="#475569" strokeWidth="1.5" />
              <line x1="190" y1="88" x2="240" y2="215" stroke="#475569" strokeWidth="1.5" />

              {/* Walking figure + triangle (right shoulder) */}
              {distance > 0 && (
                <g transform={`translate(${fx}, ${fy}) scale(${fs})`}>
                  {placed ? (
                    // Placed triangle (standing alone)
                    <polygon
                      points="0,-16 13,8 -13,8"
                      fill="#ef4444"
                      stroke="#fca5a5"
                      strokeWidth="2"
                    />
                  ) : (
                    <>
                      {/* Shadow */}
                      <ellipse cx="0" cy="18" rx="8" ry="2" fill="rgba(0,0,0,0.3)" />
                      {/* Legs */}
                      <line x1="-4" y1="8" x2="-7" y2="18" stroke="#cbd5e1" strokeWidth="2" />
                      <line x1="4" y1="8" x2="7" y2="18" stroke="#cbd5e1" strokeWidth="2" />
                      {/* Body */}
                      <line x1="0" y1="-4" x2="0" y2="8" stroke="#e2e8f0" strokeWidth="2.5" />
                      {/* Head */}
                      <circle cx="0" cy="-9" r="5" fill="#fbbf24" />
                      {/* Left arm */}
                      <line x1="-1" y1="0" x2="-8" y2="4" stroke="#e2e8f0" strokeWidth="2" />
                      {/* Right arm raised holding triangle */}
                      <line x1="1" y1="0" x2="9" y2="-8" stroke="#e2e8f0" strokeWidth="2" />
                      {/* Triangle in hand */}
                      <polygon
                        points="9,-8 16,-20 2,-20"
                        fill="#ef4444"
                        stroke="#fca5a5"
                        strokeWidth="1.5"
                      />
                    </>
                  )}
                </g>
              )}

              {/* ===== Parked car — REAR VIEW, right shoulder ===== */}
              {/* Car center at (196, 215) — partially cut at bottom, on right shoulder */}
              <g transform="translate(192, 218)">
                {/* Wheels */}
                <ellipse cx="-22" cy="-2" rx="15" ry="8" fill="#0f172a" />
                <ellipse cx="22" cy="-2" rx="15" ry="8" fill="#0f172a" />
                <ellipse cx="-22" cy="-2" rx="9" ry="5" fill="#1e293b" />
                <ellipse cx="22" cy="-2" rx="9" ry="5" fill="#1e293b" />
                <line x1="-22" y1="-7" x2="-22" y2="3" stroke="#334155" strokeWidth="1" />
                <line x1="-27" y1="-2" x2="-17" y2="-2" stroke="#334155" strokeWidth="1" />
                <line x1="22" y1="-7" x2="22" y2="3" stroke="#334155" strokeWidth="1" />
                <line x1="17" y1="-2" x2="27" y2="-2" stroke="#334155" strokeWidth="1" />

                {/* Rear bumper */}
                <rect x="-36" y="-14" width="72" height="12" fill="#0f172a" rx="4" />
                {/* Reflector strip */}
                <rect x="-34" y="-13" width="68" height="3" fill="#dc2626" rx="1" opacity="0.5" />

                {/* Lower body (trunk) */}
                <rect x="-34" y="-32" width="68" height="20" fill="#1d4ed8" rx="3" />

                {/* Tail lights */}
                <rect x="-34" y="-31" width="13" height="12" fill="#dc2626" rx="2" />
                <rect x="21" y="-31" width="13" height="12" fill="#dc2626" rx="2" />
                {/* Inner tail light detail */}
                <rect x="-32" y="-29" width="9" height="8" fill="#ef4444" rx="1" />
                <rect x="23" y="-29" width="9" height="8" fill="#ef4444" rx="1" />

                {/* License plate */}
                <rect x="-14" y="-24" width="28" height="9" fill="#e2e8f0" rx="1" />
                <text
                  x="0"
                  y="-17"
                  textAnchor="middle"
                  fontSize="5"
                  fill="#1e293b"
                  fontWeight="bold"
                >
                  ABC-1234
                </text>

                {/* Upper body */}
                <rect x="-30" y="-54" width="60" height="24" fill="#1d4ed8" rx="4" />
                {/* Rear window */}
                <rect x="-24" y="-52" width="48" height="19" fill="#bfdbfe" rx="3" opacity="0.35" />
                {/* Roof */}
                <rect x="-22" y="-60" width="44" height="10" fill="#1e40af" rx="4" />

                {/* Hazard light indicators on roof */}
                <rect
                  x="-8"
                  y="-60"
                  width="6"
                  height="4"
                  fill="#f59e0b"
                  rx="1"
                  opacity="0.8"
                  className="anim-hazard"
                />
                <rect
                  x="2"
                  y="-60"
                  width="6"
                  height="4"
                  fill="#f59e0b"
                  rx="1"
                  opacity="0.8"
                  className="anim-hazard"
                />
              </g>

              {/* Success overlay */}
              {placed && (
                <>
                  <rect x="0" y="0" width="240" height="215" fill="rgba(34,197,94,0.12)" />
                  <text
                    x="100"
                    y="115"
                    textAnchor="middle"
                    fill="#4ade80"
                    fontSize="32"
                    fontWeight="bold"
                  >
                    ✓
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* Distance progress bar */}
          <div
            style={{
              width: 44,
              padding: '12px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <div style={{ color: '#475569', fontSize: 11, textAlign: 'center', lineHeight: 1.3 }}>
              80m
            </div>
            <div
              style={{
                position: 'relative',
                width: 16,
                height: barH,
                background: '#1e293b',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              {/* Safe zone highlight */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: safeTop,
                  height: safeBot - safeTop,
                  background: 'rgba(34,197,94,0.3)',
                  borderTop: '1px solid #22c55e',
                  borderBottom: '1px solid #22c55e',
                }}
              />
              {/* Current distance indicator */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: indicatorY - 4,
                  height: 8,
                  background: inZone ? '#22c55e' : '#f59e0b',
                  borderRadius: 4,
                  transition: 'top 0.1s, background 0.2s',
                }}
              />
            </div>
            <div style={{ color: '#475569', fontSize: 11, textAlign: 'center', lineHeight: 1.3 }}>
              0m
            </div>
          </div>
        </div>

        {/* Error message */}
        <div
          style={{
            minHeight: 22,
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            color: '#f87171',
            padding: '2px 0',
          }}
        >
          {errorMsg}
        </div>

        {/* Controls */}
        <div style={{ padding: '10px 16px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6, flex: 1 }}>
            <button
              onClick={function () {
                move(-5);
              }}
              disabled={placed || distance <= 0}
              style={{
                flex: 1,
                padding: '10px 0',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: 12,
                color: '#e2e8f0',
                fontSize: 15,
                fontWeight: 700,
                cursor: placed || distance <= 0 ? 'default' : 'pointer',
                opacity: placed || distance <= 0 ? 0.4 : 1,
              }}
            >
              ◀ −5m
            </button>
            <button
              onClick={function () {
                move(5);
              }}
              disabled={placed || distance >= 80}
              style={{
                flex: 1,
                padding: '10px 0',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: 12,
                color: '#e2e8f0',
                fontSize: 15,
                fontWeight: 700,
                cursor: placed || distance >= 80 ? 'default' : 'pointer',
                opacity: placed || distance >= 80 ? 0.4 : 1,
              }}
            >
              +5m ▶
            </button>
          </div>
          <button
            onClick={handlePlace}
            disabled={placed}
            style={{
              padding: '10px 16px',
              background: placed
                ? '#166534'
                : inZone
                  ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                  : '#334155',
              border: 'none',
              borderRadius: 12,
              color: 'white',
              fontWeight: 900,
              fontSize: 14,
              cursor: placed ? 'default' : 'pointer',
              boxShadow: inZone && !placed ? '0 4px 14px rgba(34,197,94,0.4)' : 'none',
              transition: 'background 0.2s, box-shadow 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {placed ? '✓ 放置完成' : '🔺 放置'}
          </button>
        </div>

        {/* Keyboard hint */}
        <div style={{ textAlign: 'center', color: '#334155', fontSize: 12, paddingBottom: 12 }}>
          ↑ / → 前進 ｜ ↓ / ← 後退
        </div>
      </div>
    </div>
  );
}

export default SimTriangleModal;
