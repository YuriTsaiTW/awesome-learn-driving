// GA4 analytics helpers
// Requires gtag to be loaded via index.html before use.

declare global {
  interface Window {
    dataLayer: unknown[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

function track(eventName: string, params?: Record<string, unknown>) {
  window.gtag?.('event', eventName, params);
}

export function trackPageView(path: string) {
  track('page_view', {
    page_path: path,
    page_location: window.location.href,
  });
}

export function trackScenarioStart(scenarioId: string, scenarioTitle: string) {
  track('scenario_start', {
    scenario_id: scenarioId,
    scenario_title: scenarioTitle,
  });
}

export function trackPhaseEnter(scenarioId: string, phase: string, review: boolean) {
  track('phase_enter', {
    scenario_id: scenarioId,
    phase,
    review,
  });
}

export function trackDecision(scenarioId: string, correct: boolean) {
  track('decision_made', {
    scenario_id: scenarioId,
    correct,
  });
}

export function trackQuizComplete(scenarioId: string, score: number, total: number) {
  track('quiz_complete', {
    scenario_id: scenarioId,
    score,
    total,
    pass: score / total >= 0.75,
  });
}

export function trackSimulationComplete(scenarioId: string) {
  track('simulation_complete', {
    scenario_id: scenarioId,
  });
}

export function trackScenarioComplete(scenarioId: string) {
  track('scenario_complete', {
    scenario_id: scenarioId,
  });
}

export function trackExamStart(totalQuestions: number, categories: string[]) {
  track('exam_start', {
    total_questions: totalQuestions,
    categories: categories.join(','),
  });
}

export function trackExamComplete(correctCount: number, totalQuestions: number) {
  track('exam_complete', {
    correct_count: correctCount,
    total_questions: totalQuestions,
    score_pct: Math.round((correctCount / totalQuestions) * 100),
    pass: correctCount / totalQuestions >= 0.6,
  });
}
