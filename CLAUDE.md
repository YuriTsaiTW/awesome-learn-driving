# CLAUDE.md

## Project Overview

台灣駕駛緊急應變互動訓練 — 單頁式 React 應用，模擬六大駕駛緊急情境，透過情境故事、決策、後果、教學、測驗、模擬、結果七個階段進行互動學習。

- **Demo**: https://yuritsaitw.github.io/awesome-learn-driving/
- **Repo**: https://github.com/YuriTsaiTW/awesome-learn-driving

## Tech Stack

- 單一 HTML 檔 (`index.html`，約 3300 行)
- React 18 + Babel Standalone (JSX in-browser transpile) + Tailwind CSS，皆透過 CDN 載入
- 無 build step、無 bundler、無 node_modules — 純靜態部署

## Development

- **修改程式碼**：直接編輯 `index.html`
- **本地預覽**：用任何靜態伺服器開啟 `index.html`（例如 `npx serve .` 或 `python3 -m http.server`）
- **部署**：push 到 `main` branch 後由 GitHub Actions (`deploy.yml`) 自動部署至 GitHub Pages

## Architecture

### 情境 (Scenarios)

6 個情境，各有對應的資料結構：

1. `highway-breakdown` — 高速公路拋錨
2. `tire-blowout` — 爆胎
3. `heavy-rain-fog` — 大雨濃霧
4. `rear-end-collision` — 追尾碰撞
5. `brake-failure` — 煞車失靈
6. `narrow-road` — 窄路會車

### 資料流

`SCENARIOS` → `SCENE_COMPONENTS` → `STEP_ANIMS` → `DA_OPTS` → `SIM_STEPS` → `SIM_CONFIGS`

### Phase 流程

`intro → decision → consequence → learning → quiz → simulation → result`

完成後進入 `pick` phase（ReviewPicker），可選擇複習任一階段。

### 重要慣例

- React hooks 必須明確 destructure：`const { useState, useEffect, useRef } = React;`
- Stale closure 問題使用 ref pair 解決（如 `stepIdxRef`, `cockpitRef`）
- 所有程式碼都在同一個 `index.html` 內，以註解分隔區塊

## Code Style

- 繁體中文 UI 文字
- Commit message 使用英文，遵循 conventional commits 格式
- 偏好 `function` 關鍵字而非箭頭函式（event handler 內聯除外）
