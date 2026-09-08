import Head from 'next/head';
import Hero from '../src/app/sections/Hero';
import SocialProof from '../src/app/sections/SocialProof';
import HowItWorks from '../src/app/sections/HowItWorks';
import LiveDemo from '../src/app/sections/LiveDemo';
import Skills from '../src/app/sections/Skills';
import Transparent from '../src/app/sections/Transparent';
import Pricing from '../src/app/sections/Pricing';
import Footer from '../src/app/sections/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Aria — Your Company's First AI Employee</title>
        <meta name="description" content="Aria joins your Slack, learns your business, and starts delivering work in minutes. Not a tool. A hire." />
        <meta property="og:title" content="Aria — Your Company's First AI Employee" />
        <meta property="og:description" content="Aria joins your Slack, learns your business, and starts delivering work in minutes." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aria — Your Company's First AI Employee" />
        <meta name="twitter:description" content="Aria joins your Slack, learns your business, and starts delivering work in minutes." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <LiveDemo />
        <Skills />
        <Transparent />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}
