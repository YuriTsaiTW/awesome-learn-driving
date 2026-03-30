# Awesome Learn Driving

**[Demo](https://yuritsaitw.github.io/awesome-learn-driving/)**

## 開發動機

最近想學開車，但如果沒把大部分的緊急事件先模擬演練過，就算在駕訓班認真上課、沒有拿雞腿換駕照，到時候真的發生狀況了，很難相信我的臨場反應會幫我度過難關😂

所以我請 Claude 根據想像和需求，做了一個可以在安全的螢幕前，把各種突發的駕駛情境都先走過一遍的互動訓練工具，另外也能優化筆試的備考體驗和效率。

## 技術架構

- **Build**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint + Prettier + Husky pre-commit hooks
- **Deploy**: GitHub Actions → GitHub Pages

以上是根據我熟悉的技術棧指揮 Claude 去做開發，之後如果有需求的變更或擴充，可能會再作調整。

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 程式碼檢查
npm run lint

# 格式化
npm run format
```

## 授權

MIT
