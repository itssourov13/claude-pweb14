import type { Metadata } from "next";

import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — background, approach, and how I work.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`Hi, I'm ${siteConfig.name}.`}
        description="I'm an independent product designer and engineer based on the idea that the person who designs a product should be able to help build it."
      />
      <Section className="max-w-[760px] pt-0">
        <div className="prose prose-neutral dark:prose-invert">
          <p>
            Over the last {siteConfig.metrics[0]?.value}+ years I&apos;ve
            worked with founders and small teams to take products from a
            rough idea to something people actually use — usually wearing
            both the design and engineering hats, sometimes handing off to a
            larger team once the direction is set.
          </p>
          <p>
            I care most about the unglamorous middle of a project: the form
            that has to actually validate correctly, the loading state nobody
            designed, the edge case that shows up in week six. That&apos;s
            where most products either earn or lose trust.
          </p>
          <p>
            When I&apos;m not working, I&apos;m usually reading about
            typography, tinkering with the site you&apos;re on right now, or
            trying to get better at the things I write about on the{" "}
            <a href="/writing">writing page</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
