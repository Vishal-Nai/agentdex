import { siteConfig } from "@/lib/config";

/**
 * Sponsorship provision for phase 2. Renders nothing while
 * `siteConfig.sponsorsEnabled` is false. When enabled, this slot will show
 * sponsored listings above the results grid.
 */
export function SponsorSlot() {
  if (!siteConfig.sponsorsEnabled) return null;

  return (
    <aside
      aria-label="Sponsored"
      className="rounded-xl border border-dashed border-border/60 p-4 text-sm text-muted-foreground"
    >
      Sponsored listings will appear here.
    </aside>
  );
}
