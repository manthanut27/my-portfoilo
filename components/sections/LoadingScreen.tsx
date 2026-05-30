'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadingPhases } from '@/lib/constants';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [variant, setVariant] = useState<'A' | 'B'>('A');
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Pick variant client-side only to avoid hydration mismatch
    setVariant(Math.random() > 0.5 ? 'A' : 'B');

    // sessionStorage gate
    if (sessionStorage.getItem('portfolio_loaded')) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    sessionStorage.setItem('portfolio_loaded', 'true');
  }, []);

  // Phase progression
  useEffect(() => {
    if (!isVisible) return;

    const timers: NodeJS.Timeout[] = [];
    let elapsed = 0;

    loadingPhases.forEach((phase, i) => {
      timers.push(setTimeout(() => setCurrentPhase(i), elapsed));
      elapsed += phase.duration;
    });

    // Exit after all phases
    timers.push(setTimeout(() => {
      setIsVisible(false);
      window.scrollTo(0, 0);
    }, elapsed + 200));

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: variant === 'A' ? 'var(--dark-bg)' : '#fff' }}
        >
          {variant === 'A' ? (
            <VariantA phase={currentPhase} />
          ) : (
            <VariantB phase={currentPhase} />
          )}

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px]">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.2, ease: 'linear' }}
              style={{ background: 'var(--orange-red)', height: '100%' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VariantA({ phase }: { phase: number }) {
  const phases = loadingPhases;

  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span
            className={`block ${phase < 2 ? 'text-6xl md:text-8xl' : phase === 2 ? 'font-syne text-4xl md:text-7xl font-extrabold tracking-tight' : 'font-space text-xl md:text-2xl tracking-[0.2em]'}`}
            style={{
              color: phase === 3 ? 'var(--orange-red)' : 'white',
            }}
          >
            {phases[phase].text}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}

function VariantB({ phase }: { phase: number }) {
  const isInverted = phase >= 2;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{
        backgroundColor: isInverted ? 'var(--dark-bg)' : '#ffffff',
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Ink splash circles */}
      <motion.div
        className="absolute rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 3, 5] }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        style={{
          width: '200px',
          height: '200px',
          background: isInverted ? 'var(--lavender)' : 'var(--dark-bg)',
        }}
      />
      <motion.div
        className="absolute rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 2, 3.5] }}
        transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
        style={{
          width: '150px',
          height: '150px',
          background: isInverted ? 'var(--grape)' : '#333',
        }}
      />

      {/* Center text */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 font-syne text-4xl md:text-6xl font-extrabold"
        style={{ color: isInverted ? 'white' : 'var(--dark-bg)' }}
      >
        MU
      </motion.span>
    </motion.div>
  );
}
