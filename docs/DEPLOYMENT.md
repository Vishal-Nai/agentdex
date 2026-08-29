# Deployment

AgentDex deploys on Vercel from this repository.

- Every push to `main` triggers a production deployment on the linked Vercel project.
- `vercel.json` defines the daily cron (`/api/refresh` at 06:00 UTC) that powers the refresh agent.
- Optional environment variables:
  - `GITHUB_TOKEN` — raises GitHub API rate limits for the refresh agent.
  - `CRON_SECRET` — protects `/api/refresh`; Vercel cron sends it automatically.
