import type { Scenario, DecisionOption } from '../types/scenario';
import { DA_OPTS } from '../data/decision-animations';

interface ConsequencePhaseProps {
  scenario: Scenario;
  choice: DecisionOption;
  onNext: () => void;
}

const ConsequencePhase = ({ scenario, choice, onNext }: ConsequencePhaseProps) => {
  const ok = choice.correct === true;
  const daOpts = DA_OPTS[scenario.id] || [];
  const daIdx = choice.id === 'a' ? 0 : choice.id === 'b' ? 1 : 2;
  const DA = daOpts[daIdx];

  return (
    <div className="anim-fade">
      {DA && (
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 16,
            border: `2px solid ${ok ? 'var(--green-deep)' : 'var(--red)'}`,
          }}
        >
          <div className="consequence-anim" style={{ background: 'var(--bg-elevated)' }}>
            <DA showConsequence={true} />
          </div>
        </div>
      )}
      <div
        style={{
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
          background: ok ? 'var(--green-bg)' : 'var(--red-bg)',
          border: `1px solid ${ok ? 'var(--green-deep)' : 'var(--red)'}`,
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 17,
            marginBottom: 10,
            color: ok ? 'var(--green-light)' : 'var(--red-light)',
          }}
        >
          {ok ? '✅ 判斷正確！' : '❌ 這個選擇很危險'}
        </div>
        <p style={{ color: 'var(--text-body)', lineHeight: 1.7, fontSize: 14, margin: 0 }}>
          {ok
            ? scenario.decision.correctExplanation
            : scenario.decision.wrongExplanation[choice.id] || '這個選擇可能造成危險。'}
        </p>
      </div>
      {!ok && (
        <div
          style={{
            background: 'var(--orange-bg)',
            borderRadius: 20,
            padding: 16,
            marginBottom: 16,
            border: '1px solid var(--orange-border)',
          }}
        >
          <div
            style={{
              color: 'var(--accent-light)',
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 8,
            }}
          >
            💡 正確做法
          </div>
          <p style={{ color: 'var(--text-body)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            {scenario.decision.correctExplanation}
          </p>
        </div>
      )}
      <button
        onClick={onNext}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 20,
          fontWeight: 800,
          fontSize: 16,
          color: 'var(--cta-fg)',
          border: 'none',
          cursor: 'pointer',
          background: 'var(--gradient-cta)',
        }}
      >
        學習正確流程 →
      </button>
    </div>
  );
};

export default ConsequencePhase;
