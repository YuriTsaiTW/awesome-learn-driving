export interface StoryCharacter {
  avatar: string;
  name: string;
  age: number;
  role: string;
}

export interface Story {
  character: StoryCharacter;
  time: string;
  location: string;
  narrative: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  icon: string;
  correct?: boolean;
}

export interface Decision {
  question: string;
  options: DecisionOption[];
  correctExplanation: string;
  wrongExplanation: Record<string, string>;
}

export interface Step {
  icon: string;
  title: string;
  desc: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export type ScenarioId =
  | 'highway-breakdown'
  | 'tire-blowout'
  | 'heavy-rain-fog'
  | 'rear-end-collision'
  | 'brake-failure'
  | 'narrow-road';

export interface Scenario {
  id: ScenarioId;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: string;
  difficultyColor: string;
  accent: string;
  description: string;
  story: Story;
  decision: Decision;
  steps: Step[];
  quiz: QuizQuestion[];
}

export type Phase =
  | 'intro'
  | 'decision'
  | 'consequence'
  | 'learning'
  | 'quiz'
  | 'simulation'
  | 'result'
  | 'pick';
