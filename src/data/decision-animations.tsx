import type { ScenarioId } from '../types/scenario';

interface DAProps {
  showConsequence?: boolean;
}

// == Highway Breakdown ==
const DA_HB_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="52" width="160" height="40" fill="#1e293b" />
    <line x1="0" y1="72" x2="160" y2="72" stroke="#334155" strokeWidth="1" strokeDasharray="10,8" />
    <g style={{ animation: 'stepSlideR 1.2s ease-in-out infinite' }}>
      <rect x="8" y="58" width="38" height="22" fill="#1d4ed8" rx="2" />
      <rect x="14" y="50" width="26" height="14" fill="#1e40af" rx="2" />
      <circle cx="42" cy="60" r="3.5" fill="#fef3c7" opacity="0.9" />
      <circle cx="42" cy="72" r="3.5" fill="#fef3c7" opacity="0.9" />
    </g>
    <rect x="100" y="55" width="48" height="28" fill="#dc2626" rx="3" />
    <rect x="108" y="46" width="32" height="16" fill="#b91c1c" rx="2" />
    <circle cx="96" cy="60" r="5.5" fill="#fbbf24" />
    <rect x="93" y="65" width="6" height="14" fill="#3b82f6" rx="1" />
    <line x1="93" y1="68" x2="88" y2="75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
    <line x1="99" y1="68" x2="104" y2="75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
    {showConsequence && (
      <>
        <text x="80" y="20" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          ⚠ 高速車道下車
        </text>
        <text x="80" y="34" textAnchor="middle" fill="#f87171" fontSize="8">
          後車無法及時煞停
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          被後車撞擊風險極高
        </text>
      </>
    )}
  </svg>
);
const DA_HB_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    <line
      x1="0"
      y1="70"
      x2="160"
      y2="70"
      stroke="#334155"
      strokeWidth="1.5"
      strokeDasharray="10,8"
    />
    <rect x="124" y="48" width="36" height="44" fill="#252f3f" />
    <line x1="124" y1="48" x2="124" y2="92" stroke="#fbbf24" strokeWidth="1.5" />
    <g transform="translate(138,68)">
      <rect x="-16" y="-14" width="32" height="22" fill="#dc2626" rx="3" />
      <rect x="-10" y="-22" width="20" height="12" fill="#b91c1c" rx="2" />
      <circle cx="-13" cy="-12" r="4" fill="#f59e0b" className="anim-hazard" />
      <circle cx="13" cy="-12" r="4" fill="#f59e0b" className="anim-hazard" />
      <circle cx="-13" cy="7" r="4" fill="#f59e0b" className="anim-hazard" />
      <circle cx="13" cy="7" r="4" fill="#f59e0b" className="anim-hazard" />
    </g>
    <path
      d="M 78 68 Q 108 62 120 66"
      stroke={showConsequence ? '#4ade80' : '#94a3b8'}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <polygon points="118,61 122,66 117,70" fill={showConsequence ? '#4ade80' : '#94a3b8'} />
    {showConsequence && (
      <>
        <circle cx="22" cy="24" r="14" fill="#15803d" opacity="0.9" />
        <text x="22" y="29" textAnchor="middle" fill="white" fontSize="15" fontWeight="900">
          ✓
        </text>
        <text x="96" y="22" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          開雙黃燈
        </text>
        <text x="96" y="34" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          移至路肩
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          最正確的第一步
        </text>
      </>
    )}
  </svg>
);
const DA_HB_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    <line x1="0" y1="70" x2="160" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="10,8" />
    <g transform="translate(100,67)">
      <rect x="-24" y="-16" width="48" height="26" fill="#dc2626" rx="3" />
      <rect x="-18" y="-24" width="36" height="14" fill="#b91c1c" rx="2" />
      <rect x="-16" y="-22" width="11" height="9" fill="#bfdbfe" rx="1" />
      <rect x="5" y="-22" width="11" height="9" fill="#bfdbfe" rx="1" />
      <rect
        x="3"
        y="-21"
        width="8"
        height="7"
        fill="#22c55e"
        rx="1"
        opacity="0.8"
        style={{ animation: 'hazard 1.2s ease-in-out infinite' }}
      />
    </g>
    {showConsequence && (
      <text x="100" y="40" textAnchor="middle" fill="#ef4444" fontSize="8">
        🚫 沒開雙黃燈
      </text>
    )}
    <g transform="translate(46,67)">
      <rect x="-18" y="-12" width="36" height="20" fill="#475569" rx="2" />
      <rect x="-12" y="-19" width="24" height="11" fill="#374151" rx="2" />
      <circle cx="-14" cy="-10" r="3" fill="#ef4444" />
      <circle cx="14" cy="-10" r="3" fill="#ef4444" />
    </g>
    <g transform="translate(14,67)">
      <rect x="-10" y="-9" width="20" height="16" fill="#334155" rx="2" />
    </g>
    {showConsequence && (
      <>
        <text x="80" y="20" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          停在車道打電話
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          暴露在高速車流中
        </text>
      </>
    )}
  </svg>
);

// == Tire Blowout ==
const DA_TB_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="50" width="160" height="42" fill="#1e293b" />
    <path d="M 8 74 Q 58 67 90 70" stroke="#111" strokeWidth="5" fill="none" opacity="0.8" />
    <path d="M 8 80 Q 58 73 90 76" stroke="#111" strokeWidth="4" fill="none" opacity="0.6" />
    <g transform="translate(114,67) rotate(22)">
      <rect x="-24" y="-14" width="48" height="26" fill="#7c3aed" rx="3" />
      <rect x="-18" y="-24" width="36" height="14" fill="#6d28d9" rx="2" />
      <circle cx="-20" cy="12" r="6" fill="#111" stroke="#ef4444" strokeWidth="1.5" />
      <circle cx="20" cy="12" r="6" fill="#111" stroke="#ef4444" strokeWidth="1.5" />
    </g>
    <text x="36" y="32" textAnchor="middle" fontSize="22">
      🦶
    </text>
    <text
      x="36"
      y="20"
      textAnchor="middle"
      fill={showConsequence ? '#ef4444' : '#94a3b8'}
      fontSize="20"
    >
      ↓
    </text>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          急踩煞車
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          後輪鎖死，車輛甩尾失控
        </text>
      </>
    )}
  </svg>
);
const DA_TB_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <circle cx="72" cy="54" r="28" fill="none" stroke="#4b5563" strokeWidth="7" />
    <circle cx="72" cy="54" r="9" fill="#374151" stroke="#4b5563" strokeWidth="3" />
    <line x1="72" y1="45" x2="72" y2="28" stroke="#4b5563" strokeWidth="5" strokeLinecap="round" />
    <line x1="65" y1="58" x2="55" y2="72" stroke="#4b5563" strokeWidth="5" strokeLinecap="round" />
    <line x1="79" y1="58" x2="89" y2="72" stroke="#4b5563" strokeWidth="5" strokeLinecap="round" />
    <g
      style={{ animation: 'stepGripPulse 1.4s ease-in-out infinite', transformOrigin: '46px 54px' }}
    >
      <circle cx="46" cy="54" r="11" fill="#92400e" opacity="0.8" />
      <text x="46" y="58" textAnchor="middle" fontSize="13">
        ✊
      </text>
    </g>
    <g
      style={{
        animation: 'stepGripPulse 1.4s ease-in-out 0.7s infinite',
        transformOrigin: '98px 54px',
      }}
    >
      <circle cx="98" cy="54" r="11" fill="#92400e" opacity="0.8" />
      <text x="98" y="58" textAnchor="middle" fontSize="13">
        ✊
      </text>
    </g>
    <rect
      x="118"
      y="62"
      width="30"
      height="18"
      fill="#374151"
      rx="3"
      stroke="#475569"
      strokeWidth="1.5"
    />
    <text x="133" y="74" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="700">
      油門
    </text>
    <g style={{ animation: 'stepFootLift 2s ease-in-out infinite', transformOrigin: '133px 52px' }}>
      <text x="133" y="56" textAnchor="middle" fontSize="15">
        🦶
      </text>
    </g>
    <text
      x="133"
      y="46"
      textAnchor="middle"
      fill={showConsequence ? '#4ade80' : '#94a3b8'}
      fontSize="7"
    >
      慢放開
    </text>
    {showConsequence && (
      <>
        <circle cx="20" cy="18" r="11" fill="#15803d" />
        <text x="20" y="22" textAnchor="middle" fill="white" fontSize="12" fontWeight="900">
          ✓
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          緊握方向盤＋自然減速
        </text>
      </>
    )}
  </svg>
);
const DA_TB_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    <line
      x1="0"
      y1="70"
      x2="160"
      y2="70"
      stroke="#334155"
      strokeWidth="1.5"
      strokeDasharray="10,8"
    />
    <g transform="translate(92,67) rotate(-32)" className="anim-wobble">
      <rect x="-24" y="-14" width="48" height="26" fill="#7c3aed" rx="3" />
      <rect x="-18" y="-24" width="36" height="14" fill="#6d28d9" rx="2" />
    </g>
    <path
      d="M 40 68 Q 60 52 80 62 Q 100 72 118 50"
      stroke={showConsequence ? '#ef4444' : '#94a3b8'}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="5,3"
    />
    <circle
      cx="30"
      cy="28"
      r="18"
      fill="none"
      stroke="#4b5563"
      strokeWidth="5"
      transform="rotate(45,30,28)"
    />
    <circle cx="30" cy="28" r="6" fill="#374151" stroke="#4b5563" strokeWidth="3" />
    {showConsequence && (
      <>
        <text x="30" y="12" textAnchor="middle" fill="#ef4444" fontSize="9">
          猛打↺
        </text>
        <text x="104" y="22" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          猛打方向盤
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          車尾甩出，極易翻覆
        </text>
      </>
    )}
  </svg>
);

