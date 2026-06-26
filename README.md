# KidLearn Classroom

KidLearn Classroom is a modern, Google Classroom–inspired learning platform for Year 1–2 students with gamified learning, bilingual UI (English/Russian), real-time "World Islands" multiplayer game worlds, teacher tools, house-points, music and announcements.

This repository contains an initial scaffold (frontend + backend + games + docs) to start development and deployment to Railway and Supabase.

What’s in this initial commit

- README and SUMMARY_SHEET (project one-page summary)
- MIT LICENSE
- .env.example with Supabase placeholders
- Frontend scaffold (Vite + React + TypeScript) placeholder files
- Backend scaffold (Node + TypeScript + Express) placeholder files
- Docs (architecture, deployment, testing plan)
- GitHub Actions CI skeleton

Quick start (local development)

1. Create a Supabase project and copy the SUPABASE_URL and SUPABASE_ANON_KEY values into `.env` (see `.env.example`).
2. Install dependencies for frontend and backend:
   - cd frontend && npm install
   - cd backend && npm install
3. Run frontend (development): npm run dev
4. Run backend (development): npm run dev

See /docs for detailed deployment and testing instructions.
