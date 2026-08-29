import { unstable_cache } from "next/cache";
import type { DirectoryItem } from "@/lib/types";
import { slugify } from "@/lib/types";
import { DIRECTORY_TAG } from "@/lib/sources/github";

const MARKETPLACE_URL = "https://cursor.com/marketplace";
const REVALIDATE_SECONDS = 60 * 60 * 24;

const ANCHOR_RE =
  /<a[^>]+href="(\/marketplace\/(?!automations\/)[a-z0-9\-/]+)"[^>]*>([\s\S]*?)<\/a>/g;
const IMG_RE = /<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/;

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

function deriveTags(description: string): string[] {
  const tags: string[] = [];
  const lower = description.toLowerCase();
  if (lower.includes("mcp")) tags.push("mcp");
  if (lower.includes("skill")) tags.push("skills");
  if (lower.includes("cli")) tags.push("cli");
  return tags;
}

/**
 * Scrapes the official Cursor Marketplace listing page. Card markup:
 * an anchor per plugin containing a logo <img alt="Name"> and the
 * name + description as text content.
 */
async function scrapeMarketplacePlugins(): Promise<DirectoryItem[]> {
  // The raw page is ~4MB, over Next's 2MB data-cache limit, so the fetch is
  // uncached and the parsed result is cached via unstable_cache below.
  const res = await fetch(MARKETPLACE_URL, {
    headers: { "User-Agent": "agentdex-directory" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Cursor Marketplace fetch failed (${res.status})`);
  }
  const html = await res.text();

  const seen = new Set<string>();
  const items: DirectoryItem[] = [];
  for (const match of html.matchAll(ANCHOR_RE)) {
    const [, href, inner] = match;
    if (seen.has(href)) continue;
    seen.add(href);

    const img = IMG_RE.exec(inner);
    const text = stripTags(inner);
    const name = (img?.[2] ?? "").trim() || text.split(/(?<=[a-z0-9])(?=[A-Z])/)[0];
    if (!name || name.length > 80) continue;

    let description = text.startsWith(name) ? text.slice(name.length).trim() : text;
    if (!description) description = `${name} plugin on the Cursor Marketplace.`;

    items.push({
      id: `plugins-${slugify(href.replace("/marketplace/", ""))}`,
      name,
      description,
      category: "plugins",
      url: `https://cursor.com${href}`,
      tags: deriveTags(description),
      logo: img?.[1],
      source: "cursor-marketplace",
    });
  }

  if (items.length === 0) {
    throw new Error("Cursor Marketplace parse produced no items (markup may have changed)");
  }
  return items;
}

export const fetchMarketplacePlugins = unstable_cache(
  scrapeMarketplacePlugins,
  ["marketplace-plugins"],
  { revalidate: REVALIDATE_SECONDS, tags: [DIRECTORY_TAG] },
);
