# Browser Nav

LIFO stack-based browser navigation system. Node/Express backend + React/Shadcn frontend. Vercel-ready.

## Tech Stack
- Backend: Node, Express, TypeScript (Vercel Serverless)
- Frontend: Vite, React, TypeScript, Shadcn UI, Tailwind
- Deploy: Vercel

## Quick Start

### Backend (Local)
```bash
cd api
npm install
npx tsc  # Compile TS
node dist/index.js  # Runs on :3000
```

### Frontend (Local)
```bash
cd frontend
npm install
npm run dev  # Runs on :5173
```

### Deploy to Vercel
1. Push to GitHub
2. Import repo in Vercel
3. Auto-deploys

## Spec Workflow
| Action | Back | Curr | Fwd |
|--------|------|------|-----|
| VISIT google.com | [] | google.com | [] |
| VISIT youtube.com | [google.com] | youtube.com | [] |
| BACK | [] | google.com | [youtube.com] |
| FORWARD | [google.com] | youtube.com | [] |

## Project Structure
```
BrowserNav/
├── api/              # Backend (Vercel serverless)
│   ├── index.ts      # Serverless handler
│   ├── agent.ts      # Stack logic
│   ├── utils.ts      # URL norm
│   └── package.json
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/ # Shadcn UI
│   │   ├── lib/api.ts   # Fetch wrapper
│   │   └── App.tsx
│   └── package.json
└── vercel.json       # Vercel config
```
