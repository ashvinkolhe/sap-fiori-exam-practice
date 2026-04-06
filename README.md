# SAP Fiori Exam Prep — C_FIORD_2601

A complete, free exam preparation platform for the **new SAP Fiori Application Developer (C_FIORD_2601) Scenario Based Assessment** format.

> **No API needed. No cost. Everything runs offline.**

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
# Output in dist/ folder — deploy to any static host
```

## 🌐 Deploy Options (all free)

### Netlify (recommended)
1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel
1. `npm install -g vercel`
2. `vercel` in project root

### GitHub Pages
1. `npm run build`
2. Deploy `dist/` folder to gh-pages branch

## 📁 Project Structure

```
src/
├── components/
│   └── layout/Layout.jsx     # Sidebar navigation
├── data/
│   ├── tests.js              # All 70+ practice questions + 3 mock exams
│   ├── scenarios.js          # 4 scripted AI roleplay scenarios
│   └── guides.js             # 5 study guide cards
├── hooks/
│   └── useProgress.js        # localStorage progress tracking
├── pages/
│   ├── HomePage.jsx
│   ├── RoleplayPage.jsx      # Scenario list
│   ├── RoleplaySessionPage.jsx # Scripted ARIA conversation
│   ├── PracticeTestsPage.jsx
│   ├── TestSessionPage.jsx   # Question-by-question with explanations
│   ├── MockExamPage.jsx
│   ├── MockExamSessionPage.jsx # Timed full exam
│   ├── StudyGuidesPage.jsx
│   └── DashboardPage.jsx     # Radar + bar charts
├── App.jsx
├── main.jsx
└── index.css
```

## ➕ Adding New Questions

All questions are in `src/data/tests.js`. To add questions to an existing test set:

```js
// In TEST_SETS, find the test set and add to its questions array:
{
  id: 'your_unique_id',
  scenario: 'The context/situation description...',
  question: 'The actual question?',
  choices: ['Option A', 'Option B', 'Option C', 'Option D'],
  correct: 0, // 0-indexed position of correct answer
  difficulty: 'Intermediate', // Beginner | Intermediate | Advanced
  topic: 'Your Topic',
  explanation: 'Detailed explanation of why the answer is correct...',
  keyFact: 'The one key fact to remember', // optional
}
```

## ➕ Adding New Mock Exams

Add to `MOCK_EXAMS` array in `src/data/tests.js`:

```js
{
  id: 'mock4',
  title: 'Mock Exam 4 — Your Title',
  description: 'Brief description',
  totalTime: 35,     // minutes
  passMark: 70,      // percentage
  questions: [/* same format as above */]
}
```

## ➕ Adding New Roleplay Scenarios

Add to `ROLEPLAY_SCENARIOS` in `src/data/scenarios.js`. Each scenario needs:
- `steps[]` array with ARIA questions and keyword-based responses
- `scoringAreas[]` for the results screen

## 🛠 Tech Stack

- **React 18** + React Router v6
- **Tailwind CSS** — styling
- **Recharts** — dashboard charts
- **Lucide React** — icons
- **Vite** — build tooling
- **LocalStorage** — progress persistence (no backend needed)

## 💡 No API Usage

This project uses zero external APIs. The "AI roleplay" uses sophisticated keyword-matching against pre-written ARIA responses — completely free and works offline.

## 📊 Content Overview

| Feature | Count |
|---------|-------|
| Practice questions | 70+ |
| Mock exam questions | 45 |
| Roleplay scenarios | 4 |
| Roleplay steps (ARIA questions) | 22 |
| Study guide sections | 20+ |
| **Total content items** | **160+** |

## 🎓 Exam Format Reference

**C_FIORD_2601 — SAP Fiori Application Developer (new format)**
- Format: Scenario Based Assessment  
- Duration: 2 hours
- Interaction: AI Roleplay avatar OR recorded video
- Open-book: ✅ Yes — use any resources
- Attempts: 4 per 12 months
- Once started: active for 24 hours
