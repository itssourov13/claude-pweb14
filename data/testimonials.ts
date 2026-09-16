export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

// Fixture data (P2). Replace with real, attributed quotes before launch —
// see project-planning/09-decisions/notes-and-assumptions.md.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Sourov found the actual problem in our checkout flow in a single afternoon of watching session recordings — something we hadn't managed in months of internal debate.",
    name: "Jordan Lee",
    role: "Head of Product",
    company: "Northwind",
  },
  {
    quote:
      "The dashboard redesign didn't just look calmer, it measurably changed how often people came back. Rare to get both.",
    name: "Priya Nair",
    role: "VP Engineering",
    company: "Atlas Analytics",
  },
  {
    quote:
      "Clear communication, realistic timelines, and the kind of craft that shows up in the details nobody else would have bothered with.",
    name: "Sam Whitfield",
    role: "Founder",
    company: "Fernway",
  },
];
