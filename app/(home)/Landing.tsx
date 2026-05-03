import Footer from "@/src/components/layout/Footer";
import { Hero } from "@/src/components/landing/Hero";
import { FeaturesSection } from "@/src/components/landing/FeaturesSection";
import { StatsSection } from "@/src/components/landing/StatsSection";
import { StepsSection } from "@/src/components/landing/StepsSection";
import { TestimonialSection } from "@/src/components/landing/TestimonialSection";

export default function LandingPage() {
  return (
    <div className="">
      <Hero />
      <FeaturesSection />
      <StatsSection />
      <StepsSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
}
