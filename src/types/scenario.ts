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
  | 'narrow-road'
  | 'intersection-crash'
  | 'scooter-weaving'
  | 'drowsy-driving'
  | 'hydroplaning'
  | 'right-turn-motorcycle'
  | 'left-turn-oncoming'
  | 'cold-weather-cat-check'
  | 'wildlife-road';

export interface Scenario {
  id: ScenarioId;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: string;
  difficultyColor: string;
  accent: string;
  /** Estimated annual accident count in Taiwan (used for frequency sort) */
  annualFrequency: number;
  /** Explanation of data source and calculation method */
  frequencyNote: string;
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
