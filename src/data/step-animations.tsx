import type { ScenarioId } from '../types/scenario';

const SAHazardFlash = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect x="57" y="20" width="46" height="50" fill="#475569" rx="5" />
    <rect x="64" y="13" width="32" height="18" fill="#374151" rx="4" />
    <rect x="64" y="62" width="32" height="12" fill="#374151" rx="3" />
    <rect x="49" y="24" width="8" height="12" fill="#111827" rx="3" />
    <rect x="103" y="24" width="8" height="12" fill="#111827" rx="3" />
    <rect x="49" y="54" width="8" height="12" fill="#111827" rx="3" />
    <rect x="103" y="54" width="8" height="12" fill="#111827" rx="3" />
    <circle cx="53" cy="26" r="6" fill="#f59e0b" className="anim-hazard" />
    <circle cx="107" cy="26" r="6" fill="#f59e0b" className="anim-hazard" />
    <circle cx="53" cy="60" r="6" fill="#f59e0b" className="anim-hazard" />
    <circle cx="107" cy="60" r="6" fill="#f59e0b" className="anim-hazard" />
    <circle
      cx="53"
      cy="26"
      r="11"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1.5"
      className="anim-hazard"
      opacity="0.35"
    />
    <circle
      cx="107"
      cy="26"
      r="11"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1.5"
      className="anim-hazard"
      opacity="0.35"
    />
    <circle
      cx="53"
      cy="60"
      r="11"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1.5"
      className="anim-hazard"
      opacity="0.35"
    />
    <circle
      cx="107"
      cy="60"
      r="11"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1.5"
      className="anim-hazard"
      opacity="0.35"
    />
    <text x="80" y="84" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">
      雙黃燈持續閃爍
    </text>
  </svg>
);
const SACarToShoulder = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect x="8" y="16" width="144" height="58" fill="#2d3748" rx="4" />
    <line
      x1="8"
      y1="45"
      x2="152"
      y2="45"
      stroke="#475569"
      strokeWidth="1.5"
      strokeDasharray="10,8"
    />
    <rect x="122" y="16" width="30" height="58" fill="#374151" />
    <line x1="122" y1="16" x2="122" y2="74" stroke="#fbbf24" strokeWidth="2" />
    <g style={{ animation: 'stepSlideR 2.2s ease-in-out infinite' }}>
      <rect x="52" y="33" width="32" height="22" fill="#dc2626" rx="3" />
      <rect x="57" y="25" width="22" height="12" fill="#b91c1c" rx="2" />
      <circle cx="55" cy="33" r="3" fill="#f59e0b" className="anim-hazard" />
      <circle cx="82" cy="33" r="3" fill="#f59e0b" className="anim-hazard" />
    </g>
    <path
      d="M 96 44 L 114 44 M 109 39 L 115 44 L 109 49"
      stroke="#4ade80"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <text x="80" y="84" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      緩緩駛向路肩停靠
    </text>
  </svg>
);
const SATriangle = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect x="8" y="48" width="144" height="34" fill="#2d3748" rx="4" />
    <line
      x1="8"
      y1="65"
      x2="152"
      y2="65"
      stroke="#475569"
      strokeWidth="1.5"
      strokeDasharray="10,8"
    />
    <rect x="104" y="36" width="40" height="22" fill="#475569" rx="3" />
    <rect x="110" y="29" width="28" height="13" fill="#374151" rx="2" />
    <circle cx="107" cy="55" r="3" fill="#f59e0b" className="anim-hazard" />
    <circle cx="141" cy="55" r="3" fill="#f59e0b" className="anim-hazard" />
    <g style={{ animation: 'stepBounce 1.6s ease-in-out infinite', transformOrigin: '62px 44px' }}>
      <polygon points="62,14 85,46 39,46" fill="none" stroke="#f59e0b" strokeWidth="3" />
      <line x1="62" y1="24" x2="62" y2="37" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="62" cy="41" r="2" fill="#f59e0b" />
    </g>
    <line x1="86" y1="50" x2="104" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
    <text x="95" y="46" textAnchor="middle" fill="#94a3b8" fontSize="7">
      30–50m
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      車後 30–50 公尺放置三角架
    </text>
  </svg>
);
const SAPersonCross = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect x="0" y="44" width="160" height="38" fill="#2d3748" />
    <rect x="0" y="42" width="160" height="6" fill="#94a3b8" />
    {[10, 28, 46, 64, 82, 100, 118, 136].map((x) => (
      <rect key={x} x={x} y="32" width="3" height="20" fill="#6b7280" />
    ))}
    <text x="112" y="70" textAnchor="middle" fill="#ef4444" fontSize="8">
      ⚠️ 車道側
    </text>
    <text x="50" y="22" textAnchor="middle" fill="#4ade80" fontSize="8">
      ✓ 護欄外安全區
    </text>
    <g style={{ animation: 'stepSlideL 2.8s ease-in-out infinite' }}>
      <circle cx="96" cy="28" r="6" fill="#fbbf24" />
      <rect x="93" y="34" width="6" height="12" fill="#3b82f6" rx="1" />
      <line
        x1="91"
        y1="37"
        x2="87"
        y2="42"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="99"
        y1="37"
        x2="103"
        y2="42"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="93"
        y1="46"
        x2="90"
        y2="52"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="99"
        y1="46"
        x2="102"
        y2="52"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      越過護欄在安全區等待
    </text>
  </svg>
);
const SACrosswalkWatch = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Sidewalks */}
    <rect x="0" y="0" width="160" height="28" fill="#1e293b" />
    <rect x="0" y="62" width="160" height="28" fill="#1e293b" />
    {/* Road surface */}
    <rect x="0" y="28" width="160" height="34" fill="#334155" />
    {/* Center line dashes */}
    {[0, 22, 44, 66, 88, 110, 132].map((x) => (
      <rect key={x} x={x} y="43" width="16" height="4" fill="#475569" rx="1" />
    ))}
    {/* Crosswalk zebra stripes */}
    {[0, 1, 2, 3, 4].map((i) => (
      <rect
        key={i}
        x={92 + i * 7}
        y="28"
        width="4"
        height="34"
        fill="rgba(255,255,255,0.55)"
        rx="1"
      />
    ))}
    {/* Blue car (top-down) stopped before crosswalk */}
    <g transform="translate(60,45)">
      <rect x="-20" y="-10" width="26" height="20" fill="#1d4ed8" rx="2" />
      <rect x="-14" y="-15" width="16" height="8" fill="#1e40af" rx="1" />
      {/* Brake lights */}
      <rect x="-20" y="-8" width="5" height="5" fill="#ef4444" rx="1" className="anim-tail-light" />
      <rect x="-20" y="3" width="5" height="5" fill="#ef4444" rx="1" className="anim-tail-light" />
    </g>
    {/* Pedestrian walking across (upward through crosswalk) */}
    <g transform="translate(108, 45)">
      <g style={{ animation: 'stepSlideU 2.4s ease-in-out infinite' }}>
        <circle cx="0" cy="-10" r="5" fill="#fbbf24" />
        <rect x="-3" y="-5" width="6" height="10" fill="#3b82f6" rx="1" />
        <line
          x1="-3"
          y1="-2"
          x2="-7"
          y2="3"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="3" y1="-2" x2="7" y2="3" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <line
          x1="-2"
          y1="5"
          x2="-4"
          y2="12"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="2" y1="5" x2="4" y2="12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      等行人通過後再轉
    </text>
  </svg>
);
const SAPhoneCall = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <circle
      cx="80"
      cy="45"
      r="32"
      fill="none"
      stroke="#22c55e"
      strokeWidth="1.5"
      style={{ animation: 'stepRingWave 1.8s ease-out infinite' }}
      opacity="0.5"
    />
    <circle
      cx="80"
      cy="45"
      r="40"
      fill="none"
      stroke="#22c55e"
      strokeWidth="1"
      style={{ animation: 'stepRingWave 1.8s ease-out 0.45s infinite' }}
      opacity="0.25"
    />
    <g
      style={{ animation: 'stepPhoneRing 1.8s ease-in-out infinite', transformOrigin: '80px 45px' }}
    >
      <rect
        x="62"
        y="18"
        width="36"
        height="54"
        fill="#1e293b"
        rx="8"
        stroke="#475569"
        strokeWidth="2"
      />
      <rect x="68" y="24" width="24" height="34" fill="#0f172a" rx="3" />
      <circle cx="80" cy="63" r="3.5" fill="#334155" />
      <text x="80" y="36" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
        1968
      </text>
      <text x="80" y="47" textAnchor="middle" fill="#64748b" fontSize="7">
        高公局救援
      </text>
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      撥打道路救援電話
    </text>
  </svg>
);
const SAPhoneCall110 = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <circle
      cx="80"
      cy="45"
      r="32"
      fill="none"
      stroke="#ef4444"
      strokeWidth="1.5"
      style={{ animation: 'stepRingWave 1.8s ease-out infinite' }}
      opacity="0.5"
    />
    <circle
      cx="80"
      cy="45"
      r="40"
      fill="none"
      stroke="#ef4444"
      strokeWidth="1"
      style={{ animation: 'stepRingWave 1.8s ease-out 0.45s infinite' }}
      opacity="0.25"
    />
    <g
      style={{ animation: 'stepPhoneRing 1.8s ease-in-out infinite', transformOrigin: '80px 45px' }}
    >
      <rect
        x="62"
        y="18"
        width="36"
        height="54"
        fill="#1e293b"
        rx="8"
        stroke="#475569"
        strokeWidth="2"
      />
      <rect x="68" y="24" width="24" height="34" fill="#0f172a" rx="3" />
      <circle cx="80" cy="63" r="3.5" fill="#334155" />
      <text x="80" y="36" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="900">
        110
      </text>
      <text x="80" y="47" textAnchor="middle" fill="#64748b" fontSize="7">
        報警
      </text>
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="700">
      撥打110報警
    </text>
  </svg>
);
const SAPhoneCallInsurance = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <circle
      cx="80"
      cy="45"
      r="32"
      fill="none"
      stroke="#60a5fa"
      strokeWidth="1.5"
      style={{ animation: 'stepRingWave 1.8s ease-out infinite' }}
      opacity="0.5"
    />
    <circle
      cx="80"
      cy="45"
      r="40"
      fill="none"
      stroke="#60a5fa"
      strokeWidth="1"
      style={{ animation: 'stepRingWave 1.8s ease-out 0.45s infinite' }}
      opacity="0.25"
    />
    <g
      style={{ animation: 'stepPhoneRing 1.8s ease-in-out infinite', transformOrigin: '80px 45px' }}
    >
      <rect
        x="62"
        y="18"
        width="36"
        height="54"
        fill="#1e293b"
        rx="8"
        stroke="#475569"
        strokeWidth="2"
      />
      <rect x="68" y="24" width="24" height="34" fill="#0f172a" rx="3" />
      <circle cx="80" cy="63" r="3.5" fill="#334155" />
      {/* Shield icon for insurance */}
      <path
        d="M80 27 L87 30 L87 38 Q87 43 80 46 Q73 43 73 38 L73 30 Z"
        fill="#1d4ed8"
        stroke="#60a5fa"
        strokeWidth="1"
      />
      <text x="80" y="40" textAnchor="middle" fill="#bfdbfe" fontSize="8" fontWeight="700">
        保險
      </text>
      <text x="80" y="50" textAnchor="middle" fill="#64748b" fontSize="7">
        保險公司
      </text>
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="700">
      聯絡保險公司報案
    </text>
  </svg>
);
const SASteeringGrip = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <circle cx="80" cy="44" r="30" fill="none" stroke="#4b5563" strokeWidth="7" />
    <circle cx="80" cy="44" r="10" fill="#374151" stroke="#4b5563" strokeWidth="3" />
    <line x1="80" y1="34" x2="80" y2="16" stroke="#4b5563" strokeWidth="5" strokeLinecap="round" />
    <line x1="71" y1="50" x2="58" y2="66" stroke="#4b5563" strokeWidth="5" strokeLinecap="round" />
    <line x1="89" y1="50" x2="102" y2="66" stroke="#4b5563" strokeWidth="5" strokeLinecap="round" />
    <g
      style={{ animation: 'stepGripPulse 1.4s ease-in-out infinite', transformOrigin: '52px 44px' }}
    >
      <circle cx="52" cy="44" r="12" fill="#92400e" opacity="0.8" />
      <text x="52" y="48" textAnchor="middle" fontSize="14">
        ✊
      </text>
    </g>
    <g
      style={{
        animation: 'stepGripPulse 1.4s ease-in-out 0.7s infinite',
        transformOrigin: '108px 44px',
      }}
    >
      <circle cx="108" cy="44" r="12" fill="#92400e" opacity="0.8" />
      <text x="108" y="48" textAnchor="middle" fontSize="14">
        ✊
      </text>
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      雙手緊握方向盤保持直線
    </text>
  </svg>
);
const SALiftFoot = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect
      x="88"
      y="46"
      width="40"
      height="24"
      fill="#374151"
      rx="4"
      stroke="#475569"
      strokeWidth="2"
    />
    <text x="108" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">
      油門
    </text>
    <rect
      x="32"
      y="46"
      width="40"
      height="24"
      fill="#374151"
      rx="4"
      stroke="#475569"
      strokeWidth="2"
    />
    <text x="52" y="62" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">
      煞車
    </text>
    <line x1="35" y1="49" x2="69" y2="67" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
    <line x1="69" y1="49" x2="35" y2="67" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
    <text x="52" y="42" textAnchor="middle" fill="#ef4444" fontSize="9">
      ✗ 不踩
    </text>
    <g style={{ animation: 'stepFootLift 2s ease-in-out infinite', transformOrigin: '108px 46px' }}>
      <text x="108" y="38" textAnchor="middle" fontSize="20">
        🦶
      </text>
    </g>
    <text x="108" y="42" textAnchor="middle" fill="#4ade80" fontSize="8">
      慢放開
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      放開油門自然減速（不踩煞車）
    </text>
  </svg>
);
const SAFogLights = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect
      x="6"
      y="8"
      width="70"
      height="72"
      fill="#0f172a"
      rx="6"
      stroke="#22c55e"
      strokeWidth="2"
    />
    <text x="41" y="22" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">
      ✓ 近光燈
    </text>
    <circle cx="22" cy="54" r="5" fill="#fef3c7" opacity="0.9" />
    <circle cx="60" cy="54" r="5" fill="#fef3c7" opacity="0.9" />
    <path d="M 6 54 L 16 48 L 16 60 Z" fill="#fef3c7" opacity="0.35" />
    <path d="M 76 54 L 66 48 L 66 60 Z" fill="#fef3c7" opacity="0.35" />
    <text x="41" y="68" textAnchor="middle" fill="#4ade80" fontSize="7">
      穿透力強
    </text>
    <rect
      x="84"
      y="8"
      width="70"
      height="72"
      fill="#0f172a"
      rx="6"
      stroke="#ef4444"
      strokeWidth="2"
    />
    <text x="119" y="22" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
      ✗ 遠光燈
    </text>
    <circle cx="100" cy="54" r="5" fill="#fef3c7" opacity="0.9" />
    <circle cx="138" cy="54" r="5" fill="#fef3c7" opacity="0.9" />
    <ellipse cx="119" cy="40" rx="24" ry="16" fill="#fef3c7" className="anim-fog" opacity="0.3" />
    <text x="119" y="60" textAnchor="middle" fill="#ef4444" fontSize="7">
      反射炫光
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      開近光燈 ＋ 霧燈
    </text>
  </svg>
);
const SASpeedDrop = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <circle cx="80" cy="50" r="36" fill="#1e293b" stroke="#334155" strokeWidth="2.5" />
    <path
      d="M 46 70 A 36 36 0 1 1 114 70"
      fill="none"
      stroke="#1f2937"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M 46 70 A 36 36 0 1 1 114 70"
      fill="none"
      stroke="#22c55e"
      strokeWidth="8"
      strokeLinecap="round"
      strokeDasharray="150"
      strokeDashoffset="115"
    />
    <g
      style={{
        animation: 'stepNeedleDrop 2.4s ease-in-out infinite',
        transformOrigin: '80px 50px',
      }}
    >
      <line
        x1="80"
        y1="50"
        x2="80"
        y2="18"
        stroke="#4ade80"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </g>
    <circle cx="80" cy="50" r="6" fill="#4ade80" />
    <circle cx="80" cy="50" r="3" fill="#0f172a" />
    <text x="80" y="64" textAnchor="middle" fill="#4ade80" fontSize="16" fontWeight="900">
      ↓
    </text>
    <text x="80" y="82" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      大幅降低車速
    </text>
  </svg>
);
const SACarGap = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect x="0" y="28" width="160" height="38" fill="#2d3748" />
    <line
      x1="0"
      y1="47"
      x2="160"
      y2="47"
      stroke="#475569"
      strokeWidth="1.5"
      strokeDasharray="8,6"
    />
    <rect x="4" y="34" width="36" height="26" fill="#1d4ed8" rx="3" />
    <rect x="10" y="27" width="24" height="14" fill="#1e40af" rx="2" />
    <rect x="96" y="34" width="36" height="26" fill="#dc2626" rx="3" />
    <rect x="102" y="27" width="24" height="14" fill="#b91c1c" rx="2" />
    <line
      x1="42"
      y1="47"
      x2="94"
      y2="47"
      stroke="#4ade80"
      strokeWidth="2.5"
      strokeDasharray="5,4"
    />
    <line x1="42" y1="40" x2="42" y2="54" stroke="#4ade80" strokeWidth="2" />
    <line x1="94" y1="40" x2="94" y2="54" stroke="#4ade80" strokeWidth="2" />
    <text x="68" y="43" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
      3 秒以上
    </text>
    <text x="80" y="76" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      能見度越差，距離越大
    </text>
  </svg>
);
const SAPullOver = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect x="8" y="18" width="144" height="54" fill="#2d3748" rx="4" />
    <line
      x1="8"
      y1="45"
      x2="152"
      y2="45"
      stroke="#475569"
      strokeWidth="1.5"
      strokeDasharray="10,8"
    />
    <rect x="118" y="18" width="34" height="54" fill="#374151" />
    <line x1="118" y1="18" x2="118" y2="72" stroke="#fbbf24" strokeWidth="2" />
    <rect x="120" y="32" width="28" height="18" fill="#065f46" rx="3" />
    <rect x="125" y="25" width="18" height="11" fill="#047857" rx="2" />
    <circle cx="123" cy="32" r="2.5" fill="#f59e0b" className="anim-hazard" />
    <circle cx="145" cy="32" r="2.5" fill="#f59e0b" className="anim-hazard" />
    <circle cx="50" cy="45" r="18" fill="#15803d" opacity="0.85" />
    <text x="50" y="51" textAnchor="middle" fill="white" fontSize="20" fontWeight="900">
      P
    </text>
    <text x="80" y="82" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      找安全地點靠邊停車等待
    </text>
  </svg>
);
const SACamera = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect
      x="42"
      y="26"
      width="76"
      height="46"
      fill="#1e293b"
      rx="9"
      stroke="#475569"
      strokeWidth="2"
    />
    <rect
      x="58"
      y="17"
      width="24"
      height="15"
      fill="#1e293b"
      rx="4"
      stroke="#475569"
      strokeWidth="2"
    />
    <circle cx="80" cy="49" r="17" fill="#0f172a" stroke="#334155" strokeWidth="3" />
    <circle cx="80" cy="49" r="11" fill="#1e3a5f" />
    <circle cx="80" cy="49" r="6" fill="#0f172a" />
    <circle cx="77" cy="46" r="2.5" fill="#60a5fa" opacity="0.7" />
    <circle
      cx="80"
      cy="49"
      r="22"
      fill="#fef9c3"
      style={{ animation: 'stepCamFlash 2.5s ease-in-out infinite' }}
      opacity="0"
    />
    <text
      x="124"
      y="54"
      fontSize="18"
      style={{ animation: 'stepCamFlash 2.5s ease-in-out infinite' }}
    >
      ⚡
    </text>
    <text x="80" y="82" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      移車前先拍照記錄現場
    </text>
  </svg>
);
const SADataExchange = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <circle cx="28" cy="26" r="9" fill="#fbbf24" />
    <rect x="22" y="35" width="12" height="18" fill="#3b82f6" rx="2" />
    <line x1="22" y1="40" x2="16" y2="46" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
    <line x1="34" y1="40" x2="40" y2="46" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
    <circle cx="132" cy="26" r="9" fill="#fbbf24" />
    <rect x="126" y="35" width="12" height="18" fill="#ef4444" rx="2" />
    <line
      x1="126"
      y1="40"
      x2="120"
      y2="46"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="138"
      y1="40"
      x2="144"
      y2="46"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <g style={{ animation: 'stepDocSlide 2s ease-in-out infinite' }}>
      <rect x="56" y="32" width="48" height="32" fill="#f1f5f9" rx="4" />
      <line x1="63" y1="40" x2="97" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="63" y1="47" x2="97" y2="47" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="63" y1="54" x2="86" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="80" y="38" textAnchor="middle" fill="#475569" fontSize="5" fontWeight="700">
        駕照・行照
      </text>
    </g>
    <path
      d="M 40 50 L 54 50 M 120 50 L 106 50"
      stroke="#4ade80"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <text x="80" y="78" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      互換駕照・行照・聯絡資訊
    </text>
  </svg>
);
const SACheckInjury = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <circle cx="68" cy="28" r="11" fill="#fbbf24" />
    <rect x="60" y="39" width="16" height="22" fill="#475569" rx="2" />
    <line
      x1="60"
      y1="44"
      x2="54"
      y2="52"
      stroke="#475569"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="76"
      y1="44"
      x2="82"
      y2="52"
      stroke="#475569"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="62"
      y1="61"
      x2="58"
      y2="70"
      stroke="#475569"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="74"
      y1="61"
      x2="78"
      y2="70"
      stroke="#475569"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <text x="40" y="26" fill="#fbbf24" fontSize="22" fontWeight="900">
      ?
    </text>
    <g
      style={{
        animation: 'stepGripPulse 1.3s ease-in-out infinite',
        transformOrigin: '118px 38px',
      }}
    >
      <circle cx="118" cy="38" r="18" fill="#15803d" opacity="0.85" />
      <rect x="113" y="31" width="10" height="14" fill="white" rx="2" />
      <rect x="111" y="33" width="14" height="10" fill="white" rx="2" />
    </g>
    <text x="80" y="82" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      先確認人員有無受傷
    </text>
  </svg>
);
const SAStayCalm = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <text x="80" y="24" textAnchor="middle" fill="#60a5fa" fontSize="13">
      😤 深呼吸
    </text>
    <polyline
      points="14,55 28,55 34,36 42,70 50,46 57,55 72,55 78,38 86,68 93,48 100,55 114,55 120,40 128,65 136,50 146,55"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: 'stepHeartCalm 2s ease-in-out infinite' }}
    />
    <text x="80" y="78" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      保持冷靜，有時間做正確判斷
    </text>
  </svg>
);
const SABrakePump = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect
      x="44"
      y="44"
      width="72"
      height="28"
      fill="#374151"
      rx="5"
      stroke="#475569"
      strokeWidth="2"
    />
    <text x="80" y="62" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="700">
      BRAKE
    </text>
    <g
      style={{
        animation: 'stepBrakePump 0.85s ease-in-out infinite',
        transformOrigin: '80px 44px',
      }}
    >
      <text x="80" y="34" textAnchor="middle" fontSize="22">
        🦶
      </text>
    </g>
    <text x="26" y="46" fill="#f59e0b" fontSize="11" fontWeight="700">
      ↓↑
    </text>
    <text x="126" y="46" fill="#f59e0b" fontSize="11" fontWeight="700">
      ↓↑
    </text>
    <text x="80" y="82" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      快速點踩（非一踩到底）
    </text>
  </svg>
);
const SAGearDown = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <line x1="50" y1="18" x2="50" y2="72" stroke="#334155" strokeWidth="2" />
    <line x1="80" y1="18" x2="80" y2="72" stroke="#334155" strokeWidth="2" />
    <line x1="110" y1="18" x2="110" y2="72" stroke="#334155" strokeWidth="2" />
    <line x1="50" y1="45" x2="110" y2="45" stroke="#334155" strokeWidth="2" />
    {[
      ['5', 50, 24],
      ['3', 50, 66],
      ['4', 80, 24],
      ['N', 80, 66],
      ['2', 110, 24],
      ['1', 110, 66],
    ].map(([g, x, y]) => (
      <g key={`${g}${x}`}>
        <circle cx={x} cy={y} r="10" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <text
          x={x}
          y={(y as number) + 4}
          textAnchor="middle"
          fill="#64748b"
          fontSize="10"
          fontWeight="700"
        >
          {g}
        </text>
      </g>
    ))}
    <g style={{ animation: 'stepGearDrop 2s ease-in-out infinite' }}>
      <circle cx="110" cy="24" r="12" fill="#f59e0b" opacity="0.95" />
      <text x="110" y="28" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900">
        1
      </text>
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      逐步降檔 5→4→3→2→1
    </text>
  </svg>
);
const SAHornHazard = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect x="42" y="28" width="76" height="36" fill="#334155" rx="6" />
    <rect x="52" y="20" width="56" height="22" fill="#2d3748" rx="4" />
    <ellipse cx="50" cy="50" rx="9" ry="5" fill="#fef3c7" opacity="0.8" />
    <ellipse cx="110" cy="50" rx="9" ry="5" fill="#fef3c7" opacity="0.8" />
    <circle cx="48" cy="32" r="5" fill="#f59e0b" className="anim-hazard" />
    <circle cx="112" cy="32" r="5" fill="#f59e0b" className="anim-hazard" />
    <circle
      cx="48"
      cy="32"
      r="9"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1"
      className="anim-hazard"
      opacity="0.3"
    />
    <circle
      cx="112"
      cy="32"
      r="9"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="1"
      className="anim-hazard"
      opacity="0.3"
    />
    <circle cx="80" cy="46" r="8" fill="#475569" stroke="#6b7280" strokeWidth="1" />
    <text x="80" y="50" textAnchor="middle" fill="#fbbf24" fontSize="10">
      📣
    </text>
    <path
      d="M 18 42 Q 12 38 18 30"
      stroke="#fbbf24"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      style={{ animation: 'stepRingWave 1.4s ease-out infinite' }}
    />
    <path
      d="M 12 46 Q 5 40 12 26"
      stroke="#fbbf24"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      style={{ animation: 'stepRingWave 1.4s ease-out 0.25s infinite' }}
      opacity="0.5"
    />
    <path
      d="M 142 42 Q 148 38 142 30"
      stroke="#fbbf24"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      style={{ animation: 'stepRingWave 1.4s ease-out infinite' }}
    />
    <text x="80" y="78" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      按喇叭 ＋ 開危險警示燈
    </text>
  </svg>
);
const SASafeSpot = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <path
      d="M 8 78 L 62 38 L 152 38"
      stroke="#2d3748"
      strokeWidth="20"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 8 78 L 62 38 L 152 38"
      stroke="#374151"
      strokeWidth="14"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 8 78 L 62 38 L 152 38"
      stroke="#475569"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="10,8"
    />
    <g transform="translate(118, 34) rotate(-4)">
      <rect x="-18" y="-10" width="36" height="16" fill="#065f46" rx="3" />
      <rect x="-12" y="-18" width="24" height="10" fill="#047857" rx="2" />
      <circle cx="-15" cy="-8" r="2.5" fill="#f59e0b" className="anim-hazard" />
      <circle cx="15" cy="-8" r="2.5" fill="#f59e0b" className="anim-hazard" />
    </g>
    <circle cx="40" cy="32" r="16" fill="#15803d" opacity="0.85" />
    <text x="40" y="37" textAnchor="middle" fill="white" fontSize="16" fontWeight="900">
      ✓
    </text>
    <text x="80" y="60" textAnchor="middle" fill="#94a3b8" fontSize="7">
      上坡 / 空地 / 緩衝區
    </text>
    <text x="80" y="78" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      找安全地點讓車自然停下
    </text>
  </svg>
);
const SAHandbrake = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    <rect x="74" y="52" width="12" height="10" fill="#475569" rx="4" />
    <line x1="80" y1="52" x2="80" y2="16" stroke="#4b5563" strokeWidth="7" strokeLinecap="round" />
    <ellipse cx="80" cy="16" rx="12" ry="8" fill="#334155" stroke="#6b7280" strokeWidth="2" />
    <g
      style={{
        animation: 'stepHandbrakePull 2s ease-in-out infinite',
        transformOrigin: '80px 16px',
      }}
    >
      <text x="80" y="14" textAnchor="middle" fontSize="18">
        🤚
      </text>
    </g>
    <path
      d="M 94 34 Q 112 28 108 16"
      stroke="#4ade80"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <text x="118" y="30" fill="#4ade80" fontSize="8">
      輕拉
    </text>
    <rect x="14" y="55" width="50" height="20" fill="#7f1d1d" rx="6" opacity="0.8" />
    <text x="39" y="69" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">
      ✗ 猛拉=甩尾
    </text>
    <rect x="96" y="55" width="50" height="20" fill="#15803d" rx="6" opacity="0.8" />
    <text x="121" y="69" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">
      ✓ 緩慢輕拉
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      緩慢輕拉手煞車
    </text>
  </svg>
);

