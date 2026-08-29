import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md space-y-1">
            <p className="font-medium text-foreground">{siteConfig.name}</p>
            <p>{siteConfig.description}</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Data sources</p>
            <ul className="space-y-1">
              {siteConfig.sources.map((source) => (
                <li key={source.name}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground hover:underline"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="/api/directory" className="hover:text-foreground hover:underline">
                  JSON API
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="bg-border/60" />
        <p className="text-xs">
          The refresh agent pulls fresh data once a day at {siteConfig.refreshScheduleUtc}.
          All names and logos belong to their respective owners. Listings link to the
          official source — nothing is hosted here.
        </p>
      </div>
    </footer>
  );
}
