import { Hero } from "@features/landing/components/Hero";
import { Header } from "@features/landing/components/Header";
import { Footer } from "@features/landing/components/Footer";
import { CTASection } from "@features/landing/components/CTASection";
import { RolesSection } from "@features/landing/components/RolesSection";
import { StepsSection } from "@features/landing/components/StepsSection";
import { FeaturesSection } from "@features/landing/components/FeaturesSection";

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
