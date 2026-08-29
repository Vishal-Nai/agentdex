"use client";

import { useState } from "react";
import { ArrowUpRight, BadgeCheck, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatStars, timeAgo } from "@/lib/format";
import { CATEGORY_META } from "@/lib/types";
import type { DirectoryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const SOURCE_LABELS: Record<DirectoryItem["source"], string> = {
  github: "GitHub",
  "cursor-marketplace": "Cursor Marketplace",
  curated: "Curated",
};

function LetterAvatar({ name }: { name: string }) {
  return (
    <div
      aria-hidden
      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted text-sm font-semibold text-muted-foreground"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export function ItemCard({ item }: { item: DirectoryItem }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const meta = CATEGORY_META[item.category];

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-card/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-lg hover:shadow-black/20 focus-visible:outline-2 focus-visible:outline-ring sm:p-5"
    >
      <div className="flex items-start gap-3">
        {item.logo && !logoFailed ? (
          // Logos come from arbitrary upstream hosts (GitHub avatars, Vercel
          // blob storage, vendor CDNs), so next/image remotePatterns can't
          // enumerate them; a plain img with a letter fallback is the
          // resilient choice here.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.logo}
            alt=""
            loading="lazy"
            onError={() => setLogoFailed(true)}
            className="size-10 shrink-0 rounded-lg border border-border/60 bg-muted object-cover"
          />
        ) : (
          <LetterAvatar name={item.name} />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-semibold leading-tight">{item.name}</h3>
            {item.official && (
              <BadgeCheck
                aria-label="Official"
                className={cn("size-4 shrink-0", meta.accentClass)}
              />
            )}
          </div>
          {item.author && (
            <p className="truncate text-xs text-muted-foreground">by {item.author}</p>
          )}
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>

      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 text-xs text-muted-foreground">
        <Badge variant="outline" className={cn("border font-medium", meta.badgeClass)}>
          {meta.singular}
        </Badge>
        {typeof item.stars === "number" && (
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-current text-amber-400" />
            {formatStars(item.stars)}
          </span>
        )}
        {item.updatedAt && (
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {timeAgo(item.updatedAt)}
          </span>
        )}
        <span className="ml-auto hidden text-[11px] text-muted-foreground/60 sm:inline">
          {SOURCE_LABELS[item.source]}
        </span>
      </div>

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