// == Heavy Rain / Fog ==
const DA_HF_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#1e293b" />
    <rect x="0" y="54" width="160" height="38" fill="#374151" />
    <rect width="160" height="100" fill="#94a3b8" opacity="0.28" className="anim-fog" />
    <line x1="0" y1="64" x2="38" y2="64" stroke="#f59e0b" strokeWidth="2.5" opacity="0.7" />
    <line x1="0" y1="74" x2="46" y2="74" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
    <line x1="0" y1="84" x2="28" y2="84" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" />
    <g transform="translate(104,72)">
      <rect x="-28" y="-16" width="56" height="26" fill="#065f46" rx="3" />
      <rect x="-20" y="-26" width="40" height="14" fill="#047857" rx="2" />
      <circle cx="-24" cy="-14" r="4" fill="#fef9c3" opacity="0.9" />
      <circle cx="24" cy="-14" r="4" fill="#fef9c3" opacity="0.9" />
    </g>
    <text
      x="30"
      y="28"
      textAnchor="middle"
      fill={showConsequence ? '#ef4444' : '#94a3b8'}
      fontSize="18"
      fontWeight="900"
    >
      100
    </text>
    <text
      x="30"
      y="42"
      textAnchor="middle"
      fill={showConsequence ? '#ef4444' : '#94a3b8'}
      fontSize="9"
    >
      km/h
    </text>
    {showConsequence && (
      <>
        <text x="104" y="20" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800">
          霧中仍高速行駛
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          完全沒有反應時間
        </text>
      </>
    )}
  </svg>
);
const DA_HF_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#1e293b" />
    <rect x="0" y="54" width="160" height="38" fill="#374151" />
    <rect width="160" height="100" fill="#94a3b8" opacity="0.18" className="anim-fog" />
    <g transform="translate(26,72)">
      <rect x="-14" y="-10" width="28" height="18" fill="#1d4ed8" rx="2" />
      <circle cx="-11" cy="8" r="2.5" fill="#ef4444" />
      <circle cx="11" cy="8" r="2.5" fill="#ef4444" />
    </g>
    <line
      x1="42"
      y1="72"
      x2="90"
      y2="72"
      stroke={showConsequence ? '#4ade80' : '#94a3b8'}
      strokeWidth="1.5"
      strokeDasharray="5,4"
    />
    <text
      x="66"
      y="66"
      textAnchor="middle"
      fill={showConsequence ? '#4ade80' : '#94a3b8'}
      fontSize="8"
      fontWeight="700"
    >
      大車距
    </text>
    <g transform="translate(120,72)">
      <rect x="-24" y="-16" width="48" height="28" fill="#065f46" rx="3" />
      <rect x="-18" y="-26" width="36" height="14" fill="#047857" rx="2" />
      <circle cx="-20" cy="11" r="4.5" fill="#fbbf24" opacity="0.9" />
      <circle cx="20" cy="11" r="4.5" fill="#fbbf24" opacity="0.9" />
    </g>
    <text
      x="28"
      y="26"
      textAnchor="middle"
      fill={showConsequence ? '#4ade80' : '#94a3b8'}
      fontSize="18"
      fontWeight="900"
    >
      40
    </text>
    <text
      x="28"
      y="40"
      textAnchor="middle"
      fill={showConsequence ? '#4ade80' : '#94a3b8'}
      fontSize="8"
    >
      km/h ↓
    </text>
    {showConsequence && (
      <>
        <circle cx="142" cy="18" r="11" fill="#15803d" />
        <text x="142" y="22" textAnchor="middle" fill="white" fontSize="12" fontWeight="900">
          ✓
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          霧燈＋降速＋大車距
        </text>
      </>
    )}
  </svg>
);
const DA_HF_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#1e293b" />
    <rect x="0" y="54" width="160" height="38" fill="#374151" />
    <g transform="translate(106,74)">
      <rect x="-26" y="-16" width="52" height="28" fill="#065f46" rx="3" />
      <rect x="-20" y="-26" width="40" height="14" fill="#047857" rx="2" />
      <circle cx="-22" cy="-14" r="5" fill="#fef9c3" opacity="1" />
      <circle cx="22" cy="-14" r="5" fill="#fef9c3" opacity="1" />
    </g>
    <path d="M 80 58 L 18 42 L 18 76 Z" fill="#fef9c3" opacity="0.18" className="anim-fog" />
    <path d="M 80 58 L 10 30 L 10 86 Z" fill="#fef9c3" opacity="0.1" className="anim-fog" />
    <rect x="6" y="30" width="58" height="50" fill="#e2e8f0" opacity="0.25" className="anim-fog" />
    {showConsequence && (
      <>
        <text x="36" y="62" textAnchor="middle" fill="#ef4444" fontSize="26" fontWeight="900">
          ✗
        </text>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800">
          遠光燈被霧氣反射
        </text>
        <text x="80" y="32" textAnchor="middle" fill="#fbbf24" fontSize="8">
          形成「光牆」更看不清
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          能見度反而更差
        </text>
      </>
    )}
  </svg>
);

