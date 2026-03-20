# awesome-learn-driving

**Also called:** driving app, 駕訓 app
**Status:** Active

## What It Is
台灣駕駛緊急應變互動訓練單頁應用。六大情境模擬學習，含情境故事、決策、後果、教學、測驗、模擬、結果七個階段。

## Tech Stack
- Single-file HTML app (index.html, ~3300 lines)
- React 18 (CDN), Babel Standalone (JSX), Tailwind CSS (CDN)
- 無 build step，純靜態部署

## Paths
| Where | Path |
|-------|------|
| Local repo | `/Users/tsaiyu/GitHub/awesome-learn-driving` |
| Workspace (VM mount) | `/sessions/.../mnt/awesome-learn-driving` |
| Main file | `index.html` (原名 driving-app.html) |

## GitHub
| Item | Value |
|------|-------|
| Repo | https://github.com/YuriTsaiTW/awesome-learn-driving |
| Pages URL | https://yuritsaitw.github.io/awesome-learn-driving/ |
| Branch | main |
| Deploy | GitHub Actions (`deploy.yml`) — push to main 自動部署 |
| GitHub 帳號 | YuriTsaiTW |

## Scenarios (6 個)
1. `highway-breakdown` 高速公路拋錨
2. `tire-blowout` 爆胎
3. `heavy-rain-fog` 大雨濃霧
4. `rear-end-collision` 追尾碰撞
5. `brake-failure` 煞車失靈
6. `narrow-road` 窄路會車

## Key Architecture Notes
- `const { useState, useEffect, useRef } = React;` — hooks 必須明確 destructure
- `SCENARIOS` array → `SCENE_COMPONENTS` → `STEP_ANIMS` → `DA_OPTS` → `SIM_STEPS` → `SIM_CONFIGS` 各自對應
- Phases: `intro → decision → consequence → learning → quiz → simulation → result`
- 完成後可複習：`phase = 'pick'`（ReviewPicker）
- Stale closure 用 ref pair 解決（stepIdxRef, cockpitRef 等）