// == Narrow Road animations ==
const SANarrowSlowDown = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road */}
    <rect x="55" y="8" width="50" height="74" fill="#2d3748" rx="4" />
    <line x1="80" y1="8" x2="80" y2="82" stroke="#475569" strokeWidth="1.5" strokeDasharray="8,6" />
    {/* Left/right walls */}
    <rect x="35" y="8" width="20" height="74" fill="#1e3a1e" />
    <rect x="105" y="8" width="20" height="74" fill="#1e3a1e" />
    {/* Player car slowing */}
    <g style={{ animation: 'stepSlideL 2.4s ease-in-out infinite' }}>
      <rect x="66" y="48" width="28" height="20" fill="#dc2626" rx="3" />
      <rect x="70" y="40" width="20" height="12" fill="#b91c1c" rx="2" />
    </g>
    {/* Oncoming car */}
    <g transform="translate(80,20) rotate(180)">
      <rect x="-14" y="-12" width="28" height="18" fill="#2563eb" rx="3" />
      <rect x="-8" y="-18" width="16" height="10" fill="#1d4ed8" rx="2" />
      <circle cx="-14" cy="-11" r="3" fill="#fef9c3" opacity="0.9" />
      <circle cx="14" cy="-11" r="3" fill="#fef9c3" opacity="0.9" />
    </g>
    {/* Speed drop arrow */}
    <path
      d="M 128 30 L 128 55"
      stroke="#4ade80"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    <polygon points="122,50 134,50 128,58" fill="#4ade80" />
    <text x="128" y="24" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="700">
      ↓速
    </text>
    <text x="80" y="86" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      立即減速，停車待命
    </text>
  </svg>
);
const SANarrowPullRight = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road */}
    <rect x="45" y="8" width="70" height="74" fill="#2d3748" rx="4" />
    <line x1="80" y1="8" x2="80" y2="82" stroke="#475569" strokeWidth="1.5" strokeDasharray="8,6" />
    {/* Mountain walls */}
    <rect x="25" y="8" width="20" height="74" fill="#1e3a1e" />
    <rect x="115" y="8" width="20" height="74" fill="#1e3a1e" />
    {/* Car sliding right */}
    <g style={{ animation: 'stepSlideR 2s ease-in-out infinite' }}>
      <rect x="52" y="52" width="28" height="20" fill="#dc2626" rx="3" />
      <rect x="56" y="44" width="20" height="12" fill="#b91c1c" rx="2" />
      <circle cx="49" cy="52" r="3" fill="#fef3c7" opacity="0.9" />
      <circle cx="83" cy="52" r="3" fill="#fef3c7" opacity="0.9" />
    </g>
    {/* Oncoming car on left side */}
    <g transform="translate(65,22) rotate(180)">
      <rect x="-12" y="-10" width="24" height="16" fill="#2563eb" rx="3" />
      <circle cx="-12" cy="-9" r="3" fill="#fef9c3" opacity="0.9" />
      <circle cx="12" cy="-9" r="3" fill="#fef9c3" opacity="0.9" />
    </g>
    {/* Headlight beams */}
    <line
      x1="100"
      y1="54"
      x2="116"
      y2="48"
      stroke="#fef9c3"
      strokeWidth="1.5"
      opacity="0.6"
      strokeDasharray="3,2"
    />
    <line
      x1="100"
      y1="60"
      x2="116"
      y2="66"
      stroke="#fef9c3"
      strokeWidth="1.5"
      opacity="0.6"
      strokeDasharray="3,2"
    />
    {/* Arrow right */}
    <path
      d="M 96 62 L 108 62 M 104 57 L 110 62 L 104 67"
      stroke="#4ade80"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <text x="80" y="86" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      靠右讓路，開啟頭燈
    </text>
  </svg>
);
const SANarrowYield = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road */}
    <rect x="55" y="8" width="50" height="74" fill="#2d3748" rx="4" />
    <line x1="80" y1="8" x2="80" y2="82" stroke="#475569" strokeWidth="1.5" strokeDasharray="8,6" />
    {/* Mountain walls */}
    <rect x="35" y="8" width="20" height="74" fill="#1e3a1e" />
    <rect x="105" y="8" width="20" height="74" fill="#1e3a1e" />
    {/* Downhill label */}
    <text x="18" y="18" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="700">
      下坡
    </text>
    <text x="18" y="28" textAnchor="middle" fill="#94a3b8" fontSize="8">
      ↓
    </text>
    {/* Uphill label */}
    <text x="18" y="70" textAnchor="middle" fill="#fbbf24" fontSize="8">
      ↑
    </text>
    <text x="18" y="80" textAnchor="middle" fill="#fbbf24" fontSize="6" fontWeight="700">
      上坡
    </text>
    {/* Downhill car (blue) at top, facing down */}
    <g transform="translate(68, 26) rotate(180)">
      <rect x="-12" y="-10" width="24" height="18" fill="#2563eb" rx="3" />
      <rect x="-8" y="-17" width="16" height="10" fill="#1d4ed8" rx="2" />
      <circle cx="-10" cy="-9" r="2.5" fill="#fef9c3" opacity="0.9" />
      <circle cx="10" cy="-9" r="2.5" fill="#fef9c3" opacity="0.9" />
    </g>
    {/* Green pass indicator for downhill */}
    <circle cx="134" cy="26" r="9" fill="#15803d" />
    <text x="134" y="30" textAnchor="middle" fill="white" fontSize="11" fontWeight="900">
      ✓
    </text>
    {/* Uphill car (red) at bottom, facing up, bouncing = waiting */}
    <g style={{ animation: 'stepBounce 2s ease-in-out infinite' }}>
      <rect x="66" y="58" width="28" height="20" fill="#dc2626" rx="3" />
      <rect x="70" y="50" width="20" height="12" fill="#b91c1c" rx="2" />
    </g>
    {/* Yield indicator for uphill */}
    <circle cx="134" cy="68" r="9" fill="#ef4444" />
    <text x="134" y="72" textAnchor="middle" fill="white" fontSize="7" fontWeight="900">
      讓
    </text>
    <text x="80" y="86" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      上坡讓下坡先行
    </text>
  </svg>
);
const SANarrowReverse = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road narrow */}
    <rect x="55" y="8" width="50" height="74" fill="#2d3748" rx="4" />
    <line x1="80" y1="8" x2="80" y2="82" stroke="#475569" strokeWidth="1.5" strokeDasharray="8,6" />
    <rect x="35" y="8" width="20" height="74" fill="#1e3a1e" />
    <rect x="105" y="8" width="20" height="74" fill="#1e3a1e" />
    {/* Wider spot behind */}
    <rect x="35" y="55" width="90" height="27" fill="#374151" rx="3" opacity="0.8" />
    <text x="80" y="73" textAnchor="middle" fill="#4ade80" fontSize="6" fontWeight="700">
      較寬處
    </text>
    {/* Car reversing (downward) */}
    <g style={{ animation: 'stepBounce 1.8s ease-in-out infinite' }}>
      <rect x="66" y="30" width="28" height="20" fill="#dc2626" rx="3" />
      <rect x="70" y="22" width="20" height="12" fill="#b91c1c" rx="2" />
      {/* Reverse lights (white at back) */}
      <circle cx="66" cy="50" r="3" fill="white" opacity="0.9" />
      <circle cx="94" cy="50" r="3" fill="white" opacity="0.9" />
    </g>
    {/* Reverse arrow */}
    <path
      d="M 130 35 L 130 60"
      stroke="#fbbf24"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <polygon points="124,55 136,55 130,63" fill="#fbbf24" />
    <text x="130" y="28" textAnchor="middle" fill="#fbbf24" fontSize="7" fontWeight="700">
      倒車
    </text>
    <text x="80" y="86" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      必要時倒退找寬處
    </text>
  </svg>
);
const SANarrowPass = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road */}
    <rect x="40" y="8" width="80" height="74" fill="#2d3748" rx="4" />
    <line x1="80" y1="8" x2="80" y2="82" stroke="#475569" strokeWidth="1.5" strokeDasharray="8,6" />
    <rect x="20" y="8" width="20" height="74" fill="#1e3a1e" />
    <rect x="120" y="8" width="20" height="74" fill="#1e3a1e" />
    {/* Two cars passing safely */}
    <g transform="translate(62,60)">
      <rect x="-12" y="-12" width="24" height="18" fill="#dc2626" rx="3" />
      <rect x="-7" y="-20" width="14" height="11" fill="#b91c1c" rx="2" />
      <ellipse cx="-8" cy="6" rx="5" ry="4" fill="#111" />
      <ellipse cx="8" cy="6" rx="5" ry="4" fill="#111" />
    </g>
    <g transform="translate(98,30) rotate(180)">
      <rect x="-12" y="-12" width="24" height="18" fill="#2563eb" rx="3" />
      <rect x="-7" y="-20" width="14" height="11" fill="#1d4ed8" rx="2" />
      <ellipse cx="-8" cy="6" rx="5" ry="4" fill="#111" />
      <ellipse cx="8" cy="6" rx="5" ry="4" fill="#111" />
    </g>
    {/* Success badge */}
    <circle cx="22" cy="22" r="12" fill="#15803d" opacity="0.9" />
    <text x="22" y="27" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
      ✓
    </text>
    {/* Speed labels */}
    <text x="62" y="79" textAnchor="middle" fill="#94a3b8" fontSize="7">
      步行速度
    </text>
    <text x="98" y="14" textAnchor="middle" fill="#94a3b8" fontSize="7">
      步行速度
    </text>
    <text x="80" y="86" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
      緩緩通過，注意兩側間距
    </text>
  </svg>
);