// == Rear-End Collision ==
const DA_RE_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="50" width="160" height="42" fill="#1e293b" />
    <line
      x1="0"
      y1="71"
      x2="160"
      y2="71"
      stroke="#334155"
      strokeWidth="1.5"
      strokeDasharray="10,8"
    />
    <g transform="translate(52,63)">
      <rect x="-18" y="-12" width="36" height="20" fill="#1d4ed8" rx="2" />
      <rect x="-12" y="-19" width="24" height="11" fill="#1e40af" rx="2" />
    </g>
    <g transform="translate(104,63)">
      <rect x="-18" y="-12" width="36" height="20" fill="#dc2626" rx="2" />
      <rect x="-12" y="-19" width="24" height="11" fill="#b91c1c" rx="2" />
    </g>
    <circle cx="72" cy="43" r="5" fill="#fbbf24" />
    <rect x="69" y="48" width="6" height="13" fill="#1d4ed8" rx="1" />
    <circle cx="88" cy="43" r="5" fill="#fbbf24" />
    <rect x="85" y="48" width="6" height="13" fill="#dc2626" rx="1" />
    <line x1="74" y1="51" x2="86" y2="48" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
    <line x1="86" y1="51" x2="74" y2="48" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
    <g style={{ animation: 'stepSlideR 1.5s ease-in-out infinite' }}>
      <rect x="4" y="58" width="28" height="16" fill="#475569" rx="2" />
      <circle cx="28" cy="60" r="3" fill="#fef9c3" opacity="0.8" />
      <circle cx="28" cy="70" r="3" fill="#fef9c3" opacity="0.8" />
    </g>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800">
          車道上爭執
        </text>
        <text x="80" y="30" textAnchor="middle" fill="#f87171" fontSize="8">
          後車無法煞停
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          阻塞交通，可能再次被撞
        </text>
      </>
    )}
  </svg>
);
const DA_RE_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    <line
      x1="0"
      y1="70"
      x2="160"
      y2="70"
      stroke="#334155"
      strokeWidth="1.5"
      strokeDasharray="10,8"
    />
    <rect x="124" y="48" width="36" height="44" fill="#252f3f" />
    <line x1="124" y1="48" x2="124" y2="92" stroke="#fbbf24" strokeWidth="1.5" />
    <g transform="translate(138,67)">
      <rect x="-16" y="-14" width="32" height="22" fill="#1d4ed8" rx="3" />
      <rect x="-10" y="-22" width="20" height="12" fill="#1e40af" rx="2" />
      <circle cx="-13" cy="-12" r="4" fill="#f59e0b" className="anim-hazard" />
      <circle cx="13" cy="-12" r="4" fill="#f59e0b" className="anim-hazard" />
      <circle cx="-13" cy="7" r="4" fill="#f59e0b" className="anim-hazard" />
      <circle cx="13" cy="7" r="4" fill="#f59e0b" className="anim-hazard" />
    </g>
    <path
      d="M 74 68 Q 104 62 120 65"
      stroke={showConsequence ? '#4ade80' : '#94a3b8'}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <polygon points="118,60 122,65 117,69" fill={showConsequence ? '#4ade80' : '#94a3b8'} />
    {showConsequence && (
      <>
        <circle cx="22" cy="22" r="13" fill="#15803d" />
        <text x="22" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
          ✓
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          先移車，確保現場安全
        </text>
      </>
    )}
  </svg>
);
const DA_RE_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    <line
      x1="0"
      y1="70"
      x2="160"
      y2="70"
      stroke="#334155"
      strokeWidth="1.5"
      strokeDasharray="10,8"
    />
    <g transform="translate(118,65)">
      <rect x="-24" y="-14" width="48" height="26" fill="#1d4ed8" rx="3" />
      <rect x="-18" y="-22" width="36" height="14" fill="#1e40af" rx="2" />
      <circle cx="-21" cy="11" r="4" fill="#ef4444" />
      <circle cx="21" cy="11" r="4" fill="#ef4444" />
    </g>
    <g transform="translate(78,65)">
      <rect x="-18" y="-12" width="36" height="22" fill="#7c3aed" rx="2" />
      <rect x="-12" y="-20" width="24" height="12" fill="#6d28d9" rx="2" />
    </g>
    <g transform="translate(44,65)">
      <rect x="-16" y="-11" width="32" height="20" fill="#dc2626" rx="2" />
      <rect x="-10" y="-18" width="20" height="11" fill="#b91c1c" rx="2" />
    </g>
    <g transform="translate(14,65)">
      <rect x="-12" y="-9" width="24" height="16" fill="#475569" rx="2" />
    </g>
    <text x="118" y="26" textAnchor="middle" fontSize="18">
      🚔
    </text>
    <text x="118" y="40" textAnchor="middle" fill="#94a3b8" fontSize="8">
      等警察…
    </text>
    {showConsequence && (
      <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
        阻塞車流，連環追撞風險
      </text>
    )}
  </svg>
);

// == Brake Failure ==
const DA_BF_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect
      x="48"
      y="54"
      width="64"
      height="30"
      fill="#374151"
      rx="5"
      stroke="#475569"
      strokeWidth="2"
    />
    <text x="80" y="73" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="700">
      BRAKE
    </text>
    <g
      style={{ animation: 'stepBrakePump 0.7s ease-in-out infinite', transformOrigin: '80px 54px' }}
    >
      <text x="80" y="44" textAnchor="middle" fontSize="24">
        🦶
      </text>
    </g>
    {showConsequence && (
      <>
        <text x="130" y="46" fontSize="20">
          ❌
        </text>
        <path d="M 114 68 L 128 58" stroke="#ef4444" strokeWidth="2" fill="none" />
        <text x="80" y="20" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="800">
          只靠踩煞車不夠
        </text>
        <text x="80" y="34" textAnchor="middle" fill="#94a3b8" fontSize="8">
          油壓失效時效果有限
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">
          需配合降檔才完整
        </text>
      </>
    )}
  </svg>
);
const DA_BF_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="52" width="160" height="40" fill="#1e293b" />
    <path
      d="M 18 70 Q 58 56 96 72 Q 122 82 148 66"
      stroke={showConsequence ? '#ef4444' : '#94a3b8'}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="5,3"
    />
    <g transform="translate(112,67) rotate(28)">
      <rect x="-24" y="-14" width="48" height="26" fill="#dc2626" rx="3" />
      <rect x="-18" y="-24" width="36" height="14" fill="#b91c1c" rx="2" />
    </g>
    <rect x="30" y="56" width="10" height="8" fill="#475569" rx="4" />
    <line x1="35" y1="56" x2="35" y2="22" stroke="#4b5563" strokeWidth="6" strokeLinecap="round" />
    <ellipse cx="35" cy="22" rx="10" ry="7" fill="#334155" stroke="#6b7280" strokeWidth="2" />
    <g
      style={{
        animation: 'stepHandbrakePull 1.5s ease-in-out infinite',
        transformOrigin: '35px 22px',
      }}
    >
      <text x="35" y="20" textAnchor="middle" fontSize="16">
        🤚
      </text>
    </g>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          猛拉手煞車
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          後輪鎖死，車尾猛烈甩出
        </text>
      </>
    )}
  </svg>
);
const DA_BF_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect
      x="6"
      y="24"
      width="44"
      height="58"
      fill="#1e293b"
      rx="8"
      stroke="#334155"
      strokeWidth="1"
    />
    <rect x="16" y="50" width="24" height="16" fill="#374151" rx="3" />
    <text x="28" y="61" textAnchor="middle" fill="#64748b" fontSize="6" fontWeight="700">
      BRAKE
    </text>
    <g
      style={{
        animation: 'stepBrakePump 0.85s ease-in-out infinite',
        transformOrigin: '28px 50px',
      }}
    >
      <text x="28" y="44" textAnchor="middle" fontSize="15">
        🦶
      </text>
    </g>
    <text
      x="28"
      y="76"
      textAnchor="middle"
      fill={showConsequence ? '#4ade80' : '#94a3b8'}
      fontSize="7"
      fontWeight="700"
    >
      點踩
    </text>
    <rect
      x="58"
      y="24"
      width="44"
      height="58"
      fill="#1e293b"
      rx="8"
      stroke="#334155"
      strokeWidth="1"
    />
    <line x1="71" y1="38" x2="71" y2="66" stroke="#334155" strokeWidth="1.5" />
    <line x1="89" y1="38" x2="89" y2="66" stroke="#334155" strokeWidth="1.5" />
    <line x1="71" y1="52" x2="89" y2="52" stroke="#334155" strokeWidth="1.5" />
    {[
      ['3', 71, 42],
      ['1', 71, 62],
      ['2', 89, 42],
      ['N', 89, 62],
    ].map(([g, x, y]) => (
      <g key={`da${g}${x}`}>
        <circle cx={x} cy={y} r="7" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text
          x={x}
          y={(y as number) + 3}
          textAnchor="middle"
          fill="#475569"
          fontSize="7"
          fontWeight="700"
        >
          {g}
        </text>
      </g>
    ))}
    <g style={{ animation: 'stepGearDrop 2s ease-in-out infinite' }}>
      <circle cx="71" cy="62" r="8" fill="#f59e0b" />
      <text x="71" y="65" textAnchor="middle" fill="#000" fontSize="7" fontWeight="900">
        1
      </text>
    </g>
    <text
      x="80"
      y="76"
      textAnchor="middle"
      fill={showConsequence ? '#f59e0b' : '#94a3b8'}
      fontSize="7"
      fontWeight="700"
    >
      降檔
    </text>
    <rect
      x="110"
      y="24"
      width="44"
      height="58"
      fill="#1e293b"
      rx="8"
      stroke="#334155"
      strokeWidth="1"
    />
    <circle cx="132" cy="46" r="16" fill={showConsequence ? '#15803d' : '#475569'} opacity="0.85" />
    <text x="132" y="51" textAnchor="middle" fill="white" fontSize="18" fontWeight="900">
      P
    </text>
    <text
      x="132"
      y="74"
      textAnchor="middle"
      fill={showConsequence ? '#4ade80' : '#94a3b8'}
      fontSize="7"
      fontWeight="700"
    >
      安全點
    </text>
    <text x="53" y="54" textAnchor="middle" fill="#475569" fontSize="12">
      →
    </text>
    <text x="107" y="54" textAnchor="middle" fill="#475569" fontSize="12">
      →
    </text>
    {showConsequence && (
      <>
        <circle cx="80" cy="14" r="9" fill="#15803d" />
        <text x="80" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="900">
          ✓
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          三步驟同時進行
        </text>
      </>
    )}
  </svg>
);

