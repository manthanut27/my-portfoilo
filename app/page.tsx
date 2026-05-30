'use client';
import { useState, useCallback } from 'react';
import { useKonami } from '@/hooks/useKonami';
import { useHiringManager } from '@/providers/HiringManagerProvider';
import LoadingScreen from '@/components/sections/LoadingScreen';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeStrip from '@/components/layout/MarqueeStrip';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TerminalSection from '@/components/sections/TerminalSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [konamiActive, setKonamiActive] = useState(false);
  const { isHiringMode } = useHiringManager();

  const handleKonami = useCallback(() => {
    if (isHiringMode) return;
    setKonamiActive(true);
    setTimeout(() => setKonamiActive(false), 3000);
  }, [isHiringMode]);

  useKonami(handleKonami);

  return (
    <>
      <LoadingScreen />

      {/* Konami Overlay */}
      {konamiActive && (
        <div className="konami-overlay">
          <div className="text-center">
            <p className="text-6xl mb-4">🎮</p>
            <p>↑↑↓↓←→←→BA</p>
            <p className="text-lg mt-2 opacity-60">You found it!</p>
          </div>
        </div>
      )}

      <div className={isHiringMode ? 'hiring-mode' : ''}>
        <Navbar />

        <main>
          <HeroSection />
          <MarqueeStrip />
          <AboutSection />
          <MarqueeStrip />
          <SkillsSection />
          <MarqueeStrip />
          <ProjectsSection />
          <MarqueeStrip />
          <TerminalSection />
          <MarqueeStrip />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
