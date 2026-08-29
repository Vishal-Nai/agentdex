export const CATEGORIES = ["bots", "plugins", "skills", "mcp"] as const;

export type Category = (typeof CATEGORIES)[number];

export type ItemSource = "github" | "cursor-marketplace" | "curated";

export interface DirectoryItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  /** External link to the tool's homepage, repo, or marketplace page. */
  url: string;
  /** GitHub repo in `owner/name` form, when the item lives on GitHub. */
  repo?: string;
  stars?: number;
  tags: string[];
  author?: string;
  logo?: string;
  /** ISO timestamp of the last upstream update, when known. */
  updatedAt?: string;
  source: ItemSource;
  /** Maintained by the vendor / first party. */
  official?: boolean;
  /** Sponsorship provision — unused in phase 1, reserved for phase 2. */
  sponsored?: boolean;
}

export interface SourceStatus {
  name: string;
  ok: boolean;
  count: number;
}

export interface DirectorySnapshot {
  items: DirectoryItem[];
  generatedAt: string;
  sources: SourceStatus[];
}

export interface CategoryMeta {
  label: string;
  singular: string;
  description: string;
  /** Tailwind classes for the category badge. */
  badgeClass: string;
  /** Tailwind text color class for accents. */
  accentClass: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  bots: {
    label: "AI Bots & Agents",
    singular: "Bot",
    description:
      "Autonomous coding agents, review bots, and AI assistants — from Cursor Agents and Grok to Claude Code and Codex.",
    badgeClass:
      "bg-violet-500/15 text-violet-300 border-violet-500/30 hover:bg-violet-500/25",
    accentClass: "text-violet-400",
  },
  plugins: {
    label: "Cursor Plugins",
    singular: "Plugin",
    description:
      "Plugins from the official Cursor Marketplace that bundle MCP servers, skills, rules, and hooks.",
    badgeClass:
      "bg-sky-500/15 text-sky-300 border-sky-500/30 hover:bg-sky-500/25",
    accentClass: "text-sky-400",
  },
  skills: {
    label: "Agent Skills",
    singular: "Skill",
    description:
      "Skill libraries and collections that teach agents domain expertise — reusable across Cursor, Claude Code, and more.",
    badgeClass:
      "bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25",
    accentClass: "text-amber-400",
  },
  mcp: {
    label: "MCP Servers",
    singular: "MCP",
    description:
      "Model Context Protocol servers that connect agents to external tools, data, and services.",
    badgeClass:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25",
    accentClass: "text-emerald-400",
  },
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
