import { Hero } from "@/components/landing/Hero";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CTASection } from "@/components/landing/CTASection";
import { RolesSection } from "@/components/landing/RolesSection";
import { StepsSection } from "@/components/landing/StepsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";

export const LandingPage = () => {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />

      <main id="content" className="flex-1">
        <Hero />
        <FeaturesSection />
        <RolesSection />
        <StepsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};
