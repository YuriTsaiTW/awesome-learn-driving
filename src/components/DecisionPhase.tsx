import type { Scenario, DecisionOption } from '../types/scenario';
import { DA_OPTS } from '../data/decision-animations';

interface DecisionPhaseProps {
  scenario: Scenario;
  onDecide: (opt: DecisionOption) => void;
}

const DecisionPhase = ({ scenario, onDecide }: DecisionPhaseProps) => {
  const daOpts = DA_OPTS[scenario.id] || [];
  const optLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="anim-fade">
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 20,
          padding: 18,
          marginBottom: 14,
          border: '1px solid var(--border-base)',
        }}
      >
        <div style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          🤔 緊急決策
        </div>
        <p
          className="decision-q"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: 15,
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {scenario.decision.question}
        </p>
      </div>
      <div className="decision-list">
        {scenario.decision.options.map(function (opt, idx) {
          const DA = daOpts[idx];
          return (
            <button
              key={opt.id}
              onClick={function () {
                onDecide(opt);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                background: 'var(--bg-card)',
                borderRadius: 18,
                border: '1px solid var(--border-base)',
                cursor: 'pointer',
                textAlign: 'left',
                overflow: 'hidden',
                width: '100%',
                transition: 'border-color 0.15s, transform 0.12s',
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = 'var(--border-base)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {DA && (
                <div
                  className="decision-opt-anim"
                  style={{
                    background: 'var(--bg-elevated)',
                    borderBottom: '1px solid var(--border-subtle)',
                    pointerEvents: 'none',
                    flexShrink: 0,
                  }}
                >
                  <DA showConsequence={false} />
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--border-base)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                  }}
                >
                  {optLabels[idx]}
                </div>
                <span
                  className="opt-text"
                  style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}
                >
                  {opt.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DecisionPhase;