// == Intersection Crash ==
const SALookBothWays = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Eyes looking left and right */}
    <ellipse cx="55" cy="40" rx="20" ry="14" fill="white" />
    <ellipse cx="105" cy="40" rx="20" ry="14" fill="white" />
    <circle
      cx="48"
      cy="40"
      r="7"
      fill="#1e293b"
      style={{ animation: 'stepSlideR 2s ease-in-out infinite' }}
    />
    <circle
      cx="98"
      cy="40"
      r="7"
      fill="#1e293b"
      style={{ animation: 'stepSlideR 2s ease-in-out infinite' }}
    />
    {/* Arrows */}
    <polygon points="10,40 22,34 22,46" fill="#ef4444" opacity="0.7" />
    <polygon points="150,40 138,34 138,46" fill="#ef4444" opacity="0.7" />
    <text x="80" y="80" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      左右確認再起步
    </text>
  </svg>
);

const SABrakeStop = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Horizontal road */}
    <rect x="0" y="32" width="160" height="26" fill="#1e293b" />
    {/* Vertical road */}
    <rect x="67" y="0" width="26" height="90" fill="#252f3f" />
    {/* Road edge lines */}
    <line x1="0" y1="32" x2="160" y2="32" stroke="#475569" strokeWidth="1" />
    <line x1="0" y1="58" x2="160" y2="58" stroke="#475569" strokeWidth="1" />
    {/* Brake skid marks */}
    <line
      x1="76"
      y1="60"
      x2="76"
      y2="76"
      stroke="#ef4444"
      strokeWidth="1.5"
      opacity="0.55"
      strokeDasharray="3,3"
    />
    <line
      x1="84"
      y1="60"
      x2="84"
      y2="76"
      stroke="#ef4444"
      strokeWidth="1.5"
      opacity="0.55"
      strokeDasharray="3,3"
    />
    {/* Blue player car — stopped */}
    <g transform="translate(80,70)">
      <rect x="-9" y="-13" width="18" height="21" fill="#1d4ed8" rx="2" />
      <rect x="-5" y="-18" width="10" height="8" fill="#1e40af" rx="1" />
      {/* Brake lights — blinking red */}
      <rect x="-7" y="6" width="5" height="4" fill="#ef4444" rx="1" className="anim-hazard" />
      <rect x="2" y="6" width="5" height="4" fill="#ef4444" rx="1" className="anim-hazard" />
    </g>
    {/* Red car crossing safely in front — animated */}
    <g transform="translate(80,43)">
      <g style={{ animation: 'stepSlideRIn 2.2s ease-in-out infinite' }}>
        <rect x="-12" y="-8" width="24" height="16" fill="#dc2626" rx="2" />
        <rect x="-7" y="-13" width="14" height="8" fill="#b91c1c" rx="1" />
      </g>
    </g>
    {/* STOP badge */}
    <rect x="100" y="63" width="34" height="16" fill="#dc2626" rx="4" />
    <text x="117" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">
      STOP
    </text>
    {/* Label */}
    <text x="80" y="88" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
      立即踩煞車停住
    </text>
  </svg>
);

