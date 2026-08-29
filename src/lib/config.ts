export const siteConfig = {
  name: "AgentDex",
  tagline: "Every AI coding tool. One directory.",
  description:
    "The all-in-one directory for AI coding bots, Cursor plugins, agent skills, and MCP servers — refreshed daily by an autonomous agent.",
  /**
   * Sponsorship provision for phase 2. When enabled, items with
   * `sponsored: true` are surfaced in the sponsor slot and pinned in results.
   * Intentionally off for phase 1.
   */
  sponsorsEnabled: false,
  refreshScheduleUtc: "06:00 UTC",
  sources: [
    { name: "GitHub", url: "https://github.com" },
    { name: "Cursor Marketplace", url: "https://cursor.com/marketplace" },
  ],
} as const;
