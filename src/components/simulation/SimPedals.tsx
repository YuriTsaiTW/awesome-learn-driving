interface SimPedalsProps {
  activeBrake: boolean;
  activeGas: boolean;
  doneBrake: boolean;
  doneGas: boolean;
  onBrakeClick: () => void;
  onGasClick: () => void;
}

const SimPedals = ({
  activeBrake,
  activeGas,
  doneBrake,
  doneGas,
  onBrakeClick,
  onGasClick,
}: SimPedalsProps) => (
  <svg viewBox="0 0 130 64" width="130" height="64" style={{ overflow: 'visible' }}>
    {/* Brake */}
    <g onClick={onBrakeClick} style={{ cursor: activeBrake ? 'pointer' : 'default' }}>
      <rect
        x="6"
        y="16"
        width="46"
        height="36"
        rx="5"
        fill={
          doneBrake ? 'rgba(239,68,68,0.18)' : activeBrake ? 'rgba(245,158,11,0.12)' : '#0a111e'
        }
        stroke={doneBrake ? '#ef4444' : activeBrake ? '#f59e0b' : '#1e3a5f'}
        strokeWidth={activeBrake || doneBrake ? 2 : 1.5}
        style={{ animation: activeBrake ? 'simPulse 1s ease-in-out infinite' : 'none' }}
      />
      {[22, 30, 38].map(function (y, i) {
        return (
          <rect
            key={i}
            x="12"
            y={y}
            width="34"
            height="4"
            rx="2"
            fill={activeBrake || doneBrake ? '#2d3f55' : '#1a2d45'}
          />
        );
      })}
      <text
        x="29"
        y="60"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill={doneBrake ? '#ef4444' : activeBrake ? '#f59e0b' : '#2d4a6e'}
      >
        剎車
      </text>
      {activeBrake && (
        <text x="29" y="10" textAnchor="middle" fontSize="7" fill="#f59e0b" fontWeight="800">
          點擊！
        </text>
      )}
    </g>
    {/* Gas */}
    <g onClick={onGasClick} style={{ cursor: activeGas ? 'pointer' : 'default' }}>
      <rect
        x="78"
        y="24"
        width="46"
        height="28"
        rx="5"
        fill={doneGas ? 'rgba(34,197,94,0.15)' : activeGas ? 'rgba(245,158,11,0.12)' : '#0a111e'}
        stroke={doneGas ? '#22c55e' : activeGas ? '#f59e0b' : '#1e3a5f'}
        strokeWidth={activeGas || doneGas ? 2 : 1.5}
        style={{ animation: activeGas ? 'simPulse 1s ease-in-out infinite' : 'none' }}
      />
      {[30, 38].map(function (y, i) {
        return (
          <rect
            key={i}
            x="84"
            y={y}
            width="34"
            height="4"
            rx="2"
            fill={activeGas || doneGas ? '#2d3f55' : '#1a2d45'}
          />
        );
      })}
      <text
        x="101"
        y="60"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill={doneGas ? '#22c55e' : activeGas ? '#f59e0b' : '#2d4a6e'}
      >
        油門
      </text>
      {activeGas && (
        <text x="101" y="10" textAnchor="middle" fontSize="7" fill="#f59e0b" fontWeight="800">
          點擊放開！
        </text>
      )}
    </g>
  </svg>
);

export default SimPedals;
