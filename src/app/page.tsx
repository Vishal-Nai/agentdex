import { Suspense } from "react";
import { Bot, Layers, Plug, Sparkles } from "lucide-react";
import { DirectoryExplorer } from "@/components/directory-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/lib/config";
import { getDirectory } from "@/lib/directory";
import { timeAgo } from "@/lib/format";
import type { Category } from "@/lib/types";

// Rebuilt daily; the /api/refresh cron agent also revalidates on demand.
export const revalidate = 86400;

const STAT_ICONS: Record<Category, typeof Bot> = {
  bots: Bot,
  plugins: Plug,
  skills: Sparkles,
  mcp: Layers,
};

const STAT_LABELS: Record<Category, string> = {
  bots: "AI bots & agents",
  plugins: "Cursor plugins",
  skills: "Skill libraries",
  mcp: "MCP servers",
};

const STAT_COLORS: Record<Category, string> = {
  bots: "text-violet-400",
  plugins: "text-sky-400",
  skills: "text-amber-400",
  mcp: "text-emerald-400",
};

function ExplorerFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-80 max-w-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const snapshot = await getDirectory();
  const counts: Record<Category, number> = { bots: 0, plugins: 0, skills: 0, mcp: 0 };
  for (const item of snapshot.items) counts[item.category] += 1;

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/60">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(124,58,237,0.15),transparent_70%)]"
          />
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-violet-400" />
              {snapshot.items.length} tools indexed · updated {timeAgo(snapshot.generatedAt)}
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              {siteConfig.tagline.replace(" One directory.", "")}{" "}
              <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                One directory.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {siteConfig.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(Object.keys(STAT_LABELS) as Category[]).map((category) => {
                const Icon = STAT_ICONS[category];
                return (
                  <div
                    key={category}
                    className="rounded-xl border border-border/60 bg-card/60 p-4"
                  >
                    <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon className={`size-4 ${STAT_COLORS[category]}`} />
                      {STAT_LABELS[category]}
                    </dt>
                    <dd className="mt-1 text-2xl font-bold tabular-nums">
                      {counts[category]}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Suspense fallback={<ExplorerFallback />}>
            <DirectoryExplorer items={snapshot.items} />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
