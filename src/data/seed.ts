import type { Category, DirectoryItem } from "@/lib/types";
import { slugify } from "@/lib/types";

/**
 * Curated seed catalog. This is the bulletproof fallback: the app is fully
 * populated even if every live source is unreachable. Live sources enrich
 * these entries (stars, update times) and append newly trending tools.
 */

type SeedInput = Omit<DirectoryItem, "id" | "category" | "source"> & {
  source?: DirectoryItem["source"];
};

function withCategory(category: Category, items: SeedInput[]): DirectoryItem[] {
  return items.map((item) => ({
    ...item,
    id: `${category}-${slugify(item.name)}`,
    category,
    source: item.source ?? "curated",
  }));
}

const bots = withCategory("bots", [
  {
    name: "Cursor Agents",
    description:
      "Cursor's autonomous cloud agents — delegate coding tasks from the editor, web, Slack, or mobile and get back reviewed pull requests.",
    url: "https://cursor.com/agents",
    tags: ["autonomous", "cloud", "cursor"],
    author: "Cursor",
    official: true,
  },
  {
    name: "Cursor Bugbot",
    description:
      "Cursor's AI code-review bot. Catches real bugs, logic issues, and security problems in pull requests before they merge.",
    url: "https://cursor.com/bugbot",
    tags: ["code-review", "ci", "cursor"],
    author: "Cursor",
    official: true,
  },
  {
    name: "Grok",
    description:
      "xAI's Grok assistant and the Grok Code family of coding models — fast agentic coding available in Cursor and other editors.",
    url: "https://x.ai",
    tags: ["xai", "grok", "models"],
    author: "xAI",
    official: true,
  },
  {
    name: "GitHub Copilot",
    description:
      "GitHub's AI developer platform: code completion, chat, and an autonomous coding agent that works issues into pull requests.",
    url: "https://github.com/features/copilot",
    tags: ["completion", "agent", "github"],
    author: "GitHub",
    official: true,
  },
  {
    name: "Claude Code",
    description:
      "Anthropic's agentic coding tool that lives in your terminal — understands your codebase and executes multi-step engineering tasks.",
    url: "https://github.com/anthropics/claude-code",
    repo: "anthropics/claude-code",
    tags: ["terminal", "agent", "anthropic"],
    author: "Anthropic",
    official: true,
  },
  {
    name: "OpenAI Codex",
    description:
      "OpenAI's coding agent — a lightweight CLI and cloud agent that writes, reviews, and refactors code from natural-language tasks.",
    url: "https://github.com/openai/codex",
    repo: "openai/codex",
    tags: ["terminal", "agent", "openai"],
    author: "OpenAI",
    official: true,
  },
  {
    name: "Gemini CLI",
    description:
      "Google's open-source AI agent that brings Gemini directly into your terminal for coding, research, and automation.",
    url: "https://github.com/google-gemini/gemini-cli",
    repo: "google-gemini/gemini-cli",
    tags: ["terminal", "agent", "google"],
    author: "Google",
    official: true,
  },
  {
    name: "Jules",
    description:
      "Google's asynchronous coding agent — assign it bugs and feature requests and it works in the background on a full repo checkout.",
    url: "https://jules.google",
    tags: ["autonomous", "async", "google"],
    author: "Google",
    official: true,
  },
  {
    name: "Devin",
    description:
      "Cognition's autonomous AI software engineer — plans, codes, tests, and ships complete engineering tasks end to end.",
    url: "https://devin.ai",
    tags: ["autonomous", "cloud"],
    author: "Cognition",
    official: true,
  },
  {
    name: "Aider",
    description:
      "AI pair programming in your terminal. Works with your local git repo and virtually any LLM, with strong editing benchmarks.",
    url: "https://github.com/Aider-AI/aider",
    repo: "Aider-AI/aider",
    tags: ["terminal", "open-source", "pair-programming"],
  },
  {
    name: "Cline",
    description:
      "Open-source autonomous coding agent for your IDE — creates and edits files, runs commands, and uses the browser with your approval.",
    url: "https://github.com/cline/cline",
    repo: "cline/cline",
    tags: ["ide", "open-source", "agent"],
  },
  {
    name: "Roo Code",
    description:
      "A whole dev team of AI agents in your editor — multiple specialized modes for coding, architecture, debugging, and more.",
    url: "https://github.com/RooCodeInc/Roo-Code",
    repo: "RooCodeInc/Roo-Code",
    tags: ["ide", "open-source", "multi-agent"],
  },
  {
    name: "OpenHands",
    description:
      "Open-source platform for AI software developers: agents that modify code, run commands, browse the web, and call APIs.",
    url: "https://github.com/OpenHands/OpenHands",
    repo: "OpenHands/OpenHands",
    tags: ["open-source", "platform", "agent"],
  },
  {
    name: "opencode",
    description:
      "Open-source AI coding agent built for the terminal, with a responsive TUI and support for many model providers.",
    url: "https://github.com/anomalyco/opencode",
    repo: "anomalyco/opencode",
    tags: ["terminal", "open-source", "tui"],
  },
  {
    name: "Goose",
    description:
      "Block's open-source, extensible AI agent that goes beyond suggestions — installs, executes, edits, and tests with any LLM.",
    url: "https://github.com/aaif-goose/goose",
    repo: "aaif-goose/goose",
    tags: ["open-source", "extensible", "agent"],
  },
  {
    name: "Qwen Code",
    description:
      "Open-source AI coding agent from the Qwen team that lives in your terminal, tuned for the Qwen-Coder model family.",
    url: "https://github.com/QwenLM/qwen-code",
    repo: "QwenLM/qwen-code",
    tags: ["terminal", "open-source", "qwen"],
  },
  {
    name: "Amazon Q Developer",
    description:
      "AWS's generative-AI assistant for software development — agentic coding, code transformation, and AWS expertise in your IDE and CLI.",
    url: "https://aws.amazon.com/q/developer/",
    tags: ["aws", "ide", "enterprise"],
    author: "AWS",
    official: true,
  },
  {
    name: "CodeRabbit",
    description:
      "AI code-review bot that reviews every pull request with context-aware, line-by-line feedback and one-click fixes.",
    url: "https://coderabbit.ai",
    tags: ["code-review", "ci"],
    author: "CodeRabbit",
    official: true,
  },
  {
    name: "Greptile",
    description:
      "AI code-review bot with full-codebase context — catches bugs and anti-patterns human reviewers miss.",
    url: "https://greptile.com",
    tags: ["code-review", "ci"],
    author: "Greptile",
    official: true,
  },
]);

