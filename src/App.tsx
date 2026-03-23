import { useState } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import type { Scenario } from './types/scenario';
import { SCENARIOS } from './data/scenarios';
import HomeScreen from './components/HomeScreen';
import ScenarioFlow from './components/ScenarioFlow';

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
      scenario={scenario}
      onBack={() => navigate('/')}
      onComplete={onComplete}
      isCompleted={completed.includes(scenario.id)}
    />
  );
}

function App() {
  const [completed, setCompleted] = useState<string[]>([]);
  const navigate = useNavigate();

  const complete = (id: string) =>
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const select = (sc: Scenario) => navigate(`/scenario/${sc.id}`);

  return (
    <Routes>
      <Route path="/" element={<HomeScreen onSelect={select} completed={completed} />} />
      <Route
        path="/scenario/:scenarioId"
        element={<ScenarioRoute completed={completed} onComplete={complete} />}
      />
    </Routes>
  );
}

export default App;
