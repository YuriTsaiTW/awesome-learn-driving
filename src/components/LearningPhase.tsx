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
            background: 'var(--bg-card)',
            borderRadius: 20,
            padding: 16,
            marginBottom: 14,
            border: '1px solid var(--border-base)',
          }}
        >
          <div style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
            📋 正確應對流程
          </div>
          <div style={{ color: 'var(--text-disabled)', fontSize: 14 }}>
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
                  border: `1px solid ${isCurrent ? 'var(--accent)' : isRevealed ? 'var(--border-base)' : 'var(--border-subtle)'}`,
                  background: isCurrent
                    ? 'var(--accent-bg)'
                    : isRevealed
                      ? 'var(--bg-card)'
                      : 'var(--bg-muted)',
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
                      background: isRevealed ? 'var(--accent)' : 'var(--border-base)',
                      color: isRevealed ? '#000' : 'var(--text-faint)',
                    }}
                  >
                    {isRevealed ? step.icon : i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="step-label"
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 3,
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      className="step-desc"
                      style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}
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
                              border: '1px solid var(--accent-border)',
                              background: 'var(--bg-elevated)',
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
      <div className="content-cta">
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
                color: 'var(--cta-fg)',
                border: 'none',
                cursor: 'pointer',
                background: 'var(--gradient-cta)',
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
                color: 'var(--cta-fg)',
                border: 'none',
                cursor: 'pointer',
                background: 'var(--gradient-cta-green)',
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