const plugins = withCategory("plugins", [
  {
    name: "Vercel",
    description:
      "Build and deploy web apps and agents — deployment workflows, environment management, and Vercel platform skills for Cursor.",
    url: "https://cursor.com/marketplace/vercel",
    tags: ["deployment", "hosting", "mcp"],
    author: "Vercel",
    official: true,
  },
  {
    name: "Supabase",
    description:
      "Access your Supabase projects and perform tasks like managing tables, fetching config, and querying data.",
    url: "https://cursor.com/marketplace/supabase",
    tags: ["database", "auth", "mcp"],
    author: "Supabase",
    official: true,
  },
  {
    name: "Stripe",
    description:
      "Stripe integrations with best practices, API/SDK upgrade guidance, and the Stripe MCP server.",
    url: "https://cursor.com/marketplace/stripe",
    tags: ["payments", "mcp", "skills"],
    author: "Stripe",
    official: true,
  },
  {
    name: "Sentry",
    description:
      "Debugging help for Cursor including MCP and skill capabilities for error monitoring and triage.",
    url: "https://cursor.com/marketplace/sentry",
    tags: ["observability", "debugging", "mcp"],
    author: "Sentry",
    official: true,
  },
  {
    name: "Linear",
    description:
      "Manage issues, projects, documents, and more across your Linear workspace directly from the agent.",
    url: "https://cursor.com/marketplace/linear",
    tags: ["project-management", "issues", "mcp"],
    author: "Linear",
    official: true,
  },
  {
    name: "Figma",
    description:
      "Includes the Figma MCP server and skills for common design-to-code workflows.",
    url: "https://cursor.com/marketplace/figma",
    tags: ["design", "mcp", "skills"],
    author: "Figma",
    official: true,
  },
  {
    name: "Playwright",
    description:
      "Navigate, click, screenshot, and test in a real browser — browser automation for your agent.",
    url: "https://cursor.com/marketplace/cursor/playwright",
    tags: ["testing", "browser", "automation"],
    author: "Cursor",
    official: true,
  },
  {
    name: "Notion",
    description:
      "Notion skills plus the Notion MCP server packaged as a Cursor plugin.",
    url: "https://cursor.com/marketplace/notion",
    tags: ["docs", "knowledge", "mcp"],
    author: "Notion",
    official: true,
  },
  {
    name: "Slack",
    description:
      "Slack MCP server — search channels, send messages, and perform other Slack actions from the agent.",
    url: "https://cursor.com/marketplace/slack",
    tags: ["communication", "mcp"],
    author: "Slack",
    official: true,
  },
  {
    name: "Atlassian",
    description:
      "MCP and skills for Jira, Confluence, triage, backlogs, status reports, and more.",
    url: "https://cursor.com/marketplace/atlassian/atlassian",
    tags: ["jira", "confluence", "mcp"],
    author: "Atlassian",
    official: true,
  },
  {
    name: "Cloudflare",
    description:
      "Skills for the Cloudflare developer platform: Workers, Durable Objects, Agents SDK, MCP servers, and Wrangler CLI.",
    url: "https://cursor.com/marketplace/cloudflare",
    tags: ["edge", "workers", "skills"],
    author: "Cloudflare",
    official: true,
  },
  {
    name: "Convex",
    description:
      "Official Convex plugin — reactive backend development with TypeScript, including rules, skills, MCP integration, and hooks.",
    url: "https://cursor.com/marketplace/convex",
    tags: ["backend", "database", "mcp"],
    author: "Convex",
    official: true,
  },
  {
    name: "Firebase",
    description:
      "The official Firebase Cursor plugin. Prototype, build, and run modern apps with Firebase's backend and AI infrastructure.",
    url: "https://cursor.com/marketplace/firebase",
    tags: ["backend", "google", "mcp"],
    author: "Firebase",
    official: true,
  },
  {
    name: "Neon Postgres",
    description:
      "Manage your Neon projects, databases, and branches with the Neon agent skills and the Neon MCP Server.",
    url: "https://cursor.com/marketplace/neon",
    tags: ["database", "postgres", "mcp"],
    author: "Neon",
    official: true,
  },
  {
    name: "Clerk",
    description:
      "Authentication toolkit — setup guides, MCP server, and specialized skills for frameworks, organizations, billing, and webhooks.",
    url: "https://cursor.com/marketplace/clerk",
    tags: ["auth", "mcp", "skills"],
    author: "Clerk",
    official: true,
  },
  {
    name: "MongoDB",
    description:
      "Connect to any MongoDB deployment through the MongoDB MCP server — explore data, manage collections, and optimize queries.",
    url: "https://cursor.com/marketplace/mongodb/mongodb",
    tags: ["database", "nosql", "mcp"],
    author: "MongoDB",
    official: true,
  },
  {
    name: "Redis",
    description:
      "Redis development best practices — data structures, query engine, vector search, caching, and performance optimization.",
    url: "https://cursor.com/marketplace/redis",
    tags: ["database", "caching", "skills"],
    author: "Redis",
    official: true,
  },
  {
    name: "Datadog",
    description:
      "Query logs, metrics, traces, and dashboards through a preconfigured Datadog MCP server, in natural conversation.",
    url: "https://cursor.com/marketplace/datadog",
    tags: ["observability", "monitoring", "mcp"],
    author: "Datadog",
    official: true,
  },
  {
    name: "Shopify",
    description:
      "Shopify developer tools — search Shopify docs, generate and validate GraphQL, Liquid, and UI extension code.",
    url: "https://cursor.com/marketplace/shopify",
    tags: ["commerce", "graphql", "skills"],
    author: "Shopify",
    official: true,
  },
  {
    name: "GitLab",
    description:
      "Connect to GitLab with the GitLab MCP server — plan, track, and manage issues, merge requests, and pipelines.",
    url: "https://cursor.com/marketplace/gitlab",
    tags: ["git", "ci", "mcp"],
    author: "GitLab",
    official: true,
  },
  {
    name: "shadcn/ui",
    description:
      "UI component and design system framework. Search registries, install components as source code, and audit your project.",
    url: "https://cursor.com/marketplace/shadcn",
    tags: ["ui", "components", "design-system"],
    author: "shadcn",
    official: true,
  },
  {
    name: "Composio",
    description:
      "Connect and operate 1000+ external apps via the Composio MCP server, with managed OAuth and intelligent tool routing.",
    url: "https://cursor.com/marketplace/composio",
    tags: ["integrations", "oauth", "mcp"],
    author: "Composio",
    official: true,
  },
  {
    name: "Superpowers",
    description:
      "Core skills library: TDD, debugging, collaboration patterns, and proven engineering techniques for agents.",
    url: "https://cursor.com/marketplace/superpowers",
    tags: ["skills", "tdd", "debugging"],
  },
  {
    name: "Zapier",
    description:
      "Connect 9,000+ apps to your AI workflow. Discover, enable, and execute Zapier actions directly from your client.",
    url: "https://cursor.com/marketplace/zapier",
    tags: ["automation", "integrations", "mcp"],
    author: "Zapier",
    official: true,
  },
  {
    name: "AWS Core",
    description:
      "Build, deploy, and operate applications on AWS — infrastructure-as-code, core services, observability, and cost optimization skills.",
    url: "https://cursor.com/marketplace/aws/aws-core",
    tags: ["aws", "cloud", "skills"],
    author: "AWS",
    official: true,
  },
  {
    name: "Azure",
    description:
      "Microsoft Azure MCP and skills for cloud resource management, deployments, and Azure services.",
    url: "https://cursor.com/marketplace/azure",
    tags: ["azure", "cloud", "mcp"],
    author: "Microsoft",
    official: true,
  },
  {
    name: "Railway",
    description:
      "Agent skills and hosted MCP server for deploying, configuring, monitoring, and troubleshooting apps on Railway.",
    url: "https://cursor.com/marketplace/railway",
    tags: ["deployment", "infrastructure", "mcp"],
    author: "Railway",
    official: true,
  },
  {
    name: "Netlify",
    description:
      "Netlify platform skills — functions, edge functions, blobs, database, identity, image CDN, forms, and deployment.",
    url: "https://cursor.com/marketplace/netlify",
    tags: ["deployment", "hosting", "skills"],
    author: "Netlify",
    official: true,
  },
  {
    name: "Twilio",
    description:
      "Twilio skills and MCP with procedural knowledge for AI coding agents — Messaging, Voice, Verify, SendGrid, and 30+ products.",
    url: "https://cursor.com/marketplace/twilio",
    tags: ["communication", "sms", "mcp"],
    author: "Twilio",
    official: true,
  },
  {
    name: "Cursor Team Kit",
    description:
      "Cursor's own favorite internal workflows for CI, code review, and testing, packaged as an installable plugin.",
    url: "https://cursor.com/marketplace/cursor/cursor-team-kit",
    tags: ["workflows", "ci", "code-review"],
    author: "Cursor",
    official: true,
  },
  {
    name: "Context7",
    description:
      "Upstash Context7 MCP server for up-to-date documentation lookup — version-specific docs and code examples in your context.",
    url: "https://cursor.com/marketplace/context7",
    tags: ["docs", "context", "mcp"],
    author: "Upstash",
    official: true,
  },
  {
    name: "Browserbase",
    description:
      "Browser automation for AI agents: navigate, extract, screenshot, and interact with real web pages via a single CLI.",
    url: "https://cursor.com/marketplace/browserbase",
    tags: ["browser", "automation", "mcp"],
    author: "Browserbase",
    official: true,
  },
  {
    name: "Granola",
    description:
      "Your meetings in your workflow — gives the agent access to what your team discussed, decided, and committed to.",
    url: "https://cursor.com/marketplace/granola",
    tags: ["meetings", "notes", "mcp"],
    author: "Granola",
    official: true,
  },
  {
    name: "Mintlify",
    description:
      "Comprehensive reference for building Mintlify documentation sites.",
    url: "https://cursor.com/marketplace/mintlify",
    tags: ["docs", "skills"],
    author: "Mintlify",
    official: true,
  },
]);

