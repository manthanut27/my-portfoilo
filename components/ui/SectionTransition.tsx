'use client';
import { motion } from 'framer-motion';
import { useHiringManager } from '@/providers/HiringManagerProvider';

interface SectionTransitionProps {
  kanji: string;
  label: string;
}

export default function SectionTransition({ kanji, label }: SectionTransitionProps) {
  const { isHiringMode } = useHiringManager();

  if (isHiringMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="section-transition-kanji flex flex-col items-center justify-center py-16 select-none"
    >
      <span
        className="font-syne text-[120px] md:text-[180px] font-extrabold leading-none"
        style={{ color: 'var(--navy)', opacity: 0.08 }}
      >
        {kanji}
      </span>
      <span
        className="font-space text-sm md:text-base font-bold tracking-[0.3em] uppercase -mt-8 md:-mt-12"
        style={{ color: 'var(--navy)', opacity: 0.4 }}
      >
        {label}
      </span>
    </motion.div>
  );
}
