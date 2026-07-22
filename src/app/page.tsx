import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { AudienceSection } from "@/components/marketing/AudienceSection";
import { MethodSection } from "@/components/marketing/MethodSection";
import { ExperienceSection } from "@/components/marketing/ExperienceSection";
import { AICoachSection } from "@/components/marketing/AICoachSection";
import { PricingSection } from "@/components/marketing/PricingSection";
import { CtaSection } from "@/components/marketing/CtaSection";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ProblemSection />
      <AudienceSection />
      <MethodSection />
      <ExperienceSection />
      <AICoachSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </>
  );
}
