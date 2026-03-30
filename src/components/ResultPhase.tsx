import type { Scenario } from '../types/scenario';

interface ResultPhaseProps {
  scenario: Scenario;
  score: number;
  total: number;
  onHome: () => void;
  onRetry: () => void;
}

const ResultPhase = ({ scenario, score, total, onHome, onRetry }: ResultPhaseProps) => {
  const pct = Math.round((score / total) * 100);
  const grade =
    pct >= 80
      ? {
          label: '優秀',
          color: 'var(--green-light)',
          emoji: '🏆',
          sub: '你已掌握此情境的應對方式！',
        }
      : pct >= 60
        ? { label: '良好', color: 'var(--accent-light)', emoji: '👍', sub: '再複習一次，加深記憶' }
        : {
            label: '需要加強',
            color: 'var(--red-light)',
            emoji: '📚',
            sub: '建議重新學習一次流程',
          };
  return (
    <div className="anim-fade" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 60, marginBottom: 12 }}>{grade.emoji}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: grade.color, marginBottom: 4 }}>
        {grade.label}
      </div>
      <div style={{ fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 4 }}>
        {pct}
        <span style={{ fontSize: 20 }}>%</span>
      </div>
      <div style={{ color: 'var(--text-faint)', fontSize: 14, marginBottom: 6 }}>
        {score} ／ {total} 題答對
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>{grade.sub}</div>
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 20,
          padding: 18,
          marginBottom: 20,
          textAlign: 'left',
          border: '1px solid var(--border-base)',
        }}
      >
        <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
          🔑 記住這個情境的關鍵步驟
        </div>
        {scenario.steps.slice(0, 4).map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>{s.icon}</span>
            <span style={{ color: 'var(--text-body)', fontSize: 14 }}>{s.title}</span>
          </div>
        ))}
        {scenario.steps.length > 4 && (
          <div style={{ color: 'var(--text-disabled)', fontSize: 14, marginTop: 4 }}>
            ...共 {scenario.steps.length} 個步驟
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button
          onClick={onRetry}
          style={{
            padding: '14px',
            borderRadius: 18,
            fontWeight: 800,
            color: 'var(--text-primary)',
            background: 'transparent',
            border: '1px solid var(--border-base)',
            cursor: 'pointer',
            fontSize: 14,
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-base)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          🔄 再試一次
        </button>
        <button
          onClick={onHome}
          style={{
            padding: '14px',
            borderRadius: 18,
            fontWeight: 800,
            color: 'var(--cta-fg)',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            background: 'var(--gradient-cta)',
          }}
        >
          🏠 返回首頁
        </button>
      </div>
    </div>
  );
};

export default ResultPhase;
