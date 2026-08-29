import type { Category, DirectoryItem } from "@/lib/types";
import { slugify } from "@/lib/types";

const SEARCH_URL = "https://api.github.com/search/repositories";
export const DIRECTORY_TAG = "directory";
const REVALIDATE_SECONDS = 60 * 60 * 24;

interface GitHubRepo {
  full_name: string;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  pushed_at: string;
  topics?: string[];
  owner?: { login: string; avatar_url: string };
}

interface SearchResponse {
  items?: GitHubRepo[];
}

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "agentdex-directory",
  };
  // Optional: raises rate limits from 60 to 5000 req/hour.
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function searchRepos(query: string, perPage: number): Promise<GitHubRepo[]> {
  const url = `${SEARCH_URL}?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${perPage}`;
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: REVALIDATE_SECONDS, tags: [DIRECTORY_TAG] },
  });
  if (!res.ok) {
    throw new Error(`GitHub search failed (${res.status}) for query: ${query}`);
  }
  const data = (await res.json()) as SearchResponse;
  return data.items ?? [];
}

const CATEGORY_QUERIES: Record<Category, { query: string; perPage: number }[]> = {
  bots: [{ query: "topic:coding-agent stars:>3000", perPage: 20 }],
  plugins: [{ query: "topic:cursor stars:>1000", perPage: 20 }],
  skills: [
    { query: "topic:agent-skills stars:>500", perPage: 20 },
    { query: "topic:claude-skills stars:>500", perPage: 15 },
  ],
  mcp: [{ query: "mcp in:name topic:mcp-server stars:>1500", perPage: 30 }],
};

const NOISE_TOPICS = new Set([
  "ai",
  "llm",
  "agent",
  "agents",
  "ai-agent",
  "ai-agents",
  "hacktoberfest",
  "mcp",
  "mcp-server",
  "mcp-servers",
  "model-context-protocol",
  "coding-agent",
  "agent-skills",
  "claude-skills",
  "cursor",
]);

function repoToItem(repo: GitHubRepo, category: Category): DirectoryItem {
  const tags = (repo.topics ?? [])
    .filter((t) => !NOISE_TOPICS.has(t))
    .slice(0, 3);
  return {
    id: `${category}-${slugify(repo.full_name)}`,
    name: repo.name,
    description: repo.description?.trim() || `${repo.full_name} on GitHub`,
    category,
    url: repo.html_url,
    repo: repo.full_name,
    stars: repo.stargazers_count,
    tags,
    author: repo.owner?.login,
    logo: repo.owner?.avatar_url,
    updatedAt: repo.pushed_at,
    source: "github",
  };
}

/** Trending repos for a category, discovered via GitHub topic search. */
export async function fetchGitHubCategory(category: Category): Promise<DirectoryItem[]> {
  const batches = await Promise.all(
    CATEGORY_QUERIES[category].map(({ query, perPage }) => searchRepos(query, perPage)),
  );
  const seen = new Set<string>();
  const items: DirectoryItem[] = [];
  for (const repo of batches.flat()) {
    const key = repo.full_name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(repoToItem(repo, category));
  }
  return items;
}

export interface RepoStats {
  stars: number;
  updatedAt: string;
  logo?: string;
}

/** Live stats for the curated seed repos, fetched in chunked search queries. */
export async function fetchRepoStats(repos: string[]): Promise<Map<string, RepoStats>> {
  const stats = new Map<string, RepoStats>();
  const chunkSize = 20;
  const chunks: string[][] = [];
  for (let i = 0; i < repos.length; i += chunkSize) {
    chunks.push(repos.slice(i, i + chunkSize));
  }
  const results = await Promise.all(
    chunks.map((chunk) =>
      searchRepos(chunk.map((r) => `repo:${r}`).join(" ") + " fork:true", chunkSize),
    ),
  );
  for (const repo of results.flat()) {
    stats.set(repo.full_name.toLowerCase(), {
      stars: repo.stargazers_count,
      updatedAt: repo.pushed_at,
      logo: repo.owner?.avatar_url,
    });
  }
  return stats;
}
