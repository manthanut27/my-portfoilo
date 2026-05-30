'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useLiveAge } from '@/hooks/useLiveAge';
import { typewriterStrings } from '@/lib/constants';
import { getAvailabilityStatus } from '@/lib/supabase';

export default function HeroSection() {
  const { displayText, showCursor } = useTypewriter(typewriterStrings);
  const { age, mounted: ageMounted } = useLiveAge();
  const [availability, setAvailability] = useState<'open' | 'busy'>('open');
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    getAvailabilityStatus().then(setAvailability);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollIndicatorVisible = scrollY < 100;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--fizzi-yellow)' }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 py-24 md:py-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-6 z-10">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full"
              style={{ background: 'var(--dark-bg)', color: 'white' }}
            >
              ⚡ BUILDING: FITMIRROR
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full"
              style={{
                background: availability === 'open' ? 'var(--orange-red)' : 'var(--navy)',
                color: 'white',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: availability === 'open' ? '#4ade80' : '#fbbf24' }}
              />
              {availability === 'open' ? 'OPEN TO WORK' : 'CURRENTLY BUSY'}
            </span>
          </motion.div>

          {/* Name Reveal */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="font-syne text-[64px] md:text-[100px] lg:text-[120px] font-extrabold leading-[0.9] tracking-tight"
              style={{ color: 'var(--navy)' }}
            >
              MANTHAN
            </motion.h1>
          </div>
          <div className="overflow-hidden -mt-2">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
              className="font-syne text-[64px] md:text-[100px] lg:text-[120px] font-extrabold leading-[0.9] tracking-tight"
              style={{ color: 'var(--orange-red)' }}
            >
              UTEKAR
            </motion.h1>
          </div>

          {/* Typewriter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="font-space text-sm md:text-base"
            style={{ color: 'var(--navy)' }}
          >
            {displayText}
            <span
              className="typewriter-cursor inline-block w-[2px] h-[1em] ml-0.5 align-text-bottom"
              style={{ background: 'var(--orange-red)', opacity: showCursor ? 1 : 0 }}
            />
          </motion.p>

          {/* Live Age */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="font-space text-xs opacity-60"
            suppressHydrationWarning
          >
            {ageMounted
              ? `${age.years} years, ${age.months} months, ${age.days} days, ${age.hours}h ${age.minutes}m ${age.seconds}s`
              : '\u00A0'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 text-sm font-bold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ background: 'var(--orange-red)', color: 'white' }}
            >
              VIEW MY WORK
            </a>
            <a
              href="/resume/Manthan_Utekar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-sm font-bold rounded-full border-2 transition-all duration-200 hover:scale-105"
              style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
            >
              DOWNLOAD CV
            </a>
          </motion.div>
        </div>

        {/* Right Column — Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
          className="relative hidden md:flex items-center justify-center"
          style={{ height: '500px' }}
        >
          {/* Outer Dashed Ring */}
          <div
            className="absolute w-[420px] h-[420px] rounded-full border-2 border-dashed"
            style={{
              borderColor: 'rgba(12, 74, 110, 0.15)',
              animation: 'slowSpin 24s linear infinite',
            }}
          />
          {/* Middle Ring */}
          <div
            className="absolute w-[320px] h-[320px] rounded-full border"
            style={{
              borderColor: 'rgba(12, 74, 110, 0.1)',
              animation: 'slowSpinReverse 16s linear infinite',
            }}
          />
          {/* Inner Ring */}
          <div
            className="absolute w-[220px] h-[220px] rounded-full border"
            style={{ borderColor: 'rgba(12, 74, 110, 0.08)' }}
          />

          {/* Floating Blobs */}
          <div
            className="absolute w-24 h-24 rounded-full blur-xl"
            style={{
              background: 'var(--pink)',
              top: '10%',
              right: '10%',
              animation: 'float 6s ease-in-out infinite',
              opacity: 0.6,
            }}
          />
          <div
            className="absolute w-20 h-20 rounded-full blur-xl"
            style={{
              background: 'var(--lavender)',
              bottom: '15%',
              left: '5%',
              animation: 'floatB 8s ease-in-out infinite',
              opacity: 0.5,
            }}
          />
          <div
            className="absolute w-16 h-16 rounded-full blur-xl"
            style={{
              background: 'var(--cyan)',
              top: '60%',
              right: '5%',
              animation: 'float 7s ease-in-out infinite 1s',
              opacity: 0.5,
            }}
          />

          {/* Accent Dots */}
          <div
            className="absolute w-3 h-3 rounded-full"
            style={{ background: 'var(--grape)', top: '25%', left: '20%' }}
          />
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{ background: 'var(--cherry)', bottom: '30%', right: '20%' }}
          />

          {/* Center MU Monogram */}
          <div
            className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center glass-strong"
          >
            <span
              className="font-syne text-3xl font-extrabold"
              style={{ color: 'var(--navy)' }}
            >
              MU
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollIndicatorVisible ? 1 : 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-space text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--navy)', opacity: 0.5 }}
        >
          SCROLL
        </span>
        <div className="w-[1px] h-8 scroll-indicator-line" style={{ background: 'var(--navy)', opacity: 0.3 }} />
      </motion.div>
    </section>
  );
}
