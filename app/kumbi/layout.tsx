import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KUMBI — Highly Densified Property | Shelter Zimbabwe",
  description:
    "Turn your property into a passive income asset with KUMBI by Shelter Zimbabwe. Transform dormant land and unfinished structures into high-density rental income properties in Zimbabwe.",
  alternates: { canonical: "https://shelter.co.zw/kumbi" },
  openGraph: {
    title: "KUMBI — Highly Densified Property | Shelter Zimbabwe",
    description:
      "Transform your dormant land or unfinished structure into a passive income asset. KUMBI by Shelter Zimbabwe.",
    images: [{ url: "/kumbi-hero.jpeg", width: 1200, height: 630, alt: "KUMBI by Shelter Zimbabwe" }],
  },
};

export default function KumbiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
