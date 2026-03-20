import { useState, useEffect, useRef } from 'react';
import type { Scenario } from '../../types/scenario';
import type { CockpitState } from '../../types/simulation';
import { SIM_STEPS } from '../../data/sim-steps';
import { SIM_CONFIGS, SIM_CFG_DEFAULT } from '../../data/sim-configs';
import SimWindshield from './SimWindshield';
import SimSpeedometer from './SimSpeedometer';
import SimButton from './SimButton';
import SimWheel from './SimWheel';
import SimGearShifter from './SimGearShifter';
import SimPedals from './SimPedals';

interface SimulationPhaseProps {
  scenario: Scenario;
  onComplete: () => void;
}

const SimulationPhase = ({ scenario, onComplete }: SimulationPhaseProps) => {
  const simSteps = SIM_STEPS[scenario.id] || [];
  const simCfg = SIM_CONFIGS[scenario.id] || SIM_CFG_DEFAULT;

  const [stepIdx, setStepIdx] = useState(0);
  const [cockpit, setCockpit] = useState<CockpitState>(simCfg.initCockpit);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [allDone, setAllDone] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  // Track completed targets for button "on" states
  const [doneTgts, setDoneTgts] = useState<Set<string>>(new Set());

  const dragging = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);
  const feedbackLock = useRef<boolean>(false);
  const stepIdxRef = useRef<number>(0);
  const cockpitRef = useRef<CockpitState>(simCfg.initCockpit);
  const allDoneRef = useRef<boolean>(false);
  const doneTgtsRef = useRef<Set<string>>(new Set());

  useEffect(
    function () {
      stepIdxRef.current = stepIdx;
    },
    [stepIdx],
  );
  useEffect(
    function () {
      cockpitRef.current = cockpit;
    },
    [cockpit],
  );
  useEffect(
    function () {
      allDoneRef.current = allDone;
    },
    [allDone],
  );
  useEffect(
    function () {
      doneTgtsRef.current = doneTgts;
    },
    [doneTgts],
  );

  function triggerAction(target: string) {
    if (feedbackLock.current || allDoneRef.current) return;
    const idx = stepIdxRef.current;
    const steps = SIM_STEPS[scenario.id] || [];
    const s = steps[idx];
    if (!s || target !== s.target) {
      feedbackLock.current = true;
      setFeedback('wrong');
      setTimeout(function () {
        feedbackLock.current = false;
        setFeedback(null);
      }, 900);
      return;
    }
    feedbackLock.current = true;
    const newCockpit = Object.assign({}, cockpitRef.current, s.stateChange);
    setCockpit(newCockpit);
    cockpitRef.current = newCockpit;
    const newDone = new Set(doneTgtsRef.current);
    newDone.add(target);
    setDoneTgts(newDone);
    doneTgtsRef.current = newDone;
    setFeedback('success');
    setTimeout(function () {
      feedbackLock.current = false;
      setFeedback(null);
      if (idx < steps.length - 1) {
        setStepIdx(function (prev) {
          return prev + 1;
        });
      } else {
        setAllDone(true);
        allDoneRef.current = true;
      }
    }, 1500);
  }

  // Keyboard shortcuts
  useEffect(function () {
    function handler(e: KeyboardEvent) {
      if (allDoneRef.current) return;
      const idx = stepIdxRef.current;
      const steps = SIM_STEPS[scenario.id] || [];
      const s = steps[idx];
      if (s && s.keys && s.keys.includes(e.key)) {
        triggerAction(s.target);
      }
    }
    window.addEventListener('keydown', handler);
    return function () {
      window.removeEventListener('keydown', handler);
    };
  }, []);

  // Steering wheel drag
  useEffect(function () {
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging.current) return;
      const x =
        (e as MouseEvent).clientX !== undefined
          ? (e as MouseEvent).clientX
          : (e as TouchEvent).touches && (e as TouchEvent).touches[0]
            ? (e as TouchEvent).touches[0].clientX
            : null;
      if (x === null) return;
      const delta = x - dragStartX.current;
      setWheelAngle(Math.max(-90, Math.min(90, delta * 0.7)));
      if (delta > 52) {
        dragging.current = false;
        setWheelAngle(0);
        triggerAction('wheel');
      }
    }
    function onUp() {
      if (dragging.current) {
        dragging.current = false;
        setWheelAngle(0);
      }
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return function () {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  if (!simSteps.length) {
    return (
      <div className="anim-fade" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
        <p style={{ color: '#64748b', marginBottom: 20, fontSize: 14 }}>此情境尚未開放模擬模式</p>
        <button
          onClick={onComplete}
          style={{
            background: '#f59e0b',
            color: '#000',
            border: 'none',
            borderRadius: 14,
            padding: '12px 28px',
            fontWeight: 900,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          繼續 →
        </button>
      </div>
    );
  }

  const step = simSteps[stepIdx];
  function isActive(tgt: string) {
    return !allDone && step && step.target === tgt;
  }
  function isDone(tgt: string) {
    return doneTgts.has(tgt);
  }
  const keyHint = step
    ? step.keys
        .map(function (k) {
          return k === 'ArrowRight' ? '\u2192' : k.toUpperCase();
        })
        .join(' / ')
    : '';
  const lb1 = simCfg.lb1;
  const lb2 = simCfg.lb2;

  return (
    <div className="anim-fade">
      {/* Progress header */}
      <div
        style={{
          background: '#0d1525',
          borderRadius: 16,
          padding: '10px 14px',
          marginBottom: 10,
          border: '1px solid #1e3a5f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              color: '#f59e0b',
              fontSize: 11,
              fontWeight: 800,
              marginBottom: 2,
              letterSpacing: '0.05em',
            }}
          >
            🎮 情境模擬
          </div>
          <div style={{ color: 'white', fontWeight: 800, fontSize: 13 }}>
            {allDone
              ? '\u2713 全部完成'
              : '步驟 ' + (stepIdx + 1) + '／' + simSteps.length + '：' + step.title}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {simSteps.map(function (_, i) {
            return (
              <div
                key={i}
                style={{
                  width: 24,
                  height: 7,
                  borderRadius: 4,
                  background:
                    i < stepIdx || allDone ? '#22c55e' : i === stepIdx ? '#f59e0b' : '#1e3a5f',
                  transition: 'background 0.4s',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Instruction */}
      {!allDone && (
        <div
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.28)',
            borderRadius: 12,
            padding: '9px 14px',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          <div style={{ color: '#fbbf24', fontSize: 13, fontWeight: 800, marginBottom: 3 }}>
            {step.instruction}
          </div>
          <div style={{ color: '#475569', fontSize: 11 }}>
            快捷鍵：<span style={{ color: '#64748b', fontWeight: 700 }}>{keyHint}</span>
          </div>
        </div>
      )}

      {/* ====== COCKPIT ====== */}
      <div
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: '2px solid #1a3050',
          background: '#04080f',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
        }}
      >
        {/* WINDSHIELD */}
        <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
          <SimWindshield cockpit={cockpit} foggy={simCfg.foggy} />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 26,
              background: 'linear-gradient(to right,#04080f,transparent)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: 26,
              background: 'linear-gradient(to left,#04080f,transparent)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 22,
              background: 'linear-gradient(to top,#04080f,transparent)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* INTERIOR PANEL */}
        <div
          style={{
            background: '#07101e',
            borderTop: '1px solid #1a3050',
            padding: '12px 14px 10px',
          }}
        >
          {/* Row 1: Speedometer + Center buttons + Right info */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
            {/* Speedometer */}
            <div style={{ flexShrink: 0 }}>
              <SimSpeedometer speed={cockpit.speed} />
            </div>

            {/* Center button cluster */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                alignItems: 'center',
                paddingTop: 4,
              }}
            >
              <div style={{ display: 'flex', gap: 8 }}>
                <SimButton
                  label="⚠"
                  sublabel="雙黃燈"
                  active={isActive('hazard')}
                  on={isDone('hazard')}
                  color="#f59e0b"
                  onClick={function () {
                    triggerAction('hazard');
                  }}
                />
                <SimButton
                  label="🔆"
                  sublabel="霧燈"
                  active={isActive('fog')}
                  on={isDone('fog')}
                  color="#60a5fa"
                  onClick={function () {
                    triggerAction('fog');
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <SimButton
                  label="📢"
                  sublabel="喇叭"
                  active={isActive('horn')}
                  on={isDone('horn')}
                  color="#a78bfa"
                  onClick={function () {
                    triggerAction('horn');
                  }}
                />
                <SimButton
                  label="💧"
                  sublabel="雨刷"
                  active={isActive('wiper')}
                  on={isDone('wiper')}
                  color="#67e8f9"
                  onClick={function () {
                    triggerAction('wiper');
                  }}
                />
              </div>
            </div>

            {/* Right: warning lights */}
            <div
              style={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                alignItems: 'flex-end',
              }}
            >
              <div
                style={{
                  background: '#060b14',
                  border: '1px solid #1a3050',
                  borderRadius: 8,
                  padding: '4px 10px',
                  textAlign: 'center',
                  minWidth: 44,
                }}
              >
                <div style={{ color: '#2d4a6e', fontSize: 9, marginBottom: 1 }}>排檔</div>
                <div
                  style={{
                    color: cockpit.gearDown ? '#22c55e' : '#f59e0b',
                    fontSize: 22,
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {cockpit.gearDown ? '2' : 'D'}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 4,
                  justifyContent: 'flex-end',
                  maxWidth: 70,
                }}
              >
                {[
                  { icon: '⚠️', on: cockpit.hazardOn, tip: '雙黃' },
                  { icon: '⚙️', on: true, tip: '引擎' },
                  { icon: '💡', on: cockpit.fogOn, tip: '霧燈' },
                  { icon: '⛽', on: false, tip: '油量' },
                ].map(function (w, i) {
                  return (
                    <div
                      key={i}
                      title={w.tip}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 5,
                        background: w.on ? 'rgba(245,158,11,0.2)' : '#060b14',
                        border: w.on ? '1px solid #f59e0b' : '1px solid #1a3050',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        animation:
                          w.on && w.tip === '雙黃' ? 'hazard 0.75s ease-in-out infinite' : 'none',
                      }}
                    >
                      {w.icon}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 2: Left stalk + Steering wheel + Gear shifter */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}
          >
            {/* LEFT STALK: lb1 + lb2 (scenario-specific) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <SimButton
                label={lb1.icon}
                sublabel={lb1.label}
                active={isActive(lb1.target)}
                on={isDone(lb1.target)}
                color={lb1.color}
                onClick={function () {
                  triggerAction(lb1.target);
                }}
                size="sm"
              />
              <SimButton
                label={lb2.icon}
                sublabel={lb2.label}
                active={isActive(lb2.target)}
                on={isDone(lb2.target)}
                color={lb2.color}
                onClick={function () {
                  triggerAction(lb2.target);
                }}
                size="sm"
              />
            </div>

            {/* Steering wheel */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <SimWheel
                angle={wheelAngle}
                active={isActive('wheel')}
                activeGrip={isActive('wheel-grip')}
                doneGrip={isDone('wheel-grip')}
                onHubClick={function () {
                  triggerAction('wheel-grip');
                }}
                onMouseDown={function (e) {
                  if (isActive('wheel')) {
                    dragging.current = true;
                    dragStartX.current = e.clientX;
                    e.preventDefault();
                  } else if (isActive('wheel-grip')) {
                    triggerAction('wheel-grip');
                  }
                }}
                onTouchStart={function (e) {
                  if (isActive('wheel')) {
                    dragging.current = true;
                    dragStartX.current = e.touches[0].clientX;
                  } else if (isActive('wheel-grip')) {
                    triggerAction('wheel-grip');
                  }
                }}
              />
            </div>

            {/* Gear shifter */}
            <div style={{ flexShrink: 0 }}>
              <SimGearShifter
                activeGearDown={isActive('gear-down')}
                doneGearDown={isDone('gear-down')}
                onGearDown={function () {
                  triggerAction('gear-down');
                }}
              />
            </div>
          </div>

          {/* Row 3: Pedals */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 8 }}>
            <SimPedals
              activeBrake={isActive('brake')}
              activeGas={isActive('gas')}
              doneBrake={isDone('brake')}
              doneGas={isDone('gas')}
              onBrakeClick={function () {
                triggerAction('brake');
              }}
              onGasClick={function () {
                triggerAction('gas');
              }}
            />
          </div>
        </div>
      </div>

      {/* Feedback overlay */}
      {feedback && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            background: feedback === 'success' ? 'rgba(21,128,61,0.97)' : 'rgba(185,28,28,0.97)',
            borderRadius: 22,
            padding: '20px 32px',
            zIndex: 9999,
            textAlign: 'center',
            boxShadow: '0 24px 70px rgba(0,0,0,0.8)',
            minWidth: 220,
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 38, marginBottom: 8, lineHeight: 1 }}>
            {feedback === 'success' ? '\u2713' : '\u2717'}
          </div>
          <div style={{ color: 'white', fontWeight: 800, fontSize: 14, lineHeight: 1.6 }}>
            {feedback === 'success' ? step.successMsg : '不是這個，再試試！'}
          </div>
        </div>
      )}

      {/* Completion card */}
      {allDone && (
        <div className="anim-fade" style={{ marginTop: 14 }}>
          <div
            style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: 20,
              padding: 22,
              marginBottom: 14,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 46, marginBottom: 10 }}>🎉</div>
            <div style={{ color: '#4ade80', fontWeight: 900, fontSize: 18, marginBottom: 6 }}>
              模擬完成！
            </div>
            <div style={{ color: '#64748b', fontSize: 13 }}>你成功完成所有緊急應變步驟</div>
          </div>
          <button
            onClick={onComplete}
            style={{
              width: '100%',
              padding: '14px 0',
              background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              border: 'none',
              borderRadius: 16,
              color: 'white',
              fontWeight: 900,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(34,197,94,0.35)',
            }}
          >
            查看最終成績 →
          </button>
        </div>
      )}
    </div>
  );
};

export default SimulationPhase;
