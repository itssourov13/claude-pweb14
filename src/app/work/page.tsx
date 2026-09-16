import type { Metadata } from "next";

import PageHeader from "@/components/sections/PageHeader";
import WorkFilterList from "@/components/sections/WorkFilterList";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from recent product design and engineering projects.",
};

export default function WorkIndexPage() {
  const items = getAllWork();

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Case studies from recent projects."
        description="Each one covers the problem, the approach, and the measured outcome — not just the pretty screens."
      />
      <WorkFilterList items={items} />
    </>
  );
}