// == Scooter Weaving ==
const SACheckMirror = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Mirror frame */}
    <rect x="30" y="10" width="100" height="55" fill="#374151" rx="8" />
    <rect x="34" y="14" width="92" height="47" fill="#1e293b" rx="6" />
    {/* Scooter reflection in mirror */}
    <g transform="translate(95,38)">
      <ellipse cx="0" cy="5" rx="6" ry="3" fill="#111" />
      <rect x="-3" y="-5" width="6" height="9" fill="#7c3aed" rx="1" />
      <circle cx="0" cy="-8" r="3" fill="#fbbf24" />
    </g>
    {/* Head turning indicator */}
    <path d="M 60 38 Q 50 32 42 38" stroke="#f59e0b" strokeWidth="2" fill="none" />
    <polygon points="40,36 42,38 44,35" fill="#f59e0b" />
    {/* A-pillar label */}
    <rect x="28" y="12" width="6" height="51" fill="#475569" rx="2" />
    <text
      x="31"
      y="42"
      textAnchor="middle"
      fill="#94a3b8"
      fontSize="6"
      transform="rotate(-90,31,42)"
    >
      A柱
    </text>
    <text x="80" y="82" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      確認後視鏡與 A 柱死角
    </text>
  </svg>
);

const SASignalEarly = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Turn signal indicator */}
    <polygon points="80,15 110,40 80,65 50,40" fill="none" stroke="#22c55e" strokeWidth="3" />
    <polygon points="80,22 103,40 80,58 57,40" fill="#22c55e" className="anim-hazard" />
    {/* Arrow inside */}
    <polygon points="75,40 90,32 90,48" fill="#0f172a" />
    {/* Distance marker */}
    <line x1="30" y1="75" x2="130" y2="75" stroke="#64748b" strokeWidth="1.5" />
    <line x1="30" y1="71" x2="30" y2="79" stroke="#64748b" strokeWidth="1.5" />
    <line x1="130" y1="71" x2="130" y2="79" stroke="#64748b" strokeWidth="1.5" />
    <text x="80" y="84" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">
      提前 30 公尺打方向燈
    </text>
  </svg>
);

