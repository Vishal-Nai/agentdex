"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX, Search } from "lucide-react";
import { ItemCard } from "@/components/item-card";
import { SponsorSlot } from "@/components/sponsor-slot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CATEGORIES, CATEGORY_META } from "@/lib/types";
import type { Category, DirectoryItem } from "@/lib/types";

type CategoryFilter = "all" | Category;
type SortKey = "featured" | "stars" | "name" | "updated";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Featured",
  stars: "Most stars",
  name: "Name A–Z",
  updated: "Recently updated",
};

const TAB_LABELS: Record<CategoryFilter, string> = {
  all: "All",
  bots: "Bots",
  plugins: "Plugins",
  skills: "Skills",
  mcp: "MCP",
};

function isCategoryFilter(value: string | null): value is CategoryFilter {
  return value === "all" || (CATEGORIES as readonly string[]).includes(value ?? "");
}

function sortItems(items: DirectoryItem[], sort: SortKey): DirectoryItem[] {
  switch (sort) {
    case "featured":
      // Items arrive in featured order (curated catalog first, then live
      // discoveries by popularity), so the incoming order is the sort.
      return items;
    case "stars":
      return [...items].sort((a, b) => (b.stars ?? -1) - (a.stars ?? -1));
    case "name":
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    case "updated":
      return [...items].sort(
        (a, b) =>
          new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime(),
      );
    default: {
      const exhaustive: never = sort;
      throw new Error(`Unhandled sort: ${exhaustive}`);
    }
  }
}

export function DirectoryExplorer({ items }: { items: DirectoryItem[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(
    isCategoryFilter(initialCategory) ? initialCategory : "all",
  );
  const [sort, setSort] = useState<SortKey>("featured");

  const counts = useMemo(() => {
    const result: Record<CategoryFilter, number> = {
      all: items.length,
      bots: 0,
      plugins: 0,
      skills: 0,
      mcp: 0,
    };
    for (const item of items) result[item.category] += 1;
    return result;
  }, [items]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!needle) return true;
      return (
        item.name.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle) ||
        (item.author?.toLowerCase().includes(needle) ?? false) ||
        item.tags.some((tag) => tag.toLowerCase().includes(needle))
      );
    });
    return sortItems(matches, sort);
  }, [items, query, category, sort]);

  function selectCategory(next: CategoryFilter) {
    setCategory(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url.toString());
  }

  function resetFilters() {
    setQuery("");
    selectCategory("all");
    setSort("featured");
  }

  return (
    <section id="directory" className="scroll-mt-20 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search bots, plugins, skills, MCP servers…"
            aria-label="Search the directory"
            className="h-11 bg-card/60 pl-9"
          />
        </div>
        <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
          <SelectTrigger
            aria-label="Sort results"
            className="h-11 w-full bg-card/60 sm:w-48"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
              <SelectItem key={key} value={key}>
                {SORT_LABELS[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={category} onValueChange={(value) => selectCategory(value as CategoryFilter)}>
        <div className="overflow-x-auto pb-1">
          <TabsList className="h-11 w-full min-w-max justify-start bg-card/60 sm:w-auto">
            {(Object.keys(TAB_LABELS) as CategoryFilter[]).map((key) => (
              <TabsTrigger key={key} value={key} className="gap-1.5 px-3 sm:px-4">
                {TAB_LABELS[key]}
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[11px] tabular-nums text-muted-foreground">
                  {counts[key]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {category !== "all" && (
        <p className="text-sm text-muted-foreground">
          {CATEGORY_META[category].description}
        </p>
      )}

      <SponsorSlot />

      {filtered.length > 0 ? (
        <>
          <p className="text-xs text-muted-foreground" role="status">
            {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
            {query.trim() ? ` matching “${query.trim()}”` : ""}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border/60 px-6 py-16 text-center">
          <SearchX className="size-8 text-muted-foreground" />
          <div>
            <p className="font-medium">No tools match your search</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different keyword or clear the filters.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </section>
  );
}