const skills = withCategory("skills", [
  {
    name: "Agent Skills (Anthropic)",
    description:
      "Anthropic's public repository for Agent Skills — the canonical reference collection for skills used by Claude and compatible agents.",
    url: "https://github.com/anthropics/skills",
    repo: "anthropics/skills",
    tags: ["official", "reference", "anthropic"],
    author: "Anthropic",
    official: true,
  },
  {
    name: "agent-skills (Addy Osmani)",
    description:
      "Production-grade engineering skills for AI coding agents, curated by Addy Osmani — planning, testing, refactoring, and more.",
    url: "https://github.com/addyosmani/agent-skills",
    repo: "addyosmani/agent-skills",
    tags: ["engineering", "curated"],
  },
  {
    name: "Superpowers",
    description:
      "A battle-tested skills library covering TDD, systematic debugging, planning, and collaboration patterns for coding agents.",
    url: "https://github.com/obra/superpowers",
    repo: "obra/superpowers",
    tags: ["tdd", "debugging", "workflows"],
  },
  {
    name: "Awesome Claude Skills",
    description:
      "A curated list of awesome Claude Skills, resources, and tools maintained by the Composio team.",
    url: "https://github.com/ComposioHQ/awesome-claude-skills",
    repo: "ComposioHQ/awesome-claude-skills",
    tags: ["awesome-list", "curated"],
  },
  {
    name: "Awesome Agent Skills",
    description:
      "A curated collection of 1000+ agent skills from official vendors and the community, organized by category.",
    url: "https://github.com/VoltAgent/awesome-agent-skills",
    repo: "VoltAgent/awesome-agent-skills",
    tags: ["awesome-list", "curated"],
  },
  {
    name: "skills.sh",
    description:
      "The agent skills registry and `npx skills` CLI — discover, install, and manage skills across Cursor, Claude Code, and other agents.",
    url: "https://skills.sh",
    tags: ["registry", "cli"],
    author: "Vercel",
    official: true,
  },
  {
    name: "Supabase Agent Skills",
    description:
      "Official Supabase skills with critical development and security guidance for agents working on Supabase projects.",
    url: "https://github.com/supabase/agent-skills",
    repo: "supabase/agent-skills",
    tags: ["supabase", "security", "official"],
    author: "Supabase",
    official: true,
  },
  {
    name: "wshobson/agents",
    description:
      "Multi-harness agentic plugin marketplace — a large collection of specialized subagents and skills for coding workflows.",
    url: "https://github.com/wshobson/agents",
    repo: "wshobson/agents",
    tags: ["subagents", "collection"],
  },
  {
    name: "Scientific Agent Skills",
    description:
      "Turn any AI agent into an AI scientist — skills for research workflows, data analysis, and scientific computing.",
    url: "https://github.com/K-Dense-AI/scientific-agent-skills",
    repo: "K-Dense-AI/scientific-agent-skills",
    tags: ["research", "science"],
  },
  {
    name: "Awesome Claude Code",
    description:
      "A hand-picked collection of the finest resources, skills, and commands for Claude Code and compatible agents.",
    url: "https://github.com/hesreallyhim/awesome-claude-code",
    repo: "hesreallyhim/awesome-claude-code",
    tags: ["awesome-list", "curated"],
  },
  {
    name: "Cursor Skills Guide",
    description:
      "Cursor's official documentation on authoring and using skills — the standard format for teaching agents new capabilities.",
    url: "https://cursor.com/docs/context/skills",
    tags: ["docs", "official", "cursor"],
    author: "Cursor",
    official: true,
  },
]);