const SACheckAndTurn = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road with turn */}
    <rect x="60" y="0" width="40" height="90" fill="#2d3748" />
    <rect x="60" y="50" width="100" height="40" fill="#2d3748" />
    {/* Car turning */}
    <g transform="translate(80,42)">
      <rect x="-10" y="-8" width="20" height="14" fill="#1d4ed8" rx="2" />
      <rect x="-6" y="-14" width="12" height="8" fill="#1e40af" rx="1" />
    </g>
    {/* Check mark */}
    <circle cx="130" cy="25" r="14" fill="#15803d" opacity="0.9" />
    <text x="130" y="30" textAnchor="middle" fill="white" fontSize="15" fontWeight="900">
      ✓
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">
      確認安全後再完成轉彎
    </text>
  </svg>
);

// == Drowsy Driving ==
const SAFatigueSign = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Drowsy face */}
    <circle cx="80" cy="38" r="24" fill="#fbbf24" />
    {/* Heavy eyelids */}
    <ellipse cx="70" cy="34" rx="7" ry="4" fill="white" />
    <ellipse cx="90" cy="34" rx="7" ry="4" fill="white" />
    <rect
      x="63"
      y="28"
      width="14"
      height="8"
      fill="#fbbf24"
      rx="2"
      style={{ animation: 'stepSlideD 2s ease-in-out infinite' }}
    />
    <rect
      x="83"
      y="28"
      width="14"
      height="8"
      fill="#fbbf24"
      rx="2"
      style={{ animation: 'stepSlideD 2s ease-in-out infinite' }}
    />
    <circle cx="70" cy="36" r="3" fill="#1e293b" />
    <circle cx="90" cy="36" r="3" fill="#1e293b" />
    {/* Yawning mouth */}
    <ellipse cx="80" cy="50" rx="8" ry="5" fill="#92400e" />
    {/* Zzz */}
    <text x="115" y="22" fill="#94a3b8" fontSize="10" opacity="0.6" className="anim-smoke">
      z
    </text>
    <text
      x="125"
      y="14"
      fill="#94a3b8"
      fontSize="14"
      opacity="0.4"
      className="anim-smoke"
      style={{ animationDelay: '0.4s' }}
    >
      Z
    </text>
    <text x="80" y="80" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">
      辨識疲勞警訊
    </text>
  </svg>
);

const SAParkSleep = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Parking area */}
    <rect x="20" y="45" width="120" height="30" fill="#1e293b" rx="4" />
    {/* Car parked */}
    <g transform="translate(80,55)">
      <rect x="-20" y="-10" width="40" height="18" fill="#475569" rx="3" />
      <rect x="-12" y="-18" width="24" height="11" fill="#374151" rx="2" />
      <ellipse cx="-12" cy="8" rx="5" ry="3" fill="#111" />
      <ellipse cx="12" cy="8" rx="5" ry="3" fill="#111" />
    </g>
    {/* Zzz */}
    <text
      x="105"
      y="30"
      fill="#60a5fa"
      fontSize="12"
      className="anim-smoke"
      style={{ animationDelay: '0s' }}
    >
      z
    </text>
    <text
      x="115"
      y="20"
      fill="#60a5fa"
      fontSize="16"
      className="anim-smoke"
      style={{ animationDelay: '0.3s' }}
    >
      Z
    </text>
    <text
      x="128"
      y="10"
      fill="#60a5fa"
      fontSize="20"
      className="anim-smoke"
      style={{ animationDelay: '0.6s' }}
    >
      Z
    </text>
    {/* P sign */}
    <rect x="25" y="20" width="18" height="22" fill="#3b82f6" rx="3" />
    <text x="34" y="37" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
      P
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="700">
      停車熄火小睡 15～20 分鐘
    </text>
  </svg>
);

const SACoffee = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Coffee cup */}
    <rect x="55" y="30" width="40" height="35" fill="#78716c" rx="4" />
    <rect x="52" y="28" width="46" height="6" fill="#a8a29e" rx="3" />
    <path d="M 95 40 Q 108 42 108 52 Q 108 62 95 60" stroke="#a8a29e" strokeWidth="3" fill="none" />
    {/* Steam */}
    <path
      d="M 68 28 Q 65 18 70 12"
      stroke="#94a3b8"
      strokeWidth="2"
      fill="none"
      opacity="0.5"
      className="anim-smoke"
    />
    <path
      d="M 78 26 Q 75 16 80 10"
      stroke="#94a3b8"
      strokeWidth="2"
      fill="none"
      opacity="0.4"
      className="anim-smoke"
      style={{ animationDelay: '0.3s' }}
    />
    <path
      d="M 88 28 Q 85 18 90 12"
      stroke="#94a3b8"
      strokeWidth="2"
      fill="none"
      opacity="0.5"
      className="anim-smoke"
      style={{ animationDelay: '0.6s' }}
    />
    {/* Coffee liquid */}
    <rect x="57" y="34" width="36" height="14" fill="#92400e" rx="2" />
    <text x="80" y="82" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">
      搭配咖啡因提神（20～30 分鐘生效）
    </text>
  </svg>
);

const SANoGo = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* No driving sign */}
    <circle cx="80" cy="38" r="24" fill="none" stroke="#ef4444" strokeWidth="4" />
    <line x1="63" y1="21" x2="97" y2="55" stroke="#ef4444" strokeWidth="4" />
    {/* Car icon inside */}
    <g transform="translate(80,38)">
      <rect x="-12" y="-6" width="24" height="12" fill="#64748b" rx="2" />
      <rect x="-8" y="-12" width="16" height="8" fill="#475569" rx="1" />
    </g>
    {/* Taxi / ride alternative */}
    <rect x="120" y="28" width="30" height="20" fill="#fbbf24" rx="3" />
    <text x="135" y="42" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="800">
      TAXI
    </text>
    <text x="80" y="80" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
      仍疲倦就改搭車或叫代駕
    </text>
  </svg>
);

