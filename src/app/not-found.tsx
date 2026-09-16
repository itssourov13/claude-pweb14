import Link from "next/link";

import Section from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-start justify-center gap-4">
      <p className="text-overline text-accent-strong">404</p>
      <h1 className="text-display-2">This page wandered off.</h1>
      <p className="text-muted max-w-md">
        The link might be broken, or the page moved. Try the homepage, or
        head to Work to see what&apos;s current.
      </p>
      <Link
        href="/"
        className="min-h-11 rounded-full bg-accent px-5 py-2.5 font-medium text-white hover:bg-accent-strong"
      >
        Back home
      </Link>
    </Section>
  );
}
