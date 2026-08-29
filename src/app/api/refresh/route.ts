import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { getDirectory } from "@/lib/directory";
import { DIRECTORY_TAG } from "@/lib/sources/github";

export const dynamic = "force-dynamic";

/**
 * Daily refresh agent, invoked by the Vercel cron defined in vercel.json.
 * Drops the cached upstream data, then rebuilds the snapshot so the next
 * visitor gets fresh data immediately.
 *
 * When CRON_SECRET is set, Vercel sends it as a bearer token automatically
 * and manual calls without it are rejected.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(DIRECTORY_TAG, "max");
  revalidatePath("/");

  const snapshot = await getDirectory();

  return NextResponse.json({
    refreshed: true,
    generatedAt: snapshot.generatedAt,
    totalItems: snapshot.items.length,
    sources: snapshot.sources,
  });
}
