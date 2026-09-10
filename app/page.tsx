import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import TaskMarquee from "./sections/TaskMarquee";
import Jobs from "./sections/Jobs";
import HowItWorks from "./sections/HowItWorks";
import Capabilities from "./sections/Capabilities";
import Transparency from "./sections/Transparency";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TaskMarquee />
        <Jobs />
        <HowItWorks />
        <Capabilities />
        <Transparency />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
