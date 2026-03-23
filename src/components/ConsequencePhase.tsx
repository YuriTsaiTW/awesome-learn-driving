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
            border: `2px solid ${ok ? '#16a34a' : '#dc2626'}`,
          }}
        >
          <div className="consequence-anim" style={{ background: '#0f172a' }}>
            <DA showConsequence={true} />
          </div>
        </div>
      )}
      <div
        style={{
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
          background: ok ? 'rgba(21,128,61,0.2)' : 'rgba(185,28,28,0.2)',
          border: `1px solid ${ok ? '#16a34a' : '#dc2626'}`,
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 17,
            marginBottom: 10,
            color: ok ? '#4ade80' : '#f87171',
          }}
        >
          {ok ? '✅ 判斷正確！' : '❌ 這個選擇很危險'}
        </div>
        <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: 13, margin: 0 }}>
          {ok
            ? scenario.decision.correctExplanation
            : scenario.decision.wrongExplanation[choice.id] || '這個選擇可能造成危險。'}
        </p>
      </div>
      {!ok && (
        <div
          style={{
            background: 'rgba(146,64,14,0.2)',
            borderRadius: 20,
            padding: 16,
            marginBottom: 16,
            border: '1px solid #92400e',
          }}
        >
          <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: 12, marginBottom: 8 }}>
            💡 正確做法
          </div>
          <p style={{ color: '#d1d5db', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
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
          color: '#000',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg,#f59e0b,#d97706)',
        }}
      >
        學習正確流程 →
      </button>
    </div>
  );
};

export default ConsequencePhase;
