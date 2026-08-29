# AgentDex

**Every AI coding tool. One directory.**

AgentDex is the all-in-one directory for the AI coding ecosystem — the kind of
place [botdirectory.ai](https://botdirectory.ai/) is for bots, but covering
everything in one spot:

- **AI Bots & Agents** — Cursor Agents, Bugbot, Grok, Claude Code, Codex, Gemini CLI, Aider, Cline, and more
- **Cursor Plugins** — the official Cursor Marketplace catalog, scraped live
- **Agent Skills** — skill libraries and registries (Anthropic skills, Superpowers, skills.sh, …)
- **MCP Servers** — the most-used Model Context Protocol servers, ranked by GitHub stars

## How the data stays fresh

A built-in **refresh agent** pulls the latest data once a day:

1. A Vercel cron job (`vercel.json`) hits `/api/refresh` daily at 06:00 UTC.
2. The route revalidates the cached upstream data and rebuilds the snapshot from:
   - **GitHub Search API** — trending repos per category (topics: `coding-agent`, `cursor`, `agent-skills`, `claude-skills`, `mcp-server`) plus live star counts for the curated catalog
   - **Cursor Marketplace** — the full official plugin listing, parsed from `cursor.com/marketplace`
3. A curated seed catalog (`src/data/seed.ts`) guarantees the directory is never
   empty — if every live source fails, the site still works. Live data only
   enriches and extends it.

The full dataset is also available as JSON at `/api/directory`
(optionally filtered: `/api/directory?category=mcp`).

## Running locally

```bash
npm install
npm run dev   # serves on http://localhost:4923
```

No credentials required. Optional environment variables:

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Raises GitHub API rate limits (60 → 5000 req/h). Not needed for daily refresh volume. |
| `CRON_SECRET` | When set, `/api/refresh` requires it as a bearer token. Vercel cron sends it automatically. |

## Stack

- [Next.js 16](https://nextjs.org) (App Router, ISR) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- Vercel cron for the daily refresh agent

## Roadmap

- **Phase 2 — Sponsorships**: the sponsor slot is already provisioned
  (`sponsorsEnabled` in `src/lib/config.ts` and the `sponsored` field on every
  item) but intentionally disabled for now.
- Submission flow for community tools
- Per-tool detail pages with install instructions