// == Narrow Road DA options ==
const DA_NR_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="45" y="30" width="70" height="62" fill="#1e293b" />
    <line
      x1="80"
      y1="30"
      x2="80"
      y2="92"
      stroke="#334155"
      strokeWidth="1.5"
      strokeDasharray="8,6"
    />
    <rect x="25" y="30" width="20" height="62" fill="#14532d" opacity="0.8" />
    <rect x="115" y="30" width="20" height="62" fill="#14532d" opacity="0.8" />
    {/* Car veering sharply right, hitting wall */}
    <g style={{ animation: 'stepSlideR 0.7s ease-in-out infinite' }}>
      <rect x="80" y="60" width="28" height="20" fill="#dc2626" rx="3" />
      <rect x="84" y="52" width="20" height="12" fill="#b91c1c" rx="2" />
    </g>
    {/* Impact at right wall */}
    <g transform="translate(113,70)" className="anim-impact">
      <circle r="7" fill="#f59e0b" opacity="0.8" />
      <line x1="-9" y1="-9" x2="9" y2="9" stroke="#fcd34d" strokeWidth="2.5" />
      <line x1="9" y1="-9" x2="-9" y2="9" stroke="#fcd34d" strokeWidth="2.5" />
    </g>
    {showConsequence && (
      <>
        <text x="80" y="20" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          猛打方向盤閃避
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          撞上山壁，失控翻車
        </text>
      </>
    )}
  </svg>
);
const DA_NR_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="40" y="30" width="80" height="62" fill="#1e293b" />
    <line
      x1="80"
      y1="30"
      x2="80"
      y2="92"
      stroke="#334155"
      strokeWidth="1.5"
      strokeDasharray="8,6"
    />
    <rect x="20" y="30" width="20" height="62" fill="#14532d" opacity="0.8" />
    <rect x="120" y="30" width="20" height="62" fill="#14532d" opacity="0.8" />
    {/* Two cars facing each other, stopped */}
    <g transform="translate(65,70)">
      <rect x="-14" y="-12" width="28" height="18" fill="#dc2626" rx="3" />
      <rect x="-8" y="-20" width="16" height="11" fill="#b91c1c" rx="2" />
    </g>
    <g transform="translate(95,42) rotate(180)">
      <rect x="-12" y="-10" width="24" height="16" fill="#2563eb" rx="3" />
      <rect x="-7" y="-16" width="14" height="9" fill="#1d4ed8" rx="2" />
    </g>
    {/* Horn symbol */}
    <text x="80" y="58" textAnchor="middle" fontSize="12">
      📯
    </text>
    <circle
      cx="80"
      cy="56"
      r="10"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="1.5"
      style={{ animation: 'stepRingWave 1.2s ease-out infinite' }}
    />
    {showConsequence && (
      <>
        {/* Standoff */}
        <text x="80" y="20" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="800">
          按喇叭等對方讓路
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">
          兩車對峙，危機未解除
        </text>
      </>
    )}
  </svg>
);
const DA_NR_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road with wider pocket */}
    <rect x="38" y="30" width="84" height="62" fill="#1e293b" />
    <line
      x1="80"
      y1="30"
      x2="80"
      y2="92"
      stroke="#334155"
      strokeWidth="1.5"
      strokeDasharray="8,6"
    />
    <rect x="18" y="30" width="20" height="62" fill="#14532d" opacity="0.8" />
    <rect x="122" y="30" width="20" height="62" fill="#14532d" opacity="0.8" />
    {/* Wider pocket behind player car */}
    <rect x="18" y="65" width="104" height="27" fill="#374151" rx="3" opacity="0.6" />
    <text
      x="70"
      y="80"
      textAnchor="middle"
      fill={showConsequence ? '#4ade80' : '#94a3b8'}
      fontSize="6"
      fontWeight="700"
    >
      較寬處
    </text>
    {/* Player car backed into wide spot */}
    <g transform="translate(66,76)">
      <rect x="-14" y="-12" width="28" height="18" fill="#dc2626" rx="3" />
      <rect x="-8" y="-20" width="16" height="11" fill="#b91c1c" rx="2" />
    </g>
    {/* Oncoming car passing */}
    <g style={{ animation: 'stepSlideL 2.2s ease-in-out infinite' }}>
      <g transform="translate(100,50) rotate(180)">
        <rect x="-12" y="-10" width="24" height="16" fill="#2563eb" rx="3" />
        <rect x="-7" y="-16" width="14" height="9" fill="#1d4ed8" rx="2" />
      </g>
    </g>
    {showConsequence && (
      <>
        {/* Green check */}
        <circle cx="22" cy="20" r="12" fill="#15803d" opacity="0.9" />
        <text x="22" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
          ✓
        </text>
        <text x="80" y="20" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="800">
          減速靠右，倒車讓路
        </text>
      </>
    )}
    {showConsequence && (
      <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
        兩車安全錯車通過
      </text>
    )}
  </svg>
);

// == Intersection Crash ==
const DA_IC_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    <rect x="60" y="0" width="40" height="100" fill="#252f3f" />
    {/* Blue player car accelerating upward — outer: SVG position, inner: CSS anim */}
    <g transform="translate(80,70)">
      <g style={{ animation: 'stepSlideU 1.4s ease-in-out infinite' }}>
        <rect x="-10" y="-14" width="20" height="22" fill="#1d4ed8" rx="2" />
        <rect x="-6" y="-20" width="12" height="9" fill="#1e40af" rx="1" />
      </g>
    </g>
    {/* Red car from left — outer: SVG position, inner: CSS anim */}
    <g transform="translate(80,60)">
      <g style={{ animation: 'stepSlideRIn 1.4s ease-in-out infinite' }}>
        <rect x="-14" y="-9" width="28" height="18" fill="#dc2626" rx="2" />
        <rect x="-8" y="-15" width="16" height="9" fill="#b91c1c" rx="1" />
      </g>
    </g>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          加速衝過路口
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          T 字碰撞風險極高
        </text>
      </>
    )}
  </svg>
);
const DA_IC_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    <rect x="60" y="0" width="40" height="100" fill="#252f3f" />
    {/* Horn sound waves above blue car */}
    <g transform="translate(80,74)">
      <path
        d="M-9,-2 Q-13,-6 -9,-10"
        stroke="#a78bfa"
        strokeWidth="1.5"
        fill="none"
        style={{ animation: 'twBlink 0.7s ease-in-out infinite', animationDelay: '0s' }}
      />
      <path
        d="M9,-2 Q13,-6 9,-10"
        stroke="#a78bfa"
        strokeWidth="1.5"
        fill="none"
        style={{ animation: 'twBlink 0.7s ease-in-out infinite', animationDelay: '0s' }}
      />
      <path
        d="M-13,-1 Q-19,-7 -13,-13"
        stroke="#a78bfa"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
        style={{ animation: 'twBlink 0.7s ease-in-out infinite', animationDelay: '0.2s' }}
      />
      <path
        d="M13,-1 Q19,-7 13,-13"
        stroke="#a78bfa"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
        style={{ animation: 'twBlink 0.7s ease-in-out infinite', animationDelay: '0.2s' }}
      />
    </g>
    {/* Player car stopped before intersection, brake lights on */}
    <g transform="translate(80,91)">
      <rect x="-10" y="-14" width="20" height="22" fill="#1d4ed8" rx="2" />
      <rect x="-6" y="-20" width="12" height="9" fill="#1e40af" rx="1" />
      {/* Brake lights */}
      <rect x="-8" y="6" width="6" height="4" fill="#ef4444" rx="1" />
      <rect x="2" y="6" width="6" height="4" fill="#ef4444" rx="1" />
    </g>
    {/* Red car passing safely in front — outer: position, inner: CSS anim */}
    <g transform="translate(80,58)">
      <g style={{ animation: 'stepSlideRIn 2s ease-in-out infinite' }}>
        <rect x="-14" y="-9" width="28" height="18" fill="#dc2626" rx="2" />
        <rect x="-8" y="-15" width="16" height="9" fill="#b91c1c" rx="1" />
      </g>
    </g>
    {showConsequence && (
      <>
        <circle cx="22" cy="20" r="12" fill="#15803d" opacity="0.9" />
        <text x="22" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
          ✓
        </text>
        <text x="100" y="18" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          煞車停住
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          安全避開闖紅燈車輛
        </text>
      </>
    )}
  </svg>
);
const DA_IC_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    <rect x="60" y="0" width="40" height="100" fill="#252f3f" />
    {/* Red car from left — static, shows the incoming threat */}
    <g transform="translate(28,60)">
      <rect x="-14" y="-9" width="28" height="18" fill="#dc2626" rx="2" />
      <rect x="-8" y="-15" width="16" height="9" fill="#b91c1c" rx="1" />
    </g>
    {/* Gray car in right lane — static obstacle */}
    <g transform="translate(122,70)">
      <rect x="-10" y="-14" width="20" height="22" fill="#475569" rx="2" />
      <rect x="-6" y="-20" width="12" height="9" fill="#334155" rx="1" />
    </g>
    {/* Player car swerving right — outer: position, inner: CSS anim */}
    <g transform="translate(80,68)">
      <g style={{ animation: 'stepSwerveR 1.5s ease-in-out infinite' }}>
        <rect x="-10" y="-14" width="20" height="22" fill="#1d4ed8" rx="2" />
        <rect x="-6" y="-20" width="12" height="9" fill="#1e40af" rx="1" />
      </g>
    </g>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          猛打方向盤右閃
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          撞上右側車輛或行人
        </text>
      </>
    )}
  </svg>
);

