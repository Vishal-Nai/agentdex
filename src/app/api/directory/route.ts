import { NextResponse } from "next/server";
import { getDirectory } from "@/lib/directory";
import { CATEGORIES } from "@/lib/types";
import type { Category } from "@/lib/types";

export const dynamic = "force-dynamic";

function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

/** Public JSON API for the directory. Supports ?category=bots|plugins|skills|mcp. */
export async function GET(request: Request) {
  const snapshot = await getDirectory();
  const category = new URL(request.url).searchParams.get("category");

  const items =
    category && isCategory(category)
      ? snapshot.items.filter((item) => item.category === category)
      : snapshot.items;

  return NextResponse.json(
    { ...snapshot, items },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
