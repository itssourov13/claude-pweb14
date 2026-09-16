import Link from "next/link";

import Badge from "@/components/ui/Badge";
import { siteConfig } from "@/lib/site.config";

import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-border bg-bg/80 sticky top-0 z-40 border-b backdrop-blur-sm motion-reduce:backdrop-blur-none">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:px-12">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:bg-surface-2 flex min-h-11 items-center rounded-full px-4 text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={siteConfig.availability.href} className="hidden sm:block">
            <Badge tone="accent">{siteConfig.availability.label}</Badge>
          </Link>
          <ThemeToggle />
          <MobileNav nav={siteConfig.nav} />
        </div>
      </div>
    </header>
  );
}