// == Scooter Weaving ==
const DA_SW_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    {/* Car turning right */}
    <g transform="translate(90,65) rotate(-20)">
      <rect x="-16" y="-12" width="32" height="22" fill="#1d4ed8" rx="3" />
      <rect x="-10" y="-20" width="20" height="11" fill="#1e40af" rx="2" />
    </g>
    {/* Scooter being hit */}
    <g transform="translate(110,58)">
      <rect x="-4" y="-6" width="8" height="10" fill="#7c3aed" rx="1" />
      <circle cx="0" cy="-10" r="4" fill="#fbbf24" />
    </g>
    <circle cx="105" cy="60" r="6" fill="#fbbf24" opacity="0.8" className="anim-impact" />
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          繼續右轉不停
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          直接撞上機車騎士
        </text>
      </>
    )}
  </svg>
);
const DA_SW_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    {/* Car stopped */}
    <g transform="translate(80,65)">
      <rect x="-16" y="-12" width="32" height="22" fill="#1d4ed8" rx="3" />
      <rect x="-10" y="-20" width="20" height="11" fill="#1e40af" rx="2" />
    </g>
    {/* Brake lines */}
    <line x1="66" y1="72" x2="66" y2="82" stroke="#ef4444" strokeWidth="2" />
    <line x1="94" y1="72" x2="94" y2="82" stroke="#ef4444" strokeWidth="2" />
    {/* Scooter passing safely */}
    <g transform="translate(115,60)" style={{ animation: 'stepSlideR 2s ease-in-out infinite' }}>
      <rect x="-4" y="-6" width="8" height="10" fill="#7c3aed" rx="1" />
      <circle cx="0" cy="-10" r="4" fill="#fbbf24" />
    </g>
    {showConsequence && (
      <>
        <circle cx="22" cy="20" r="12" fill="#15803d" opacity="0.9" />
        <text x="22" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
          ✓
        </text>
        <text x="100" y="18" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          停車讓機車先行
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          機車安全通過
        </text>
      </>
    )}
  </svg>
);
const DA_SW_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    <rect x="0" y="48" width="160" height="44" fill="#1e293b" />
    <line x1="0" y1="70" x2="160" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="10,8" />
    {/* Car swerving left */}
    <g transform="translate(60,58) rotate(15)">
      <rect x="-16" y="-12" width="32" height="22" fill="#1d4ed8" rx="3" />
      <rect x="-10" y="-20" width="20" height="11" fill="#1e40af" rx="2" />
    </g>
    {/* Oncoming car in left lane */}
    <g transform="translate(40,60)">
      <rect x="-12" y="-10" width="24" height="18" fill="#475569" rx="2" />
    </g>
    <circle cx="52" cy="58" r="6" fill="#fbbf24" opacity="0.8" className="anim-impact" />
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          猛打方向盤左閃
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          撞上左側車道來車
        </text>
      </>
    )}
  </svg>
);

// == Drowsy Driving ==
const DA_DD_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#020617" />
    <rect x="0" y="50" width="160" height="42" fill="#1e293b" />
    <line x1="0" y1="71" x2="160" y2="71" stroke="#334155" strokeWidth="1" strokeDasharray="10,8" />
    {/* Car with open window */}
    <g transform="translate(80,62)">
      <rect x="-18" y="-12" width="36" height="22" fill="#475569" rx="3" />
      <rect x="-12" y="-20" width="24" height="12" fill="#374151" rx="2" />
      {/* Open window */}
      <rect x="-10" y="-18" width="8" height="8" fill="#020617" rx="1" />
      {/* Wind lines */}
      <line x1="-20" y1="-14" x2="-30" y2="-10" stroke="#93c5fd" strokeWidth="1.5" opacity="0.5" />
      <line x1="-20" y1="-10" x2="-32" y2="-6" stroke="#93c5fd" strokeWidth="1" opacity="0.4" />
    </g>
    {/* Music notes */}
    <text x="110" y="48" fill="#94a3b8" fontSize="12" opacity="0.6">
      ♪
    </text>
    <text x="120" y="42" fill="#94a3b8" fontSize="14" opacity="0.5">
      ♫
    </text>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800">
          吹冷風+大音量只撐 3～5 分鐘
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          疲勞感更強烈反撲
        </text>
      </>
    )}
  </svg>
);
const DA_DD_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#020617" />
    <rect x="0" y="50" width="160" height="42" fill="#1e293b" />
    {/* Rest area */}
    <rect x="105" y="30" width="45" height="22" fill="#1e293b" rx="4" />
    <text x="127" y="44" textAnchor="middle" fill="#60a5fa" fontSize="7" fontWeight="700">
      休息站
    </text>
    {/* Car heading to rest area */}
    <g transform="translate(80,66)">
      <rect x="-16" y="-10" width="32" height="18" fill="#475569" rx="3" />
      <rect x="-10" y="-17" width="20" height="10" fill="#374151" rx="2" />
      <circle cx="-12" cy="-8" r="3" fill="#f59e0b" className="anim-hazard" />
      <circle cx="12" cy="-8" r="3" fill="#f59e0b" className="anim-hazard" />
    </g>
    <path
      d="M 100 66 Q 115 55 125 52"
      stroke="#4ade80"
      strokeWidth="2"
      fill="none"
      strokeDasharray="4,3"
    />
    <polygon points="123,48 127,52 121,54" fill="#4ade80" />
    {showConsequence && (
      <>
        <circle cx="22" cy="18" r="12" fill="#15803d" opacity="0.9" />
        <text x="22" y="23" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
          ✓
        </text>
        <text x="80" y="18" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          前往休息站小睡
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          唯一真正有效的解方
        </text>
      </>
    )}
  </svg>
);
const DA_DD_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#020617" />
    <rect x="0" y="50" width="160" height="42" fill="#1e293b" />
    <line x1="0" y1="71" x2="160" y2="71" stroke="#334155" strokeWidth="1" strokeDasharray="10,8" />
    <line x1="0" y1="50" x2="160" y2="50" stroke="#fbbf24" strokeWidth="1.5" />
    {/* Car drifting off road */}
    <g transform="translate(80,58) rotate(-12)" className="anim-wobble">
      <rect x="-16" y="-10" width="32" height="18" fill="#475569" rx="3" />
      <rect x="-10" y="-17" width="20" height="10" fill="#374151" rx="2" />
    </g>
    {/* Zzz */}
    <text x="100" y="45" fill="#94a3b8" fontSize="10" opacity="0.5">
      Z
    </text>
    <text x="108" y="38" fill="#94a3b8" fontSize="12" opacity="0.4">
      Z
    </text>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="800">
          「再撐一下」=最危險念頭
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          3 秒微睡眠就能偏出車道
        </text>
      </>
    )}
  </svg>
);

