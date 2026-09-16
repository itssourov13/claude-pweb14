import Capabilities from "@/components/sections/Capabilities";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import ProofBand from "@/components/sections/ProofBand";
import SelectedWork from "@/components/sections/SelectedWork";
import Testimonials from "@/components/sections/Testimonials";
import WritingPreview from "@/components/sections/WritingPreview";
import { getAllNotes, getFeaturedWork } from "@/lib/content";
import { testimonials } from "@data/testimonials";

export default function HomePage() {
  const featuredWork = getFeaturedWork(4);
  const recentNotes = getAllNotes().slice(0, 3);

  return (
    <>
      <Hero />
      <ProofBand />
      <SelectedWork items={featuredWork} />
      <Capabilities />
      <Testimonials items={testimonials} />
      <WritingPreview items={recentNotes} />
      <FinalCTA />
    </>
  );
}
