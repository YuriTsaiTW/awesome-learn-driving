import { useState } from 'react';
import type { Scenario } from './types/scenario';
import HomeScreen from './components/HomeScreen';
import ScenarioFlow from './components/ScenarioFlow';

const App = () => {
  const [view, setView] = useState<'home' | 'scenario'>('home');
  const [current, setCurrent] = useState<Scenario | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);

  const select = (sc: Scenario) => {
    setCurrent(sc);
    setView('scenario');
  };
  const complete = (id: string) =>
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const back = () => {
    setView('home');
    setCurrent(null);
  };

  if (view === 'scenario' && current) {
    return (
      <ScenarioFlow
        scenario={current}
        onBack={back}
        onComplete={complete}
        isCompleted={completed.includes(current.id)}
      />
    );
  }
  return <HomeScreen onSelect={select} completed={completed} />;
};

export default App;