// == Hydroplaning ==
const DA_HP_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#1e293b" />
    <rect x="0" y="48" width="160" height="44" fill="#1e3a5f" />
    <rect x="0" y="48" width="160" height="44" fill="#60a5fa" opacity="0.1" />
    {/* Car spinning after brake lock */}
    <g transform="translate(80,65) rotate(45)" className="anim-wobble">
      <rect x="-14" y="-10" width="28" height="18" fill="#0ea5e9" rx="3" />
      <rect x="-8" y="-16" width="16" height="9" fill="#0284c7" rx="2" />
    </g>
    {/* Locked wheel marks */}
    <path d="M 60 78 Q 70 70 85 80" stroke="#111" strokeWidth="2" fill="none" opacity="0.6" />
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          踩死煞車
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          輪胎恢復抓地力時瞬間打轉
        </text>
      </>
    )}
  </svg>
);
const DA_HP_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#1e293b" />
    <rect x="0" y="48" width="160" height="44" fill="#1e3a5f" />
    <rect x="0" y="48" width="160" height="44" fill="#60a5fa" opacity="0.1" />
    {/* Car stable, slowing down */}
    <g transform="translate(80,65)">
      <rect x="-14" y="-10" width="28" height="18" fill="#0ea5e9" rx="3" />
      <rect x="-8" y="-16" width="16" height="9" fill="#0284c7" rx="2" />
    </g>
    {/* Hands on wheel icon */}
    <circle cx="80" cy="65" r="6" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
    {/* Speed decreasing */}
    <text x="120" y="62" fill="#22c55e" fontSize="8">
      ▼ 減速中
    </text>
    {showConsequence && (
      <>
        <circle cx="22" cy="18" r="12" fill="#15803d" opacity="0.9" />
        <text x="22" y="23" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
          ✓
        </text>
        <text x="100" y="18" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          放油門穩方向盤
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          等待輪胎恢復抓地力
        </text>
      </>
    )}
  </svg>
);
const DA_HP_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#1e293b" />
    <rect x="0" y="48" width="160" height="44" fill="#1e3a5f" />
    <rect x="0" y="48" width="160" height="44" fill="#60a5fa" opacity="0.1" />
    {/* Car flipping after overcorrection */}
    <g transform="translate(80,60) rotate(-35)" className="anim-wobble">
      <rect x="-14" y="-10" width="28" height="18" fill="#0ea5e9" rx="3" />
      <rect x="-8" y="-16" width="16" height="9" fill="#0284c7" rx="2" />
    </g>
    {/* Steering arrow */}
    <path d="M 50 72 Q 40 60 55 55" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
    <polygon points="53,52 58,56 52,58" fill="#f59e0b" />
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          猛打方向盤修正
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          恢復抓地力時猛然轉向翻車
        </text>
      </>
    )}
  </svg>
);

// == Right Turn Motorcycle ==
const DA_RT_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road intersection */}
    <rect x="0" y="50" width="160" height="40" fill="#1e293b" />
    <rect x="115" y="60" width="45" height="40" fill="#1e293b" />
    <line x1="0" y1="70" x2="110" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="8,6" />
    {/* Player car turning right */}
    <g transform="translate(75,63)">
      <rect x="-16" y="-10" width="32" height="18" fill="#1d4ed8" rx="3" />
      <rect x="-10" y="-17" width="20" height="10" fill="#1e40af" rx="2" />
      <circle cx="16" cy="-8" r="3.5" fill="#f59e0b" className="anim-hazard" />
    </g>
    {/* Motorcycle coming straight from right */}
    <g transform="translate(130,63)">
      <g style={{ animation: 'stepSlideL 1.4s ease-in-out infinite' }}>
        <rect x="-5" y="-10" width="10" height="16" fill="#f97316" rx="2" />
        <circle cx="0" cy="-13" r="4" fill="#fbbf24" />
        <circle cx="-5" cy="6" r="3" fill="#111" />
        <circle cx="5" cy="6" r="3" fill="#111" />
        <circle cx="-5" cy="-7" r="2" fill="#fef9c3" opacity="0.9" />
      </g>
    </g>
    {/* Collision spark */}
    <g transform="translate(105,63)">
      <g className="anim-impact" style={{ transformOrigin: '0px 0px' }}>
        <circle r="7" fill="#ef4444" opacity="0.9" />
        <line x1="-10" y1="-10" x2="10" y2="10" stroke="#fbbf24" strokeWidth="2" />
        <line x1="10" y1="-10" x2="-10" y2="10" stroke="#fbbf24" strokeWidth="2" />
      </g>
    </g>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          ⚠ 機車從右側直行衝撞
        </text>
        <text x="80" y="32" textAnchor="middle" fill="#f87171" fontSize="8">
          A 柱盲區未確認即右轉
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          右轉捲入事故，機車騎士重傷
        </text>
      </>
    )}
  </svg>
);

const DA_RT_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="0" y="50" width="160" height="40" fill="#1e293b" />
    <rect x="115" y="60" width="45" height="40" fill="#1e293b" />
    <line x1="0" y1="70" x2="110" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="8,6" />
    {/* Right curb - car hugging it */}
    <line x1="0" y1="88" x2="115" y2="88" stroke="#64748b" strokeWidth="2" />
    {/* Player car close to curb */}
    <g transform="translate(60,76)">
      <rect x="-16" y="-10" width="32" height="18" fill="#1d4ed8" rx="3" />
      <rect x="-10" y="-17" width="20" height="10" fill="#1e40af" rx="2" />
      <circle cx="16" cy="-8" r="3.5" fill="#f59e0b" className="anim-hazard" />
    </g>
    {/* Motorcycle passing safely above car */}
    <g transform="translate(130,60)">
      <rect x="-5" y="-10" width="10" height="16" fill="#f97316" rx="2" />
      <circle cx="0" cy="-13" r="4" fill="#fbbf24" />
      <circle cx="-5" cy="6" r="3" fill="#111" />
      <circle cx="5" cy="6" r="3" fill="#111" />
    </g>
    {/* Safe arrow */}
    <path
      d="M 80 75 Q 105 68 118 72"
      stroke={showConsequence ? '#22c55e' : '#94a3b8'}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <polygon points="116,68 120,72 115,76" fill={showConsequence ? '#22c55e' : '#94a3b8'} />
    {showConsequence && (
      <>
        <circle cx="22" cy="22" r="13" fill="#15803d" opacity="0.9" />
        <text x="22" y="27" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
          ✓
        </text>
        <text x="96" y="20" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          靠右確認
        </text>
        <text x="96" y="32" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          讓機車先通
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          安全完成右轉，零衝突
        </text>
      </>
    )}
  </svg>
);

const DA_RT_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="0" y="50" width="160" height="40" fill="#1e293b" />
    <rect x="115" y="60" width="45" height="40" fill="#1e293b" />
    <line x1="0" y1="70" x2="110" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="8,6" />
    {/* Car honking and turning fast */}
    <g transform="translate(75,63)">
      <rect x="-16" y="-10" width="32" height="18" fill="#1d4ed8" rx="3" />
      <rect x="-10" y="-17" width="20" height="10" fill="#1e40af" rx="2" />
    </g>
    {/* Horn waves */}
    <text x="40" y="45" fill="#fbbf24" fontSize="14" fontWeight="900">
      📯
    </text>
    <text x="105" y="35" fill="#f59e0b" fontSize="8">
      ♩♩♩
    </text>
    {/* Motorcycle still there */}
    <g transform="translate(118,63)">
      <g className="anim-wobble" style={{ transformOrigin: '0px 0px' }}>
        <rect x="-5" y="-10" width="10" height="16" fill="#f97316" rx="2" />
        <circle cx="0" cy="-13" r="4" fill="#fbbf24" />
        <circle cx="-5" cy="6" r="3" fill="#111" />
        <circle cx="5" cy="6" r="3" fill="#111" />
        <circle cx="-5" cy="-7" r="2" fill="#fef9c3" opacity="0.9" />
      </g>
    </g>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          ⚠ 喇叭無法代替目視
        </text>
        <text x="80" y="32" textAnchor="middle" fill="#f87171" fontSize="8">
          機車來不及反應仍發生碰撞
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          靠右確認才是根本，非按喇叭
        </text>
      </>
    )}
  </svg>
);

