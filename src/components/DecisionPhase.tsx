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
          background: '#1e293b',
          borderRadius: 20,
          padding: 18,
          marginBottom: 14,
          border: '1px solid #334155',
        }}
      >
        <div style={{ color: '#f59e0b', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          🤔 緊急決策
        </div>
        <p
          className="decision-q"
          style={{ color: 'white', fontWeight: 700, fontSize: 15, lineHeight: 1.65, margin: 0 }}
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
                background: '#1e293b',
                borderRadius: 18,
                border: '1px solid #334155',
                cursor: 'pointer',
                textAlign: 'left',
                overflow: 'hidden',
                width: '100%',
                transition: 'border-color 0.15s, transform 0.12s',
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.borderColor = '#f59e0b';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {DA && (
                <div
                  className="decision-opt-anim"
                  style={{
                    background: '#0f172a',
                    borderBottom: '1px solid #1e293b',
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
                    background: '#334155',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 800,
                    color: '#94a3b8',
                  }}
                >
                  {optLabels[idx]}
                </div>
                <span
                  className="opt-text"
                  style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.65 }}
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