const mcp = withCategory("mcp", [
  {
    name: "MCP Reference Servers",
    description:
      "The official Model Context Protocol reference servers maintained by the MCP steering group — filesystem, fetch, memory, and more.",
    url: "https://github.com/modelcontextprotocol/servers",
    repo: "modelcontextprotocol/servers",
    tags: ["official", "reference"],
    author: "Anthropic",
    official: true,
  },
  {
    name: "MCP Registry",
    description:
      "The canonical, official registry of published MCP servers at registry.modelcontextprotocol.io.",
    url: "https://registry.modelcontextprotocol.io",
    tags: ["official", "registry"],
    official: true,
  },
  {
    name: "GitHub MCP Server",
    description:
      "GitHub's official MCP server — repositories, issues, pull requests, actions, and code search for your agent.",
    url: "https://github.com/github/github-mcp-server",
    repo: "github/github-mcp-server",
    tags: ["git", "official"],
    author: "GitHub",
    official: true,
  },
  {
    name: "Chrome DevTools MCP",
    description:
      "Chrome DevTools for coding agents — inspect, debug, and profile live web pages straight from your agent.",
    url: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
    repo: "ChromeDevTools/chrome-devtools-mcp",
    tags: ["browser", "debugging", "official"],
    author: "Google",
    official: true,
  },
  {
    name: "Playwright MCP",
    description:
      "Microsoft's Playwright MCP server — fast, deterministic browser automation using the accessibility tree instead of screenshots.",
    url: "https://github.com/microsoft/playwright-mcp",
    repo: "microsoft/playwright-mcp",
    tags: ["browser", "testing", "official"],
    author: "Microsoft",
    official: true,
  },
  {
    name: "Context7",
    description:
      "Up-to-date, version-specific documentation and code examples for any library, pulled straight into your LLM context.",
    url: "https://github.com/upstash/context7",
    repo: "upstash/context7",
    tags: ["docs", "context"],
    author: "Upstash",
    official: true,
  },
  {
    name: "Serena",
    description:
      "A powerful coding-agent toolkit providing semantic code retrieval and editing via language servers, exposed over MCP.",
    url: "https://github.com/oraios/serena",
    repo: "oraios/serena",
    tags: ["code-intelligence", "lsp"],
  },
  {
    name: "Firecrawl MCP",
    description:
      "Web scraping, crawling, and extraction for agents — turn any website into clean, LLM-ready data.",
    url: "https://github.com/firecrawl/firecrawl-mcp-server",
    repo: "firecrawl/firecrawl-mcp-server",
    tags: ["scraping", "web"],
    author: "Firecrawl",
    official: true,
  },
  {
    name: "Supabase MCP",
    description:
      "Connect Supabase projects to your agent — manage tables, run SQL, apply migrations, and query logs.",
    url: "https://github.com/supabase/mcp",
    repo: "supabase/mcp",
    tags: ["database", "postgres"],
    author: "Supabase",
    official: true,
  },
  {
    name: "Notion MCP Server",
    description:
      "Notion's official MCP server — search, read, and write pages and databases in your workspace.",
    url: "https://github.com/makenotion/notion-mcp-server",
    repo: "makenotion/notion-mcp-server",
    tags: ["docs", "official"],
    author: "Notion",
    official: true,
  },
  {
    name: "Sentry MCP",
    description:
      "Sentry's MCP server for querying issues, errors, and performance data from your projects.",
    url: "https://github.com/getsentry/sentry-mcp",
    repo: "getsentry/sentry-mcp",
    tags: ["observability", "official"],
    author: "Sentry",
    official: true,
  },
  {
    name: "Cloudflare MCP Server",
    description:
      "Cloudflare's MCP servers for Workers, KV, R2, D1, and the rest of the developer platform.",
    url: "https://github.com/cloudflare/mcp-server-cloudflare",
    repo: "cloudflare/mcp-server-cloudflare",
    tags: ["edge", "official"],
    author: "Cloudflare",
    official: true,
  },
  {
    name: "Framelink Figma MCP",
    description:
      "Give your agent access to Figma layout and style data for accurate one-shot design-to-code implementations.",
    url: "https://github.com/GLips/Figma-Context-MCP",
    repo: "GLips/Figma-Context-MCP",
    tags: ["design", "figma"],
  },
  {
    name: "Browserbase MCP",
    description:
      "Cloud browser automation — navigate, screenshot, and extract data using headless browsers managed by Browserbase.",
    url: "https://github.com/browserbase/mcp-server-browserbase",
    repo: "browserbase/mcp-server-browserbase",
    tags: ["browser", "cloud"],
    author: "Browserbase",
    official: true,
  },
  {
    name: "Stripe Agent Toolkit",
    description:
      "Stripe's official toolkit and MCP server for integrating payments into agentic workflows.",
    url: "https://github.com/stripe/ai",
    repo: "stripe/ai",
    tags: ["payments", "official"],
    author: "Stripe",
    official: true,
  },
  {
    name: "AWS MCP Servers",
    description:
      "AWS Labs' suite of MCP servers — documentation, cost analysis, CDK, Bedrock, and dozens of other AWS capabilities.",
    url: "https://github.com/awslabs/mcp",
    repo: "awslabs/mcp",
    tags: ["aws", "official"],
    author: "AWS",
    official: true,
  },
  {
    name: "Exa MCP",
    description:
      "Fast, reliable AI-native web search for agents via the Exa search API.",
    url: "https://github.com/exa-labs/exa-mcp-server",
    repo: "exa-labs/exa-mcp-server",
    tags: ["search", "web"],
    author: "Exa",
    official: true,
  },
  {
    name: "GitMCP",
    description:
      "Instantly turn any GitHub repository into an MCP endpoint — free remote docs-and-code context for any project.",
    url: "https://github.com/idosal/git-mcp",
    repo: "idosal/git-mcp",
    tags: ["git", "docs"],
  },
  {
    name: "Awesome MCP Servers",
    description:
      "The largest community-curated list of MCP servers, organized by category with thousands of entries.",
    url: "https://github.com/punkpeye/awesome-mcp-servers",
    repo: "punkpeye/awesome-mcp-servers",
    tags: ["awesome-list", "curated"],
  },
  {
    name: "Magic MCP (21st.dev)",
    description:
      "AI-driven UI component generation — create beautiful, modern components from natural language via MCP.",
    url: "https://github.com/21st-dev/magic-mcp",
    repo: "21st-dev/magic-mcp",
    tags: ["ui", "components"],
  },
  {
    name: "Vercel MCP",
    description:
      "Vercel's official hosted MCP server — manage projects, deployments, logs, and documentation from your agent.",
    url: "https://vercel.com/docs/mcp/vercel-mcp",
    tags: ["deployment", "official", "hosted"],
    author: "Vercel",
    official: true,
  },
  {
    name: "FastAPI MCP",
    description:
      "Expose your FastAPI endpoints as MCP tools automatically, with auth support built in.",
    url: "https://github.com/tadata-org/fastapi_mcp",
    repo: "tadata-org/fastapi_mcp",
    tags: ["python", "api"],
  },
  {
    name: "n8n MCP",
    description:
      "Build n8n automation workflows from your agent — node documentation, validation, and workflow management over MCP.",
    url: "https://github.com/czlonkowski/n8n-mcp",
    repo: "czlonkowski/n8n-mcp",
    tags: ["automation", "workflows"],
  },
]);

export const seedItems: DirectoryItem[] = [...bots, ...plugins, ...skills, ...mcp];