// == Left Turn Oncoming ==
const DA_LT_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="0" y="45" width="160" height="45" fill="#1e293b" />
    <line
      x1="0"
      y1="67"
      x2="160"
      y2="67"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="8,6"
    />
    {/* Player car turning left */}
    <g transform="translate(65,58)">
      <rect x="-16" y="-10" width="32" height="18" fill="#1d4ed8" rx="3" />
      <rect x="-10" y="-17" width="20" height="10" fill="#1e40af" rx="2" />
      <circle cx="-16" cy="-8" r="3.5" fill="#f59e0b" className="anim-hazard" />
    </g>
    {/* Oncoming car at speed */}
    <g transform="translate(125,75)">
      <g style={{ animation: 'stepSlideL 1.2s ease-in-out infinite' }}>
        <rect x="-18" y="-10" width="36" height="18" fill="#dc2626" rx="3" />
        <rect x="-12" y="-17" width="24" height="10" fill="#b91c1c" rx="2" />
        <circle cx="-18" cy="-8" r="3.5" fill="#fef9c3" opacity="0.9" />
        <circle cx="-18" cy="6" r="3.5" fill="#fef9c3" opacity="0.9" />
      </g>
    </g>
    {/* Collision */}
    <g transform="translate(88,65)">
      <g className="anim-impact" style={{ transformOrigin: '0px 0px' }}>
        <circle r="8" fill="#ef4444" opacity="0.85" />
        <line x1="-11" y1="-11" x2="11" y2="11" stroke="#fbbf24" strokeWidth="2" />
        <line x1="11" y1="-11" x2="-11" y2="11" stroke="#fbbf24" strokeWidth="2" />
      </g>
    </g>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          ⚠ 對向車速難以判斷
        </text>
        <text x="80" y="32" textAnchor="middle" fill="#f87171" fontSize="8">
          加速搶行造成正面碰撞
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          高速正面衝撞，死傷率極高
        </text>
      </>
    )}
  </svg>
);

const DA_LT_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="0" y="45" width="160" height="45" fill="#1e293b" />
    <line
      x1="0"
      y1="67"
      x2="160"
      y2="67"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="8,6"
    />
    {/* Player car waiting at center */}
    <g transform="translate(55,58)">
      <rect x="-16" y="-10" width="32" height="18" fill="#1d4ed8" rx="3" />
      <rect x="-10" y="-17" width="20" height="10" fill="#1e40af" rx="2" />
      <circle cx="-16" cy="-8" r="3.5" fill="#f59e0b" className="anim-hazard" />
    </g>
    {/* Oncoming car passing safely */}
    <g transform="translate(125,76)">
      <g style={{ animation: 'stepSlideL 1.8s ease-in-out infinite' }}>
        <rect x="-16" y="-9" width="32" height="16" fill="#dc2626" rx="2" />
        <rect x="-10" y="-15" width="20" height="8" fill="#b91c1c" rx="1" />
      </g>
    </g>
    {/* Safe left-turn arrow */}
    <path
      d="M 55 55 Q 42 40 28 55"
      stroke={showConsequence ? '#22c55e' : '#64748b'}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <polygon points="25,52 28,57 32,53" fill={showConsequence ? '#22c55e' : '#64748b'} />
    {showConsequence && (
      <>
        <circle cx="130" cy="20" r="13" fill="#15803d" opacity="0.9" />
        <text x="130" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
          ✓
        </text>
        <text x="60" y="18" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          等對向通過
        </text>
        <text x="60" y="30" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700">
          安全左轉
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          耐心等待，零碰撞安全左轉
        </text>
      </>
    )}
  </svg>
);

const DA_LT_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="0" y="45" width="160" height="45" fill="#1e293b" />
    <line
      x1="0"
      y1="67"
      x2="160"
      y2="67"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="8,6"
    />
    {/* Player car slowly drifting into oncoming lane */}
    <g transform="translate(75,60)">
      <g style={{ animation: 'stepSlideL 2s ease-in-out infinite' }}>
        <rect x="-16" y="-10" width="32" height="18" fill="#1d4ed8" rx="3" />
        <rect x="-10" y="-17" width="20" height="10" fill="#1e40af" rx="2" />
        <circle cx="-16" cy="-8" r="3.5" fill="#f59e0b" className="anim-hazard" />
      </g>
    </g>
    {/* Oncoming car forced to brake */}
    <g transform="translate(128,75)">
      <rect x="-18" y="-10" width="36" height="18" fill="#dc2626" rx="3" />
      <rect x="-12" y="-17" width="24" height="10" fill="#b91c1c" rx="2" />
      <circle cx="-18" cy="-8" r="4" fill="#fef9c3" opacity="0.9" />
      <circle cx="-18" cy="6" r="4" fill="#fef9c3" opacity="0.9" />
    </g>
    {/* Danger zone indicator */}
    <g transform="translate(100,65)">
      <g className="anim-hazard" style={{ transformOrigin: '0px 0px' }}>
        <polygon points="0,-12 10,7 -10,7" fill="#ef4444" opacity="0.85" />
        <text x="0" y="4" textAnchor="middle" fill="white" fontSize="9" fontWeight="900">
          !
        </text>
      </g>
    </g>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          ⚠ 佔用對向車道
        </text>
        <text x="80" y="32" textAnchor="middle" fill="#f87171" fontSize="8">
          對方被迫緊急煞車或碰撞
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          無法控制對向反應，風險極高
        </text>
      </>
    )}
  </svg>
);

// == cold-weather-cat-check ==

// DA_CC_A: Start engine directly — cat hit by fan belt (wrong)
const DA_CC_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Car front */}
    <rect x="30" y="40" width="100" height="40" fill="#1d4ed8" rx="5" />
    <path d="M38 40 Q44 26 56 26 L104 26 Q116 26 120 40Z" fill="#1e40af" />
    <rect x="56" y="28" width="20" height="12" fill="#bfdbfe" opacity="0.6" rx="1" />
    <rect x="84" y="28" width="20" height="12" fill="#bfdbfe" opacity="0.4" rx="1" />
    {/* Engine hood shaking */}
    <g style={{ animation: 'stepSlideL 0.3s linear infinite' }}>
      <rect
        x="36"
        y="30"
        width="88"
        height="12"
        fill="#1e40af"
        rx="3"
        stroke="#374151"
        strokeWidth="1"
      />
      <text x="80" y="40" textAnchor="middle" fill="#fbbf24" fontSize="8">
        引擎啟動
      </text>
    </g>
    {/* Cat inside with danger signal */}
    <text x="80" y="62" textAnchor="middle" fontSize="16">
      🐱
    </text>
    <g className="anim-hazard" style={{ transformOrigin: '80px 52px' }}>
      <polygon points="80,44 90,60 70,60" fill="#ef4444" opacity="0.9" />
      <text x="80" y="57" textAnchor="middle" fill="white" fontSize="8" fontWeight="900">
        !
      </text>
    </g>
    {showConsequence && (
      <>
        <text x="80" y="16" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          ⚠ 直接發動
        </text>
        <text x="80" y="29" textAnchor="middle" fill="#f87171" fontSize="8">
          風扇葉片瞬間造成動物重傷
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          動物來不及逃脫，危害生命
        </text>
      </>
    )}
  </svg>
);

// DA_CC_B: Knock hood + honk, cat jumps out safely (correct)
const DA_CC_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Car front */}
    <rect x="30" y="42" width="100" height="38" fill="#1d4ed8" rx="5" />
    <path d="M38 42 Q44 28 56 28 L104 28 Q116 28 120 42Z" fill="#1e40af" />
    <rect x="56" y="30" width="20" height="12" fill="#bfdbfe" opacity="0.6" rx="1" />
    <rect x="84" y="30" width="20" height="12" fill="#bfdbfe" opacity="0.4" rx="1" />
    {/* Hand knocking hood */}
    <text x="30" y="38" textAnchor="middle" fontSize="14">
      ✋
    </text>
    {/* Knock vibration */}
    <circle
      cx="60"
      cy="35"
      r="6"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="1.5"
      style={{ animation: 'stepSlideL 1s ease-in-out infinite' }}
      opacity="0.7"
    />
    <circle
      cx="60"
      cy="35"
      r="11"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="1"
      style={{ animation: 'stepSlideL 1s ease-in-out infinite', animationDelay: '0.3s' }}
      opacity="0.4"
    />
    {/* Cat running away safely */}
    <g style={{ animation: 'stepSlideR 1.5s ease-in-out infinite' }}>
      <text x="128" y="52" textAnchor="middle" fontSize="16">
        🐱
      </text>
      <text x="128" y="40" textAnchor="middle" fill="#4ade80" fontSize="8">
        安全！
      </text>
    </g>
    {/* Green check */}
    <circle cx="80" cy="72" r="10" fill="#22c55e" opacity="0.9" />
    <text x="80" y="77" textAnchor="middle" fill="white" fontSize="12" fontWeight="900">
      ✓
    </text>
    {showConsequence && (
      <>
        <text x="80" y="16" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="800">
          ✓ 輕敲引擎蓋加按喇叭
        </text>
        <text x="80" y="29" textAnchor="middle" fill="#86efac" fontSize="8">
          動物有充裕時間自行離開
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          人與動物都安全，最佳選擇！
        </text>
      </>
    )}
  </svg>
);

