import { useState } from 'react';
import type { Scenario } from '../types/scenario';
import { STEP_ANIMS } from '../data/step-animations';

interface LearningPhaseProps {
  scenario: Scenario;
  onNext: () => void;
}

const LearningPhase = ({ scenario, onNext }: LearningPhaseProps) => {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(new Set([0]));

  const advance = () => {
    if (current < scenario.steps.length - 1) {
      const next = current + 1;
      setCurrent(next);
      setRevealed((prev) => new Set([...prev, next]));
    }
  };

  const done = current === scenario.steps.length - 1;

  return (
    <>
      <div className="anim-fade" style={{ paddingBottom: 88 }}>
        <div
          style={{
            background: '#1e293b',
            borderRadius: 20,
            padding: 16,
            marginBottom: 14,
            border: '1px solid #334155',
          }}
        >
          <div style={{ color: '#f59e0b', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
            📋 正確應對流程
          </div>
          <div style={{ color: '#475569', fontSize: 14 }}>
            步驟 {Math.min(current + 1, scenario.steps.length)} ／ {scenario.steps.length}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {scenario.steps.map((step, i) => {
            const isRevealed = revealed.has(i);
            const isCurrent = i === current;
            return (
              <div
                key={i}
                style={{
                  borderRadius: 18,
                  padding: 14,
                  border: `1px solid ${isCurrent ? '#f59e0b' : isRevealed ? '#334155' : '#1e293b'}`,
                  background: isCurrent
                    ? 'rgba(245,158,11,0.12)'
                    : isRevealed
                      ? '#1e293b'
                      : 'rgba(30,41,59,0.4)',
                  opacity: isRevealed ? 1 : 0.25,
                  transition: 'all 0.35s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: 14,
                      fontWeight: 800,
                      background: isRevealed ? '#f59e0b' : '#334155',
                      color: isRevealed ? '#000' : '#64748b',
                    }}
                  >
                    {isRevealed ? step.icon : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="step-label"
                      style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 3 }}
                    >
                      {step.title}
                    </div>
                    <div
                      className="step-desc"
                      style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}
                    >
                      {step.desc}
                    </div>
                    {isCurrent &&
                      (function () {
                        const StepAnim = (STEP_ANIMS[scenario.id] || [])[i];
                        return StepAnim ? (
                          <div
                            className="anim-fade"
                            style={{
                              marginTop: 12,
                              height: 165,
                              borderRadius: 12,
                              overflow: 'hidden',
                              border: '1px solid rgba(245,158,11,0.3)',
                              background: '#0f172a',
                            }}
                          >
                            <StepAnim />
                          </div>
                        ) : null;
                      })()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed bottom CTA — must be outside .anim-fade to avoid transform stacking context */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 16px 20px',
          background: 'linear-gradient(to top, #0f172a 70%, transparent)',
          zIndex: 50,
        }}
      >
        <div className="flow-inner">
          {!done ? (
            <button
              onClick={advance}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 20,
                fontWeight: 800,
                fontSize: 15,
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg,#f59e0b,#d97706)',
              }}
            >
              下一步 →
            </button>
          ) : (
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
                background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              }}
            >
              開始測驗 →
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LearningPhase;