// == Hydroplaning ==
const SAWaitTraction = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Tire cross-section */}
    <circle cx="80" cy="38" r="24" fill="#374151" />
    <circle cx="80" cy="38" r="18" fill="#475569" />
    <circle cx="80" cy="38" r="8" fill="#64748b" />
    {/* Water layer underneath */}
    <rect x="40" y="58" width="80" height="8" fill="#60a5fa" opacity="0.4" rx="4" />
    <rect x="50" y="56" width="60" height="6" fill="#93c5fd" opacity="0.3" rx="3" />
    {/* Tread grooves */}
    <line x1="68" y1="18" x2="68" y2="58" stroke="#1e293b" strokeWidth="2" />
    <line x1="80" y1="14" x2="80" y2="62" stroke="#1e293b" strokeWidth="2" />
    <line x1="92" y1="18" x2="92" y2="58" stroke="#1e293b" strokeWidth="2" />
    {/* Speed decreasing arrow */}
    <path d="M 130 20 L 130 55" stroke="#22c55e" strokeWidth="3" />
    <polygon points="124,52 130,60 136,52" fill="#22c55e" />
    <text x="130" y="72" textAnchor="middle" fill="#22c55e" fontSize="7">
      減速中
    </text>
    <text x="60" y="80" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="700">
      等待輪胎恢復抓地力
    </text>
  </svg>
);

const SACheckTires = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Tire */}
    <circle cx="65" cy="40" r="22" fill="#374151" />
    <circle cx="65" cy="40" r="16" fill="#475569" />
    <circle cx="65" cy="40" r="6" fill="#64748b" />
    {/* Tread pattern */}
    {[-15, -5, 5, 15].map((offset) => (
      <line
        key={offset}
        x1={65 + offset}
        y1="20"
        x2={65 + offset}
        y2="60"
        stroke="#1e293b"
        strokeWidth="2.5"
      />
    ))}
    {/* Measurement indicator */}
    <line x1="100" y1="30" x2="100" y2="50" stroke="#f59e0b" strokeWidth="2" />
    <line x1="96" y1="30" x2="104" y2="30" stroke="#f59e0b" strokeWidth="2" />
    <line x1="96" y1="50" x2="104" y2="50" stroke="#f59e0b" strokeWidth="2" />
    <text x="115" y="42" fill="#f59e0b" fontSize="8" fontWeight="700">
      ≥1.6mm
    </text>
    {/* Magnifying glass */}
    <circle cx="125" cy="58" r="10" fill="none" stroke="#94a3b8" strokeWidth="2" />
    <line
      x1="132"
      y1="65"
      x2="140"
      y2="73"
      stroke="#94a3b8"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <text x="80" y="82" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">
      檢查胎紋深度與胎壓
    </text>
  </svg>
);

// == Right Turn Motorcycle ==
const SAHugRight = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Top-down road view */}
    <rect x="0" y="30" width="160" height="50" fill="#2d3748" />
    <line x1="0" y1="55" x2="130" y2="55" stroke="#64748b" strokeWidth="1" strokeDasharray="8,6" />
    {/* Right curb */}
    <rect x="0" y="78" width="160" height="4" fill="#64748b" />
    {/* Car (top-down) moving toward right curb */}
    <g style={{ animation: 'stepSlideR 1.8s ease-in-out infinite' }}>
      <rect x="50" y="62" width="28" height="16" fill="#1d4ed8" rx="3" />
      <rect x="55" y="60" width="18" height="6" fill="#1e40af" rx="1" />
    </g>
    {/* Arrow showing direction */}
    <path d="M 95 70 L 120 70" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
    <polygon points="120,67 126,70 120,73" fill="#22c55e" />
    {/* Gap indicator */}
    <line
      x1="130"
      y1="62"
      x2="130"
      y2="78"
      stroke="#ef4444"
      strokeWidth="1.5"
      strokeDasharray="3,3"
    />
    <text x="143" y="72" textAnchor="middle" fill="#ef4444" fontSize="7">
      縮小
    </text>
    <text x="80" y="86" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">
      靠近路緣，縮小右側空間
    </text>
  </svg>
);

const SALetMotoPass = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road */}
    <rect x="0" y="30" width="160" height="45" fill="#2d3748" />
    <line x1="0" y1="52" x2="160" y2="52" stroke="#64748b" strokeWidth="1" strokeDasharray="8,6" />
    {/* Stopped car */}
    <rect x="12" y="37" width="40" height="22" fill="#1d4ed8" rx="3" />
    <rect x="18" y="30" width="28" height="10" fill="#1e40af" rx="2" />
    {/* Stop hand */}
    <circle cx="32" cy="16" r="10" fill="#ef4444" opacity="0.9" />
    <text x="32" y="20" textAnchor="middle" fill="white" fontSize="12">
      ✋
    </text>
    {/* Motorcycle passing by */}
    <g style={{ animation: 'stepSlideL 1.6s ease-in-out infinite' }}>
      <rect x="98" y="40" width="10" height="16" fill="#f97316" rx="2" />
      <circle cx="103" cy="37" r="4" fill="#fbbf24" />
      <circle cx="97" cy="56" r="3.5" fill="#111" />
      <circle cx="109" cy="56" r="3.5" fill="#111" />
      <circle cx="97" cy="42" r="2.5" fill="#fef9c3" opacity="0.9" />
    </g>
    {/* Arrow showing moto direction */}
    <path d="M 135 48 L 155 48" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
    <polygon points="155,45 160,48 155,51" fill="#f97316" />
    <text x="80" y="84" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
      停車讓機車先通過
    </text>
  </svg>
);

// == Left Turn Oncoming ==
const SAWaitAtCenter = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Intersection (top-down) */}
    <rect x="0" y="30" width="160" height="50" fill="#2d3748" />
    <rect x="60" y="0" width="40" height="90" fill="#2d3748" />
    {/* Center line */}
    <line x1="0" y1="55" x2="60" y2="55" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="8,6" />
    <line
      x1="100"
      y1="55"
      x2="160"
      y2="55"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="8,6"
    />
    {/* Waiting car in center */}
    <rect x="63" y="42" width="28" height="16" fill="#1d4ed8" rx="3" />
    <rect x="68" y="36" width="18" height="8" fill="#1e40af" rx="1" />
    {/* Left signal blinking */}
    <circle cx="62" cy="42" r="4" fill="#f59e0b" className="anim-hazard" />
    {/* Wait indicator */}
    <circle cx="130" cy="18" r="12" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2" />
    <text x="130" y="22" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="900">
      ⏸
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="700">
      停等區耐心等待，不硬衝
    </text>
  </svg>
);

const SAWaitOncoming = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road */}
    <rect x="0" y="32" width="160" height="44" fill="#2d3748" />
    <line
      x1="0"
      y1="54"
      x2="160"
      y2="54"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="8,6"
    />
    {/* Waiting blue car */}
    <rect x="10" y="38" width="38" height="22" fill="#1d4ed8" rx="3" />
    <rect x="16" y="31" width="26" height="10" fill="#1e40af" rx="2" />
    {/* Oncoming cars passing */}
    <g style={{ animation: 'stepSlideL 1.5s ease-in-out infinite' }}>
      <rect x="80" y="57" width="32" height="18" fill="#dc2626" rx="2" />
      <rect x="85" y="50" width="22" height="9" fill="#b91c1c" rx="1" />
      <circle cx="79" cy="59" r="3" fill="#fef9c3" opacity="0.9" />
      <circle cx="79" cy="71" r="3" fill="#fef9c3" opacity="0.9" />
    </g>
    <g style={{ animation: 'stepSlideL 1.5s ease-in-out 0.6s infinite' }}>
      <rect x="115" y="57" width="32" height="18" fill="#7c3aed" rx="2" />
      <rect x="120" y="50" width="22" height="9" fill="#6d28d9" rx="1" />
      <circle cx="114" cy="59" r="3" fill="#fef9c3" opacity="0.9" />
      <circle cx="114" cy="71" r="3" fill="#fef9c3" opacity="0.9" />
    </g>
    {/* Check indicator */}
    <circle cx="130" cy="20" r="12" fill="#15803d" opacity="0.9" />
    <text x="130" y="25" textAnchor="middle" fill="white" fontSize="15" fontWeight="900">
      ✓
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">
      確認對向全部通過後再左轉
    </text>
  </svg>
);

// == cold-weather-cat-check step animations ==

// Step 1: Hand knocking engine hood — vibration waves spread outward
const SAKnockHood = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Car hood top view */}
    <rect x="30" y="30" width="100" height="42" fill="#1d4ed8" rx="6" />
    <rect x="38" y="36" width="84" height="30" fill="#1e40af" rx="4" />
    {/* Hood center line */}
    <line
      x1="80"
      y1="36"
      x2="80"
      y2="66"
      stroke="#2563eb"
      strokeWidth="1.5"
      strokeDasharray="4,3"
    />
    {/* Hand palm hitting hood */}
    <g style={{ animation: 'stepSlideL 1.5s ease-in-out infinite' }}>
      <ellipse cx="80" cy="22" rx="14" ry="9" fill="#fbbf24" opacity="0.9" />
      <text x="80" y="26" textAnchor="middle" fontSize="12">
        ✋
      </text>
    </g>
    {/* Vibration rings */}
    <circle
      cx="80"
      cy="48"
      r="10"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="1.5"
      opacity="0.7"
      style={{ animation: 'stepSlideL 1.5s ease-in-out infinite', animationDelay: '0.2s' }}
    />
    <circle
      cx="80"
      cy="48"
      r="18"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="1"
      opacity="0.45"
      style={{ animation: 'stepSlideL 1.5s ease-in-out infinite', animationDelay: '0.4s' }}
    />
    <circle
      cx="80"
      cy="48"
      r="26"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="0.8"
      opacity="0.25"
      style={{ animation: 'stepSlideL 1.5s ease-in-out infinite', animationDelay: '0.6s' }}
    />
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      拍擊引擎蓋 2-3 下
    </text>
  </svg>
);

// Step 2: Top-down car view with arrow circling the vehicle
const SAWalkAroundCar = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Car top-down silhouette */}
    <rect x="52" y="20" width="56" height="50" fill="#1d4ed8" rx="8" />
    <rect x="60" y="24" width="40" height="16" fill="#bfdbfe" opacity="0.7" rx="2" />
    <rect x="60" y="50" width="40" height="16" fill="#bfdbfe" opacity="0.4" rx="2" />
    {/* Wheels */}
    <ellipse cx="56" cy="30" rx="5" ry="7" fill="#111827" />
    <ellipse cx="104" cy="30" rx="5" ry="7" fill="#111827" />
    <ellipse cx="56" cy="60" rx="5" ry="7" fill="#111827" />
    <ellipse cx="104" cy="60" rx="5" ry="7" fill="#111827" />
    {/* Walking person icon going around */}
    <g style={{ animation: 'stepSlideL 2s linear infinite' }}>
      <circle cx="80" cy="9" r="5" fill="#4ade80" />
      <text x="80" y="12" textAnchor="middle" fontSize="7" fill="white">
        人
      </text>
    </g>
    {/* Arrow path around car */}
    <path
      d="M80,10 A44,36 0 1,1 79,10"
      fill="none"
      stroke="#4ade80"
      strokeWidth="1.5"
      strokeDasharray="8,4"
      strokeLinecap="round"
    />
    <polygon points="80,10 76,14 84,14" fill="#4ade80" />
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      繞車一圈查看輪弧
    </text>
  </svg>
);