// DA_CC_C: Person reaches into hood to grab cat, cat scratches (wrong)
const DA_CC_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Car front with hood open */}
    <rect x="30" y="50" width="100" height="30" fill="#1d4ed8" rx="5" />
    {/* Open hood */}
    <path d="M30 50 L30 30 L130 30 L130 50" fill="none" stroke="#1e40af" strokeWidth="2" />
    <path d="M30 30 Q80 10 130 30" fill="#1e3a8a" stroke="#1e40af" strokeWidth="1.5" />
    {/* Engine inside */}
    <rect x="50" y="34" width="60" height="18" fill="#374151" rx="3" />
    {/* Person arm reaching in */}
    <g style={{ animation: 'stepSlideL 1.5s ease-in-out infinite' }}>
      <line
        x1="20"
        y1="22"
        x2="60"
        y2="38"
        stroke="#fbbf24"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="20" cy="20" rx="8" ry="6" fill="#fbbf24" />
    </g>
    {/* Angry cat with scratch marks */}
    <text x="82" y="46" textAnchor="middle" fontSize="14">
      😾
    </text>
    {/* Scratch effect */}
    <text
      x="50"
      y="28"
      textAnchor="middle"
      fill="#ef4444"
      fontSize="14"
      fontWeight="900"
      style={{ animation: 'stepSlideL 0.8s ease-in-out infinite' }}
    >
      ✕
    </text>
    {showConsequence && (
      <>
        <text x="80" y="16" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          ⚠ 強行徒手拉貓
        </text>
        <text x="80" y="29" textAnchor="middle" fill="#f87171" fontSize="8">
          受驚動物抓傷人，且動物二次傷害
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          應讓動物自行離開或聯絡動保
        </text>
      </>
    )}
  </svg>
);

// == wildlife-road ==

// DA_WR_A: Car swerves hard, hits barrier / rolls (wrong)
const DA_WR_A = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="0" y="48" width="160" height="44" fill="#2d3748" />
    <line
      x1="0"
      y1="70"
      x2="160"
      y2="70"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="12,8"
    />
    {/* Barrier on right */}
    <rect x="134" y="48" width="8" height="44" fill="#475569" />
    {[52, 62, 72, 78, 88].map((y) => (
      <line key={y} x1="134" y1={y} x2="142" y2={y} stroke="#94a3b8" strokeWidth="1.5" />
    ))}
    {/* Car swerving out of lane — tilted */}
    <g transform="translate(110,60) rotate(25)">
      <rect x="-22" y="-12" width="44" height="22" fill="#1d4ed8" rx="3" />
      <rect x="-14" y="-20" width="28" height="12" fill="#1e40af" rx="2" />
    </g>
    {/* Collision sparks */}
    <text x="132" y="56" textAnchor="middle" fill="#fbbf24" fontSize="14" className="anim-hazard">
      💥
    </text>
    {/* Animal safe on other side */}
    <text x="28" y="66" textAnchor="middle" fontSize="14">
      🦔
    </text>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          ⚠ 猛打方向盤
        </text>
        <text x="80" y="31" textAnchor="middle" fill="#f87171" fontSize="8">
          車輛失控撞上護欄，比撞動物更危險
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          急打方向盤可能造成翻車或衝出車道
        </text>
      </>
    )}
  </svg>
);

// DA_WR_B: Car brakes, animal crosses safely (correct)
const DA_WR_B = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="0" y="46" width="160" height="46" fill="#2d3748" />
    <line
      x1="0"
      y1="69"
      x2="160"
      y2="69"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="12,8"
    />
    {/* Car stopped */}
    <rect x="14" y="54" width="52" height="24" fill="#1d4ed8" rx="4" />
    <rect x="22" y="46" width="36" height="12" fill="#1e40af" rx="2" />
    {/* Brake lights */}
    <rect x="14" y="57" width="5" height="8" fill="#ef4444" className="anim-tail-light" rx="1" />
    <rect x="14" y="67" width="5" height="8" fill="#ef4444" className="anim-tail-light" rx="1" />
    {/* Brake marks */}
    <line
      x1="28"
      y1="78"
      x2="26"
      y2="92"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
    <line
      x1="52"
      y1="78"
      x2="54"
      y2="92"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Animal crossing to safety */}
    <g style={{ animation: 'stepSlideR 2s linear infinite' }}>
      <text x="100" y="64" textAnchor="middle" fontSize="16">
        🦔
      </text>
    </g>
    {/* Arrow showing animal path */}
    <path
      d="M80,64 Q110,64 138,58"
      fill="none"
      stroke="#4ade80"
      strokeWidth="1.5"
      strokeDasharray="4,3"
      strokeLinecap="round"
    />
    {/* Green check */}
    <circle cx="80" cy="82" r="9" fill="#22c55e" opacity="0.9" />
    <text x="80" y="87" textAnchor="middle" fill="white" fontSize="11" fontWeight="900">
      ✓
    </text>
    {showConsequence && (
      <>
        <text x="80" y="17" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="800">
          ✓ 穩踩煞車，握穩方向盤
        </text>
        <text x="80" y="30" textAnchor="middle" fill="#86efac" fontSize="8">
          動物安全通過，車輛也完好無損
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">
          路殺悲劇成功避免！
        </text>
      </>
    )}
  </svg>
);

// DA_WR_C: Car accelerates and hits animal (wrong)
const DA_WR_C = ({ showConsequence = false }: DAProps) => (
  <svg viewBox="0 0 160 100" width="100%" height="100%">
    <rect width="160" height="100" fill="#0f172a" />
    {/* Road */}
    <rect x="0" y="46" width="160" height="46" fill="#2d3748" />
    <line
      x1="0"
      y1="69"
      x2="160"
      y2="69"
      stroke="#fbbf24"
      strokeWidth="1.5"
      strokeDasharray="12,8"
    />
    {/* Car speeding with motion lines */}
    <g style={{ animation: 'stepSlideR 0.8s linear infinite' }}>
      <rect x="20" y="54" width="52" height="24" fill="#1d4ed8" rx="4" />
      <rect x="28" y="46" width="36" height="12" fill="#1e40af" rx="2" />
      {/* Speed lines */}
      <line x1="18" y1="58" x2="4" y2="58" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
      <line x1="18" y1="65" x2="2" y2="65" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
      <line x1="18" y1="72" x2="4" y2="72" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
    </g>
    {/* Animal in path */}
    <text x="90" y="64" textAnchor="middle" fontSize="16">
      🦔
    </text>
    {/* Collision warning */}
    <g className="anim-hazard" style={{ transformOrigin: '80px 60px' }}>
      <polygon points="80,48 92,68 68,68" fill="#ef4444" opacity="0.85" />
      <text x="80" y="65" textAnchor="middle" fill="white" fontSize="9" fontWeight="900">
        !
      </text>
    </g>
    {showConsequence && (
      <>
        <text x="80" y="18" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
          ⚠ 加速衝過
        </text>
        <text x="80" y="31" textAnchor="middle" fill="#f87171" fontSize="8">
          直接撞上動物，撞擊可能導致車輛失控
        </text>
        <text x="80" y="97" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">
          動物反應難以預測，無法確保衝過
        </text>
      </>
    )}
  </svg>
);

export const DA_OPTS: Partial<Record<ScenarioId, React.FC<DAProps>[]>> = {
  'highway-breakdown': [DA_HB_A, DA_HB_B, DA_HB_C],
  'tire-blowout': [DA_TB_A, DA_TB_B, DA_TB_C],
  'heavy-rain-fog': [DA_HF_A, DA_HF_B, DA_HF_C],
  'rear-end-collision': [DA_RE_A, DA_RE_B, DA_RE_C],
  'brake-failure': [DA_BF_A, DA_BF_B, DA_BF_C],
  'narrow-road': [DA_NR_A, DA_NR_B, DA_NR_C],
  'intersection-crash': [DA_IC_A, DA_IC_B, DA_IC_C],
  'scooter-weaving': [DA_SW_A, DA_SW_B, DA_SW_C],
  'drowsy-driving': [DA_DD_A, DA_DD_B, DA_DD_C],
  hydroplaning: [DA_HP_A, DA_HP_B, DA_HP_C],
  'right-turn-motorcycle': [DA_RT_A, DA_RT_B, DA_RT_C],
  'left-turn-oncoming': [DA_LT_A, DA_LT_B, DA_LT_C],
  'cold-weather-cat-check': [DA_CC_A, DA_CC_B, DA_CC_C],
  'wildlife-road': [DA_WR_A, DA_WR_B, DA_WR_C],
};
