# CLAUDE.md

## Project Overview

台灣駕駛緊急應變互動訓練 — 單頁式 React 應用，模擬六大駕駛緊急情境，透過情境故事、決策、後果、教學、測驗、模擬、結果七個階段進行互動學習。

- **Demo**: https://yuritsaitw.github.io/awesome-learn-driving/
- **Repo**: https://github.com/YuriTsaiTW/awesome-learn-driving

## Project Concept & Design Philosophy

**awesome-learn-driving** is a Taiwan-focused interactive driving emergency training app.
The core idea: most drivers know traffic rules but panic in real emergencies.
This app bridges that gap through scenario-based experiential learning.

### Learning Loop (7 phases per scenario)

1. **intro** — Story-driven narrative with a character, time, location, and suspenseful situation
2. **decision** — 3-choice multiple choice; one correct, two plausible-but-wrong
3. **consequence** — Animated illustration showing outcome of the chosen decision
4. **learning** — Step-by-step correct procedure with icon + description per step
5. **quiz** — 4 knowledge questions testing comprehension of the procedure
6. **simulation** — Immersive first-person cockpit mini-game; click/drag real controls in the correct sequence
7. **result** — Score summary with pass/fail feedback and XP-style encouragement

### Design Principles

- **Character-driven**: each scenario stars a different Taiwanese character (age, role, region)
  to build empathy and make situations feel real
- **SVG-first**: all illustrations (scenes, step animations, decision options, cockpit) are
  hand-coded SVGs — no image assets, instant load, fully responsive
- **Zero build step**: single HTML file, CDN-only (React 18, Babel Standalone, Tailwind CSS)
  — anyone can open it locally or deploy it as a static page
- **Review mode**: completed scenarios unlock a phase picker (ReviewPicker) so users can
  jump directly to any phase for review without replaying the full flow

### Simulation Design

- First-person cockpit POV: windshield SVG, steering wheel (drag), gear shifter, pedals,
  dashboard buttons (hazard, fog, horn), left stalk buttons (scenario-specific)
- Each scenario defines its own `SIM_STEPS` (ordered actions) and `SIM_CONFIGS`
  (initial cockpit state, button labels/icons/colors)
- Inputs: click buttons, drag wheel, click pedals — plus keyboard shortcuts
- Stale closure solved via ref pairs: every stateful value used in event listeners
  has a corresponding `useRef` kept in sync

### Scenario Coverage

| ID                   | Title        | Key Skill                                               |
| -------------------- | ------------ | ------------------------------------------------------- |
| `highway-breakdown`  | 高速公路拋錨 | Hazard lights → shoulder → triangle → call              |
| `tire-blowout`       | 爆胎         | Grip wheel → lift gas → hazard → shoulder → call        |
| `heavy-rain-fog`     | 大雨濃霧     | Fog lights → slow down → hazard → pull over             |
| `rear-end-collision` | 追尾碰撞     | Hazard → photo → move → police/insurance                |
| `brake-failure`      | 煞車失靈     | Pump brake → downshift → hazard → safe spot → handbrake |
| `narrow-road`        | 窄路會車     | Brake → pull right → headlights → horn signal           |

### Adding a New Scenario Checklist

9 insertion points across the source files:

1. `src/data/scenarios.ts` — `SCENARIOS` array (story, decision, steps, quiz)
2. `src/data/scene-components.tsx` — `<SceneName>Scene` SVG component
3. `src/data/scene-components.tsx` — `SCENE_COMPONENTS` map
4. `src/data/step-animations.tsx` — Step animation SVG components (`SA<Name>`)
5. `src/data/step-animations.tsx` — `STEP_ANIMS` map
6. `src/data/sim-steps.ts` — `SIM_STEPS` entry
7. `src/data/sim-configs.ts` — `SIM_CONFIGS` entry
8. `src/data/decision-animations.tsx` — Decision animation SVG components (`DA_<ID>_A/B/C`)
9. `src/data/decision-animations.tsx` — `DA_OPTS` map

## Tech Stack

- **Build**: Vite + `@vitejs/plugin-react` + `@tailwindcss/vite`
- **Language**: TypeScript (strict mode)
- **UI**: React 18 + Tailwind CSS v4
- **Linting**: ESLint v9 (flat config) + Prettier
- **Pre-commit**: Husky + lint-staged
- **Deploy**: GitHub Actions → GitHub Pages (from `dist/`)

## Project Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Root component (home / scenario view)
├── index.css                   # Keyframes + global styles
├── types/
│   ├── scenario.ts             # Scenario, Phase, Decision, Step, Quiz types
│   └── simulation.ts           # CockpitState, SimStep, SimConfig types
├── constants/
│   └── phases.ts               # PHASES, PHASE_LABELS, REVIEW_PHASES
├── data/
│   ├── scenarios.ts            # SCENARIOS array (6 scenarios)
│   ├── scene-components.tsx    # 6 SVG scene components + map
│   ├── step-animations.tsx     # ~24 SVG step animation components + map
│   ├── decision-animations.tsx # 18 DA components + map
│   ├── sim-steps.ts            # SIM_STEPS per scenario
│   └── sim-configs.ts          # SIM_CONFIGS + defaults
└── components/
    ├── TypewriterText.tsx       # Character-by-character text animation
    ├── PhaseBar.tsx             # 7-phase progress indicator
    ├── HomeScreen.tsx           # Landing page with scenario cards
    ├── IntroPhase.tsx           # Story intro with scene + narrative
    ├── DecisionPhase.tsx        # 3-option decision UI
    ├── ConsequencePhase.tsx     # Correct/wrong feedback
    ├── LearningPhase.tsx        # Step-by-step teaching
    ├── QuizPhase.tsx            # Multiple choice quiz
    ├── ResultPhase.tsx          # Score/grade display
    ├── ReviewPicker.tsx         # Phase picker for review
    ├── ScenarioFlow.tsx         # Phase router
    └── simulation/
        ├── SimulationPhase.tsx  # Simulation orchestrator
        ├── SimWindshield.tsx    # Road POV SVG
        ├── SimSpeedometer.tsx   # Gauge SVG
        ├── SimButton.tsx        # Dashboard toggle button
        ├── SimWheel.tsx         # Interactive steering wheel
        ├── SimGearShifter.tsx   # Gear shifter
        └── SimPedals.tsx        # Brake + gas pedals
```

## Development

- **Dev server**: `npm run dev` (Vite, port 5173)
- **Build**: `npm run build` (TypeScript check + Vite production build → `dist/`)
- **Lint**: `npm run lint` / **Format**: `npm run format`
- **Deploy**: push 到 `main` branch 後由 GitHub Actions 自動 build + deploy 至 GitHub Pages

## Architecture

### 資料流

`SCENARIOS` → `SCENE_COMPONENTS` → `STEP_ANIMS` → `DA_OPTS` → `SIM_STEPS` → `SIM_CONFIGS`

### Phase 流程

`intro → decision → consequence → learning → quiz → simulation → result`

完成後進入 `pick` phase（ReviewPicker），可選擇複習任一階段。

### 重要慣例

- Stale closure 問題使用 ref pair 解決（如 `stepIdxRef`, `cockpitRef`）
- SVG 組件保留 inline styles（Tailwind 不適用於 SVG 座標屬性）
- 所有 SVG `<defs>` ID 須跨檔案保持唯一

## Code Style

- 繁體中文 UI 文字
- Commit message 使用英文，遵循 conventional commits 格式
- 偏好 `function` 關鍵字而非箭頭函式（event handler 內聯除外）
