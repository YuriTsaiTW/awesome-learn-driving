import { useState } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import type { Scenario } from './types/scenario';
import type { ExamProgress, ExamSession } from './types/exam';
import { SCENARIOS } from './data/scenarios';
import {
  loadCompletedScenarios,
  saveCompletedScenarios,
  loadExamProgress,
  saveExamProgress,
  loadExamSession,
  saveExamSession,
  clearExamSession,
} from './utils/storage';
import AppLayout from './components/AppLayout';
import HomeScreen from './components/HomeScreen';
import ScenarioFlow from './components/ScenarioFlow';
import ExamDashboard from './components/exam/ExamDashboard';
import ExamConfig from './components/exam/ExamConfig';
import ExamTest from './components/exam/ExamTest';
import ExamResult from './components/exam/ExamResult';

interface ScenarioRouteProps {
  completed: string[];
  onComplete: (id: string) => void;
}

function ScenarioRoute({ completed, onComplete }: ScenarioRouteProps) {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const scenario = SCENARIOS.find((sc) => sc.id === scenarioId);

  if (!scenario) return <Navigate to="/" replace />;

  return (
    <ScenarioFlow
      key={scenarioId}
      scenario={scenario}
      onBack={function () {
        navigate('/');
      }}
      onComplete={onComplete}
      isCompleted={completed.includes(scenario.id)}
    />
  );
}

function App() {
  const [completed, setCompleted] = useState<string[]>(() => loadCompletedScenarios());
  const [examProgress, setExamProgress] = useState<ExamProgress>(() => loadExamProgress());
  const [examSession, setExamSession] = useState<ExamSession | null>(() => loadExamSession());
  const navigate = useNavigate();

  const complete = (id: string) =>
    setCompleted(function (prev) {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveCompletedScenarios(next);
      return next;
    });

  const select = (sc: Scenario) => navigate(`/scenario/${sc.id}`);

  function updateExamProgress(progress: ExamProgress) {
    setExamProgress(progress);
    saveExamProgress(progress);
  }

  function updateExamSession(session: ExamSession | null) {
    setExamSession(session);
    if (session) {
      saveExamSession(session);
    } else {
      clearExamSession();
    }
  }

  function clearProgress() {
    const fresh: ExamProgress = { questionStatus: {}, bookmarkedIds: [], history: [] };
    updateExamProgress(fresh);
  }

  return (
    <AppLayout completed={completed}>
      <Routes>
        <Route path="/" element={<HomeScreen onSelect={select} completed={completed} />} />
        <Route
          path="/scenario/:scenarioId"
          element={<ScenarioRoute completed={completed} onComplete={complete} />}
        />
        <Route
          path="/exam"
          element={
            <ExamDashboard
              progress={examProgress}
              session={examSession}
              onClearProgress={clearProgress}
            />
          }
        />
        <Route
          path="/exam/config"
          element={
            <ExamConfig
              progress={examProgress}
              onStart={function (session) {
                updateExamSession(session);
                navigate('/exam/test');
              }}
            />
          }
        />
        <Route
          path="/exam/test"
          element={
            examSession && !examSession.completed ? (
              <ExamTest
                session={examSession}
                progress={examProgress}
                onUpdate={function (session, progress) {
                  updateExamSession(session);
                  updateExamProgress(progress);
                }}
                onComplete={function (session, progress) {
                  updateExamSession(session);
                  updateExamProgress(progress);
                  navigate('/exam/result');
                }}
                onPause={function () {
                  navigate('/exam');
                }}
              />
            ) : (
              <Navigate to="/exam" replace />
            )
          }
        />
        <Route
          path="/exam/result"
          element={
            examSession && examSession.completed ? (
              <ExamResult
                session={examSession}
                progress={examProgress}
                onRetry={function () {
                  navigate('/exam/config');
                }}
                onRetryWrong={function (session) {
                  updateExamSession(session);
                  navigate('/exam/test');
                }}
                onHome={function () {
                  navigate('/exam');
                }}
              />
            ) : (
              <Navigate to="/exam" replace />
            )
          }
        />
      </Routes>
    </AppLayout>
  );
}

export default App;
