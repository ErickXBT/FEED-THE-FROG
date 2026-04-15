import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutFeed } from "@/components/AboutFeed";
import { WhatIsFeed } from "@/components/WhatIsFeed";
import { FrogGame } from "@/components/FrogGame";
import { Gallery } from "@/components/Gallery";
import { Tokenomics } from "@/components/Tokenomics";
import { Roadmap } from "@/components/Roadmap";
import { Community } from "@/components/Community";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <AboutFeed />
        <WhatIsFeed />
        <FrogGame />
        <Gallery />
        <Tokenomics />
        <Roadmap />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
