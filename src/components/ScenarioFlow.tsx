import { useState, useEffect, useRef } from 'react';
import type { Scenario, DecisionOption, Phase } from '../types/scenario';
import {
  trackScenarioStart,
  trackPhaseEnter,
  trackDecision,
  trackQuizComplete,
  trackSimulationComplete,
  trackScenarioComplete,
} from '../utils/analytics';
import { SIM_STEPS } from '../data/sim-steps';
import PhaseBar from './PhaseBar';
import ReviewPicker from './ReviewPicker';
import IntroPhase from './IntroPhase';
import DecisionPhase from './DecisionPhase';
import ConsequencePhase from './ConsequencePhase';
import LearningPhase from './LearningPhase';
import QuizPhase from './QuizPhase';
import SimulationPhase from './simulation/SimulationPhase';
import ResultPhase from './ResultPhase';

interface ScenarioFlowProps {
  scenario: Scenario;
  onBack: () => void;
  onComplete: (id: string) => void;
  isCompleted: boolean;
}

const ScenarioFlow = ({ scenario, onBack, onComplete, isCompleted }: ScenarioFlowProps) => {
  const [phase, setPhase] = useState<Phase>(isCompleted ? 'pick' : 'intro');
  const [choice, setChoice] = useState<DecisionOption | null>(null);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);

  // Track scenario start once on mount (only for fresh runs, not review)
  const trackedStart = useRef(false);
  useEffect(
    function () {
      if (!isCompleted && !trackedStart.current) {
        trackedStart.current = true;
        trackScenarioStart(scenario.id, scenario.title);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Track phase changes
  useEffect(
    function () {
      if (phase === 'pick') return;
      trackPhaseEnter(scenario.id, phase, isCompleted ?? false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phase],
  );

  const handleDecide = (opt: DecisionOption) => {
    trackDecision(scenario.id, opt.correct ?? false);
    setChoice(opt);
    setPhase('consequence');
  };
  const handleQuizDone = (score: number, total: number) => {
    trackQuizComplete(scenario.id, score, total);
    setQuizResult({ score, total });
    if ((SIM_STEPS[scenario.id]?.length ?? 0) > 0) {
      setPhase('simulation');
    } else {
      trackScenarioComplete(scenario.id);
      setPhase('result');
      onComplete(scenario.id);
    }
  };
  const handleSimDone = () => {
    trackSimulationComplete(scenario.id);
    trackScenarioComplete(scenario.id);
    setPhase('result');
    onComplete(scenario.id);
  };
  const handleRetry = () => {
    setPhase('intro');
    setChoice(null);
    setQuizResult(null);
  };

  // Jump to any phase directly (review mode)
  const handlePick = (targetPhase: string) => {
    // Phases that need prior state: seed sensible defaults
    if (targetPhase === 'consequence') {
      // Show the correct/first option's consequence
      const opts = scenario.decision.options;
      setChoice(
        opts.find(function (o) {
          return o.correct;
        }) || opts[0],
      );
    }
    if (targetPhase === 'result') {
      // Use a full score as placeholder if no real result stored
      if (!quizResult) setQuizResult({ score: scenario.quiz.length, total: scenario.quiz.length });
    }
    setPhase(targetPhase as Phase);
  };

  const handleRestart = () => {
    setPhase('intro');
    setChoice(null);
    setQuizResult(null);
  };

  // Show "複習模式" chip in header when completed and mid-flow
  const inReview = isCompleted && phase !== 'pick';

  return (
    <div className="flow-inner">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <button
          onClick={
            phase === 'pick' || !isCompleted
              ? onBack
              : function () {
                  setPhase('pick');
                }
          }
          style={{
            background: 'transparent',
            border: '1px solid var(--border-base)',
            borderRadius: 12,
            color: 'var(--text-muted)',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: 14,
            transition: 'color 0.15s, border-color 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderColor = 'var(--text-muted)';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderColor = 'var(--border-base)';
          }}
        >
          {phase === 'pick' || !isCompleted ? '\u2190 返回' : '\u2630 選單'}
        </button>
        <div
          style={{
            color: 'var(--text-primary)',
            fontWeight: 800,
            fontSize: 15,
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {scenario.title}
        </div>
        {inReview && (
          <div
            style={{
              background: 'rgba(34,197,94,0.15)',
              border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: 20,
              padding: '3px 10px',
              fontSize: 14,
              color: 'var(--green-light)',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            複習中
          </div>
        )}
      </div>

      {/* Phase bar — hidden on picker screen */}
      {phase !== 'pick' && <PhaseBar phase={phase} />}

      {phase === 'pick' && (
        <ReviewPicker scenario={scenario} onPick={handlePick} onRestart={handleRestart} />
      )}
      {phase === 'intro' && <IntroPhase scenario={scenario} onNext={() => setPhase('decision')} />}
      {phase === 'decision' && <DecisionPhase scenario={scenario} onDecide={handleDecide} />}
      {phase === 'consequence' && choice && (
        <ConsequencePhase scenario={scenario} choice={choice} onNext={() => setPhase('learning')} />
      )}
      {phase === 'learning' && (
        <LearningPhase scenario={scenario} onNext={() => setPhase('quiz')} />
      )}
      {phase === 'quiz' && <QuizPhase scenario={scenario} onComplete={handleQuizDone} />}
      {phase === 'simulation' && <SimulationPhase scenario={scenario} onComplete={handleSimDone} />}
      {phase === 'result' && quizResult && (
        <ResultPhase
          scenario={scenario}
          score={quizResult.score}
          total={quizResult.total}
          onHome={onBack}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
};

export default ScenarioFlow;