// Step 3: Honk alert inside car — sound waves toward running cat
const SAHonkAlert = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Steering wheel */}
    <circle cx="50" cy="50" r="22" fill="none" stroke="#475569" strokeWidth="4" />
    <circle cx="50" cy="50" r="10" fill="#374151" />
    <line x1="50" y1="28" x2="50" y2="40" stroke="#475569" strokeWidth="3" />
    <line x1="50" y1="60" x2="50" y2="72" stroke="#475569" strokeWidth="3" />
    <line x1="28" y1="50" x2="40" y2="50" stroke="#475569" strokeWidth="3" />
    <line x1="60" y1="50" x2="72" y2="50" stroke="#475569" strokeWidth="3" />
    {/* Horn button flash */}
    <circle cx="50" cy="50" r="8" fill="#f59e0b" className="anim-hazard" />
    <text x="50" y="53" textAnchor="middle" fill="#111827" fontSize="8" fontWeight="900">
      📯
    </text>
    {/* Sound waves */}
    <path
      d="M74,42 Q82,50 74,58"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ animation: 'stepSlideL 1.2s ease-in-out infinite' }}
    />
    <path
      d="M80,38 Q92,50 80,62"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{ animation: 'stepSlideL 1.2s ease-in-out infinite', animationDelay: '0.2s' }}
    />
    <path
      d="M86,34 Q102,50 86,66"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="1"
      strokeLinecap="round"
      style={{ animation: 'stepSlideL 1.2s ease-in-out infinite', animationDelay: '0.4s' }}
    />
    {/* Running cat escaping */}
    <g style={{ animation: 'stepSlideR 1.5s ease-in-out infinite' }}>
      <text x="132" y="55" fontSize="18">
        🐱
      </text>
      <text x="122" y="46" textAnchor="middle" fill="#4ade80" fontSize="8">
        逃！
      </text>
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      短促喇叭，等待 10 秒
    </text>
  </svg>
);

// Step 4: Idle engine — exhaust, RPM gauge, waiting
const SAIdleEngine = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Car side view */}
    <rect x="20" y="40" width="80" height="28" fill="#1d4ed8" rx="4" />
    <path d="M30 40 Q36 28 46 28 L80 28 Q92 28 96 40Z" fill="#1e40af" />
    <rect x="38" y="30" width="20" height="10" fill="#bfdbfe" opacity="0.7" rx="1" />
    <rect x="62" y="30" width="22" height="10" fill="#bfdbfe" opacity="0.5" rx="1" />
    {/* Wheels */}
    <circle cx="42" cy="68" r="10" fill="#111827" />
    <circle cx="42" cy="68" r="5" fill="#334155" />
    <circle cx="82" cy="68" r="10" fill="#111827" />
    <circle cx="82" cy="68" r="5" fill="#334155" />
    {/* Exhaust smoke puffs */}
    <circle
      cx="18"
      cy="62"
      r="5"
      fill="#475569"
      opacity="0.6"
      style={{ animation: 'stepSlideL 2s ease-in-out infinite' }}
    />
    <circle
      cx="11"
      cy="56"
      r="4"
      fill="#475569"
      opacity="0.4"
      style={{ animation: 'stepSlideL 2s ease-in-out infinite', animationDelay: '0.5s' }}
    />
    <circle
      cx="6"
      cy="50"
      r="3"
      fill="#475569"
      opacity="0.25"
      style={{ animation: 'stepSlideL 2s ease-in-out infinite', animationDelay: '1s' }}
    />
    {/* RPM gauge */}
    <circle cx="128" cy="42" r="20" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
    <text x="128" y="36" textAnchor="middle" fill="#64748b" fontSize="7">
      RPM
    </text>
    <path
      d="M128,42 L128,26"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ transformOrigin: '128px 42px', transform: 'rotate(10deg)' }}
    />
    <text x="128" y="52" textAnchor="middle" fill="#22c55e" fontSize="8">
      怠速
    </text>
    {/* Timer */}
    <text x="128" y="68" textAnchor="middle" fill="#fbbf24" fontSize="9">
      ⏱ 15s
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      原地怠速，聆聽異聲
    </text>
  </svg>
);

// Step 5: Prevention — water bottles as obstacles near car front
const SAColdPrevention = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Ground */}
    <rect x="0" y="60" width="160" height="30" fill="#1c2533" />
    {/* Car front */}
    <rect x="60" y="28" width="80" height="34" fill="#1d4ed8" rx="4" />
    <rect x="68" y="22" width="54" height="16" fill="#1e40af" rx="3" />
    <rect x="76" y="24" width="18" height="12" fill="#bfdbfe" opacity="0.7" rx="1" />
    <rect x="98" y="24" width="18" height="12" fill="#bfdbfe" opacity="0.5" rx="1" />
    <rect x="136" y="33" width="6" height="10" fill="#fbbf24" rx="1" />
    {/* Front wheel */}
    <ellipse cx="80" cy="62" rx="12" ry="10" fill="#111827" />
    <ellipse cx="80" cy="62" rx="6" ry="5" fill="#334155" />
    {/* Water bottle obstacles placed in front */}
    <rect x="16" y="46" width="8" height="16" fill="#bfdbfe" rx="3" opacity="0.85" />
    <ellipse cx="20" cy="46" rx="4" ry="2.5" fill="#93c5fd" opacity="0.7" />
    <rect x="28" y="46" width="8" height="16" fill="#bfdbfe" rx="3" opacity="0.85" />
    <ellipse cx="32" cy="46" rx="4" ry="2.5" fill="#93c5fd" opacity="0.7" />
    <rect x="40" y="46" width="8" height="16" fill="#bfdbfe" rx="3" opacity="0.85" />
    <ellipse cx="44" cy="46" rx="4" ry="2.5" fill="#93c5fd" opacity="0.7" />
    {/* Cat sees bottles and avoids */}
    <text x="20" y="42" textAnchor="middle" fontSize="12">
      🐱
    </text>
    <text x="50" y="42" textAnchor="middle" fill="#ef4444" fontSize="10">
      ✗
    </text>
    {/* Arrow showing cat turns away */}
    <path
      d="M26,34 Q10,28 6,18"
      fill="none"
      stroke="#4ade80"
      strokeWidth="1.5"
      strokeDasharray="3,2"
      strokeLinecap="round"
    />
    <polygon points="6,18 2,24 10,22" fill="#4ade80" />
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      放置保特瓶預防貓躲入
    </text>
  </svg>
);

// Step 6: Phone call to animal services — phone with cat paw icon
const SACallAnimalService = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Phone */}
    <rect
      x="52"
      y="14"
      width="36"
      height="58"
      fill="#1e293b"
      rx="6"
      stroke="#334155"
      strokeWidth="1.5"
    />
    <rect x="56" y="20" width="28" height="36" fill="#0f172a" rx="2" />
    <circle cx="70" cy="64" r="4" fill="#334155" />
    {/* Phone screen showing animal service */}
    <text x="70" y="35" textAnchor="middle" fill="#4ade80" fontSize="10">
      1999
    </text>
    <text x="70" y="46" textAnchor="middle" fill="#94a3b8" fontSize="7">
      動保服務
    </text>
    {/* Ringing waves */}
    <path
      d="M90,28 Q98,36 90,44"
      fill="none"
      stroke="#4ade80"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{ animation: 'stepSlideL 1.2s ease-in-out infinite' }}
    />
    <path
      d="M95,23 Q107,36 95,49"
      fill="none"
      stroke="#4ade80"
      strokeWidth="1"
      strokeLinecap="round"
      style={{ animation: 'stepSlideL 1.2s ease-in-out infinite', animationDelay: '0.2s' }}
    />
    {/* Cat paw icon */}
    <text x="118" y="42" textAnchor="middle" fontSize="22">
      🐾
    </text>
    {/* Text */}
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      撥打 1999 動保單位協助
    </text>
  </svg>
);

// == wildlife-road step animations ==

// Step 1: Animal warning sign, speedometer dropping 60→30
const SAAnimalSignSlowdown = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Warning sign */}
    <rect x="6" y="56" width="4" height="28" fill="#64748b" />
    <polygon points="8,20 30,56 -14,56" fill="#fbbf24" transform="translate(8,0)" />
    <text x="16" y="46" textAnchor="middle" fontSize="14">
      🦌
    </text>
    {/* Speed gauge */}
    <circle cx="102" cy="45" r="32" fill="#1e293b" stroke="#334155" strokeWidth="2" />
    <text x="102" y="30" textAnchor="middle" fill="#64748b" fontSize="8">
      km/h
    </text>
    {/* From 60 marker */}
    <text x="78" y="52" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700">
      60
    </text>
    {/* Arrow down to 30 */}
    <path d="M86,48 L94,56" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
    <polygon points="94,56 88,54 96,50" fill="#fbbf24" />
    {/* To 30 marker */}
    <text x="112" y="62" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="700">
      30
    </text>
    {/* Needle pointing to low speed */}
    <line
      x1="102"
      y1="45"
      x2="118"
      y2="58"
      stroke="#4ade80"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="102" cy="45" r="3" fill="#4ade80" />
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      看到標誌立即降速至 30
    </text>
  </svg>
);

