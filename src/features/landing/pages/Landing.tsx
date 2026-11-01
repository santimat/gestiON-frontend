import { Hero } from "../components/Hero";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CTASection } from "../components/CTASection";
import { RolesSection } from "../components/RolesSection";
import { StepsSection } from "../components/StepsSection";
import { FeaturesSection } from "../components/FeaturesSection";

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
