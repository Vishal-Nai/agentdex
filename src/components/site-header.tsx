import Link from "next/link";
import { Boxes, RefreshCw } from "lucide-react";
import { siteConfig } from "@/lib/config";

const NAV_LINKS = [
  { label: "Bots", href: "/?category=bots#directory" },
  { label: "Plugins", href: "/?category=plugins#directory" },
  { label: "Skills", href: "/?category=skills#directory" },
  { label: "MCP", href: "/?category=mcp#directory" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 text-white">
            <Boxes className="size-4" />
          </span>
          {siteConfig.name}
        </Link>
        <nav aria-label="Categories" className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-2.5 py-1 text-xs text-muted-foreground">
          <RefreshCw className="size-3 text-emerald-400" />
          <span className="hidden sm:inline">Refreshed daily</span>
          <span className="sm:hidden">Daily</span>
        </span>
      </div>
    </header>
  );
}
