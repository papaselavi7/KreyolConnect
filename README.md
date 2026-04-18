# KreyolConnect
The #1 trusted digital companion for Haitian immigrants and Haitian Americans living in the United States.

## Architecture
This project is built as a Turborepo monorepo:
- **`apps/mobile`**: React Native (Expo) app.
- **`apps/web`**: Next.js 15 PWA.
- **`backend`**: Node.js + Express + Prisma (PostgreSQL).
- **`packages/*`**: Shared UI, types, API clients, and i18n configurations.

## Getting Started
1. Run `npm install` at the root.
2. Copy `.env.example` to `.env` in the respective apps and backend and populate keys.
3. Run `npx prisma db push` inside `backend/` to sync the local database schemas.
4. Run `npm run dev` to start all applications simultaneously via Turbo.

## Environment Variables
See the `.env.example` file for a list of required API keys and connection strings needed to orchestrate Authentication (Supabase), Payments (Stripe), AI (Gemini), and Notifications (OneSignal/Expo).
