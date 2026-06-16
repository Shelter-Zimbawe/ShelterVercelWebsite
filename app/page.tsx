import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Shelter Zimbabwe | Residential Stands & Land for Sale in Harare",
  description:
    "Buy residential stands in Harare from Zimbabwe's most trusted property developer. Rockview Park, Adelaide Park, Mabvuku Chizhanje and more. Flexible payment plans. Book a site visit today.",
  alternates: { canonical: "https://shelter.co.zw" },
};
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductGallery from "@/components/ProductGallery";
import LocationsMap from "@/components/LocationsMap";
import SuperstructuresSection from "@/components/SuperstructuresSection";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import KumbiModal from "@/components/KumbiModal";
import KumbiSection from "@/components/KumbiSection";
import PageAnalytics from "@/components/PageAnalytics";

export default function Home() {
  return (
    <main className="min-h-screen">
      <PageAnalytics />
      <KumbiModal />
      <Navbar />
      <ScrollRevealSection>
        <Hero />
      </ScrollRevealSection>
      <ScrollRevealSection delay={0.05}>
        <ProductGallery />
      </ScrollRevealSection>
      <ScrollRevealSection delay={0.06}>
        <LocationsMap />
      </ScrollRevealSection>
      <ScrollRevealSection delay={0.08}>
        <SuperstructuresSection />
      </ScrollRevealSection>
      <KumbiSection />
      <ScrollRevealSection delay={0.1}>
        <Features />
      </ScrollRevealSection>
      <ScrollRevealSection delay={0.12}>
        <About />
      </ScrollRevealSection>
      <ScrollRevealSection delay={0.14}>
        <Testimonials />
      </ScrollRevealSection>
      <Footer />
    </main>
  );
}
