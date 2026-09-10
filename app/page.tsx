import HeroSection from "./sections/HeroSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import GradientBreakSection from "./sections/GradientBreakSection";
import ComparisonSection from "./sections/ComparisonSection";
import CapabilitiesSection from "./sections/CapabilitiesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import TrustSection from "./sections/TrustSection";
import PricingSection from "./sections/PricingSection";
import FAQSection from "./sections/FAQSection";
import FinalCTASection from "./sections/FinalCTASection";
import FooterSection from "./sections/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-hyper-dark">
      <HeroSection />
      <GradientBreakSection />
      <HowItWorksSection />
      <ComparisonSection />
      <CapabilitiesSection />
      <TestimonialsSection />
      <TrustSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <FooterSection />
    </main>
  );
}
