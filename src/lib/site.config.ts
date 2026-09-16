export type NavItem = {
  label: string;
  href: string;
};

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  x?: string;
  dribbble?: string;
  rss: string;
};

export type Availability = {
  status: "booking" | "limited" | "unavailable";
  label: string;
  href: string;
};

export type Metric = {
  value: number;
  suffix: string;
  label: string;
};

export type SiteConfig = {
  name: string;
  domain: string;
  tagline: string;
  description: string;
  email: string;
  availability: Availability;
  nav: NavItem[];
  socials: SocialLinks;
  metrics: Metric[];
  excludes: string[];
};

// NOTE: name/domain/email below are placeholders (see decision log A-001 /
// A-002). Replace with the owner's real facts before launch — every piece of
// metadata, JSON-LD, the sitemap, RSS, and the footer derive from this file.
export const siteConfig = {
  name: "Alex Morgan",
  domain: "alexmorgan.studio",
  tagline: "Independent product designer & engineer.",
  description:
    "Alex Morgan is an independent product designer and engineer who helps founders and teams design, build, and ship premium digital products.",
  email: "hello@alexmorgan.studio",
  availability: {
    status: "booking",
    label: "Booking Q4 2026",
    href: "/contact",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Writing", href: "/writing" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
    dribbble: "https://dribbble.com/",
    rss: "/rss.xml",
  },
  metrics: [
    { value: 12, suffix: "+", label: "years shipping products" },
    { value: 40, suffix: "+", label: "projects launched" },
    { value: 98, suffix: "%", label: "client retention" },
  ],
  excludes: ["resume.pdf"],
} as const satisfies SiteConfig;
