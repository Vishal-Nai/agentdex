import { seedItems } from "@/data/seed";
import { fetchGitHubCategory, fetchRepoStats } from "@/lib/sources/github";
import { fetchMarketplacePlugins } from "@/lib/sources/marketplace";
import { CATEGORIES } from "@/lib/types";
import type { DirectoryItem, DirectorySnapshot, SourceStatus } from "@/lib/types";

function dedupeKey(item: DirectoryItem): string {
  if (item.repo) return `repo:${item.repo.toLowerCase()}`;
  const url = item.url
    .toLowerCase()
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/+$/, "");
  return `url:${url}`;
}

/**
 * Builds the directory snapshot: the curated seed catalog enriched and
 * extended with live data. Every live source is optional — a failure never
 * takes the directory down, it just falls back to the last cached data or
 * the seed catalog.
 */
export async function getDirectory(): Promise<DirectorySnapshot> {
  const sources: SourceStatus[] = [];

  // Seed order doubles as the "featured" ranking, so preserve it.
  const byKey = new Map<string, DirectoryItem>();
  for (const item of seedItems) {
    byKey.set(dedupeKey(item), { ...item });
  }

  const seedRepos = seedItems.filter((i) => i.repo).map((i) => i.repo as string);

  const [statsResult, marketplaceResult, ...githubResults] = await Promise.allSettled([
    fetchRepoStats(seedRepos),
    fetchMarketplacePlugins(),
    ...CATEGORIES.map((category) => fetchGitHubCategory(category)),
  ]);

  if (statsResult.status === "fulfilled") {
    let enriched = 0;
    for (const item of byKey.values()) {
      if (!item.repo) continue;
      const stats = statsResult.value.get(item.repo.toLowerCase());
      if (!stats) continue;
      item.stars = stats.stars;
      item.updatedAt = stats.updatedAt;
      item.logo = item.logo ?? stats.logo;
      enriched += 1;
    }
    sources.push({ name: "GitHub repo stats", ok: true, count: enriched });
  } else {
    console.error("[directory] repo stats failed:", statsResult.reason);
    sources.push({ name: "GitHub repo stats", ok: false, count: 0 });
  }

  const discovered: DirectoryItem[] = [];

  if (marketplaceResult.status === "fulfilled") {
    for (const item of marketplaceResult.value) {
      const key = dedupeKey(item);
      const existing = byKey.get(key);
      if (existing) {
        existing.logo = item.logo ?? existing.logo;
      } else {
        discovered.push(item);
      }
    }
    sources.push({
      name: "Cursor Marketplace",
      ok: true,
      count: marketplaceResult.value.length,
    });
  } else {
    console.error("[directory] marketplace failed:", marketplaceResult.reason);
    sources.push({ name: "Cursor Marketplace", ok: false, count: 0 });
  }

  githubResults.forEach((result, index) => {
    const category = CATEGORIES[index];
    if (result.status === "fulfilled") {
      for (const item of result.value) {
        const key = dedupeKey(item);
        const existing = byKey.get(key);
        if (existing) {
          existing.stars = item.stars;
          existing.updatedAt = item.updatedAt;
          existing.logo = existing.logo ?? item.logo;
        } else {
          discovered.push(item);
        }
      }
      sources.push({
        name: `GitHub trending (${category})`,
        ok: true,
        count: result.value.length,
      });
    } else {
      console.error(`[directory] github ${category} failed:`, result.reason);
      sources.push({ name: `GitHub trending (${category})`, ok: false, count: 0 });
    }
  });

  // Discovered items follow the curated catalog, ranked by popularity.
  discovered.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
  for (const item of discovered) {
    const key = dedupeKey(item);
    if (!byKey.has(key)) byKey.set(key, item);
  }

  return {
    items: [...byKey.values()],
    generatedAt: new Date().toISOString(),
    sources,
  };
}