// Step 2: Two-panel comparison — high beam (animal frozen) vs low beam (animal passing)
const SALowBeamSwitch = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Divider */}
    <line x1="80" y1="4" x2="80" y2="78" stroke="#334155" strokeWidth="1.5" strokeDasharray="4,3" />
    {/* Left panel: high beam — animal glowing eyes frozen */}
    <text x="40" y="14" textAnchor="middle" fill="#ef4444" fontSize="7">
      遠光燈
    </text>
    {/* Beam spread */}
    <polygon points="20,38 0,18 0,58" fill="#fef9c3" opacity="0.18" />
    <circle cx="20" cy="38" r="5" fill="#fef9c3" opacity="0.8" />
    {/* Frozen animal with glowing eyes */}
    <ellipse cx="52" cy="44" rx="8" ry="6" fill="#374151" />
    <circle cx="52" cy="36" r="5" fill="#374151" />
    <circle cx="49" cy="35" r="2.5" fill="#fef08a" className="anim-head-glow" />
    <circle cx="55" cy="35" r="2.5" fill="#fef08a" className="anim-head-glow" />
    <text x="52" y="60" textAnchor="middle" fill="#ef4444" fontSize="8">
      僵住！
    </text>
    <text x="40" y="72" textAnchor="middle" fill="#ef4444" fontSize="7">
      ✗ 危險
    </text>
    {/* Right panel: low beam — animal walks safely */}
    <text x="120" y="14" textAnchor="middle" fill="#4ade80" fontSize="7">
      近光燈
    </text>
    {/* Narrow beam */}
    <polygon points="100,42 84,34 84,50" fill="#fef9c3" opacity="0.12" />
    <circle cx="100" cy="42" r="4" fill="#fef9c3" opacity="0.6" />
    {/* Moving animal */}
    <g style={{ animation: 'stepSlideR 2s ease-in-out infinite' }}>
      <ellipse cx="136" cy="46" rx="8" ry="6" fill="#374151" />
      <circle cx="136" cy="38" r="5" fill="#374151" />
      <circle cx="133" cy="37" r="1.8" fill="#6b7280" />
      <circle cx="139" cy="37" r="1.8" fill="#6b7280" />
    </g>
    <text x="120" y="72" textAnchor="middle" fill="#4ade80" fontSize="7">
      ✓ 安全
    </text>
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      夜間切換近光燈
    </text>
  </svg>
);

// Step 3: Top-down road, car braking, animal in front
const SABrakeForAnimal = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road */}
    <rect x="30" y="0" width="100" height="90" fill="#2d3748" />
    <line
      x1="80"
      y1="0"
      x2="80"
      y2="90"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="10,8"
    />
    {/* Car top-down */}
    <rect x="58" y="48" width="44" height="28" fill="#1d4ed8" rx="5" />
    <rect x="64" y="42" width="32" height="10" fill="#1e40af" rx="3" />
    {/* Brake marks */}
    <line
      x1="64"
      y1="76"
      x2="62"
      y2="88"
      stroke="#ef4444"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="96"
      y1="76"
      x2="98"
      y2="88"
      stroke="#ef4444"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Animal ahead */}
    <text x="80" y="32" textAnchor="middle" fontSize="16">
      🦔
    </text>
    {/* Warning triangle */}
    <g className="anim-hazard" style={{ transformOrigin: '80px 20px' }}>
      <polygon points="80,10 88,24 72,24" fill="#ef4444" opacity="0.8" />
      <text x="80" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="900">
        !
      </text>
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      穩踩煞車，握穩方向盤
    </text>
  </svg>
);

// Step 4: Side-view car, short sound wave, animal turning away
const SAShortHonkAnimal = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road */}
    <rect x="0" y="54" width="160" height="20" fill="#2d3748" />
    <line x1="0" y1="54" x2="160" y2="54" stroke="#475569" strokeWidth="1" />
    {/* Car side */}
    <rect x="10" y="36" width="60" height="20" fill="#1d4ed8" rx="4" />
    <path d="M18 36 Q24 24 32 24 L56 24 Q64 24 68 36Z" fill="#1e40af" />
    <rect x="28" y="26" width="16" height="10" fill="#bfdbfe" opacity="0.7" rx="1" />
    <rect x="46" y="26" width="16" height="10" fill="#bfdbfe" opacity="0.5" rx="1" />
    <circle cx="26" cy="56" r="8" fill="#111827" />
    <circle cx="26" cy="56" r="4" fill="#334155" />
    <circle cx="58" cy="56" r="8" fill="#111827" />
    <circle cx="58" cy="56" r="4" fill="#334155" />
    {/* Horn sound waves (short) */}
    <path
      d="M72,44 Q80,48 72,52"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ animation: 'stepSlideL 1s ease-in-out infinite' }}
    />
    <path
      d="M78,40 Q90,48 78,56"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{ animation: 'stepSlideL 1s ease-in-out infinite', animationDelay: '0.15s' }}
    />
    {/* Animal turning away */}
    <g style={{ animation: 'stepSlideR 2s ease-in-out infinite' }}>
      <text x="118" y="54" textAnchor="middle" fontSize="16">
        🦔
      </text>
      <text x="130" y="42" textAnchor="middle" fill="#4ade80" fontSize="8">
        離開
      </text>
      <path
        d="M118,40 Q132,32 140,24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="1.5"
        strokeDasharray="3,2"
        strokeLinecap="round"
      />
      <polygon points="140,24 136,30 144,28" fill="#4ade80" />
    </g>
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      短促鳴笛，等動物自行離開
    </text>
  </svg>
);

// Step 5: Car stopped, animal walking from road to roadside grass
const SAWaitAnimalCross = () => (
  <svg className="anim-svg" viewBox="0 0 160 90" width="100%" height="100%">
    <rect width="160" height="90" fill="#0f172a" rx="8" />
    {/* Road */}
    <rect x="20" y="30" width="120" height="36" fill="#2d3748" />
    <line x1="20" y1="30" x2="140" y2="30" stroke="#475569" strokeWidth="1.5" />
    <line x1="20" y1="66" x2="140" y2="66" stroke="#475569" strokeWidth="1.5" />
    {/* Center dashes */}
    <line
      x1="20"
      y1="48"
      x2="140"
      y2="48"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="14,10"
    />
    {/* Grass on right side */}
    <rect x="140" y="30" width="20" height="36" fill="#14532d" />
    <text x="150" y="50" textAnchor="middle" fontSize="10">
      🌿
    </text>
    {/* Car stopped on left */}
    <rect x="24" y="36" width="46" height="22" fill="#1d4ed8" rx="4" />
    <rect x="30" y="30" width="32" height="10" fill="#1e40af" rx="2" />
    <circle cx="34" cy="58" r="7" fill="#111827" />
    <circle cx="34" cy="58" r="3.5" fill="#334155" />
    <circle cx="60" cy="58" r="7" fill="#111827" />
    <circle cx="60" cy="58" r="3.5" fill="#334155" />
    {/* Stop indicator */}
    <circle cx="24" cy="42" r="5" fill="#ef4444" opacity="0.8" />
    <text x="24" y="45" textAnchor="middle" fill="white" fontSize="7" fontWeight="900">
      ✋
    </text>
    {/* Animal walking from road to grass */}
    <g style={{ animation: 'stepSlideR 3s linear infinite' }}>
      <text x="110" y="54" textAnchor="middle" fontSize="14">
        🦔
      </text>
    </g>
    {/* Path arrow */}
    <path
      d="M86,48 Q110,48 138,48"
      fill="none"
      stroke="#4ade80"
      strokeWidth="1.5"
      strokeDasharray="5,3"
      strokeLinecap="round"
    />
    <polygon points="138,48 132,44 132,52" fill="#4ade80" />
    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="8">
      耐心等待，確認動物離開後通過
    </text>
  </svg>
);

export const STEP_ANIMS: Partial<Record<ScenarioId, (React.FC | null)[]>> = {
  'highway-breakdown': [
    SAHazardFlash,
    SACarToShoulder,
    SATriangle,
    SAPersonCross,
    SAPhoneCall,
    SAHazardFlash,
  ],
  'tire-blowout': [
    SASteeringGrip,
    SALiftFoot,
    SAHazardFlash,
    SACarToShoulder,
    SATriangle,
    SAPhoneCall,
  ],
  'heavy-rain-fog': [SAFogLights, SASpeedDrop, SACarGap, SAHazardFlash, SAPullOver, null],
  'rear-end-collision': [
    SACheckInjury,
    SAHazardFlash,
    SACamera,
    SACarToShoulder,
    SADataExchange,
    SAPhoneCall110,
    SAPhoneCallInsurance,
  ],
  'brake-failure': [
    SAStayCalm,
    SABrakePump,
    SAGearDown,
    SAHornHazard,
    SASafeSpot,
    SAHandbrake,
    SAPhoneCall,
  ],
  'narrow-road': [
    SANarrowSlowDown,
    SANarrowPullRight,
    SANarrowYield,
    SANarrowReverse,
    SANarrowPass,
  ],
  'intersection-crash': [
    SALookBothWays,
    SABrakeStop,
    SAHornHazard,
    SAHazardFlash,
    SACamera,
    SAPhoneCall110,
  ],
  'scooter-weaving': [
    SACheckMirror,
    SASignalEarly,
    SASpeedDrop,
    SABrakeStop,
    SAHornHazard,
    SACheckAndTurn,
  ],
  'drowsy-driving': [SAFatigueSign, SAHazardFlash, SAPullOver, SAParkSleep, SACoffee, SANoGo],
  'right-turn-motorcycle': [
    SASignalEarly,
    SAHugRight,
    SACheckMirror,
    SALetMotoPass,
    SACheckAndTurn,
    SACrosswalkWatch,
  ],
  'left-turn-oncoming': [
    SASignalEarly,
    SAWaitAtCenter,
    SAWaitOncoming,
    SACrosswalkWatch,
    SACheckAndTurn,
    SALookBothWays,
  ],
  hydroplaning: [
    SALiftFoot,
    SASteeringGrip,
    SAWaitTraction,
    SAHazardFlash,
    SAPullOver,
    SACheckTires,
  ],
  'cold-weather-cat-check': [
    SAKnockHood,
    SAWalkAroundCar,
    SAHonkAlert,
    SAIdleEngine,
    SAColdPrevention,
    SACallAnimalService,
  ],
  'wildlife-road': [
    SAAnimalSignSlowdown,
    SALowBeamSwitch,
    SABrakeForAnimal,
    SAShortHonkAnimal,
    SAWaitAnimalCross,
  ],
};
