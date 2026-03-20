interface SimButtonProps {
  label: string;
  sublabel: string;
  active: boolean;
  on: boolean;
  color: string;
  onClick: () => void;
  size?: string;
}

const SimButton = ({ label, sublabel, active, on, color, onClick, size }: SimButtonProps) => {
  const sm = size === 'sm';
  const w = sm ? 54 : 60;
  const h = sm ? 50 : 56;
  return (
    <button
      onClick={onClick}
      style={{
        width: w,
        height: h,
        borderRadius: 10,
        cursor: 'pointer',
        padding: 0,
        background: on ? color + '22' : active ? 'rgba(245,158,11,0.12)' : '#080d18',
        border: on ? '2px solid ' + color : active ? '2px solid #f59e0b' : '1px solid #1e3a5f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        boxShadow: on
          ? '0 0 10px ' + color + '55'
          : active
            ? '0 0 14px rgba(245,158,11,0.55)'
            : 'none',
        animation: active ? 'simPulse 1s ease-in-out infinite' : 'none',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: sm ? 17 : 20, lineHeight: 1 }}>{label}</span>
      <span
        style={{
          fontSize: 9,
          color: on ? color : active ? '#f59e0b' : '#475569',
          fontWeight: 700,
          letterSpacing: '0.02em',
        }}
      >
        {sublabel}
      </span>
    </button>
  );
};

export default SimButton;
