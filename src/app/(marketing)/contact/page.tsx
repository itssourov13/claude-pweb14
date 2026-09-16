import type { Metadata } from "next";

import ContactForm from "@/components/sections/ContactForm";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} about a project.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell me about the project."
        description={`${siteConfig.availability.label}. I read every message myself and reply within two business days.`}
      />
      <Section className="max-w-[560px] pt-0">
        <ContactForm />
      </Section>
    </>
  );
}
