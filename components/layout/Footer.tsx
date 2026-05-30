'use client';
import { useHiringManager } from '@/providers/HiringManagerProvider';

export default function Footer() {
  const { isHiringMode, toggleHiringMode } = useHiringManager();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        className="relative py-12 px-6 text-center"
        style={{ background: 'var(--footer-yellow)', color: 'var(--navy)' }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-sm font-medium">
            © 2026 Manthan Utekar. All rights reserved.
          </p>
          <p className="text-xs opacity-60 font-space">
            built with React + GSAP + too much chai ☕
          </p>
          <button
            onClick={scrollToTop}
            className="mx-auto flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110"
            style={{ background: 'var(--navy)', color: 'var(--footer-yellow)' }}
            aria-label="Back to top"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </footer>

      {/* Hiring Manager Mode Toggle */}
      <button
        onClick={toggleHiringMode}
        className="fixed bottom-6 right-6 z-[90] px-5 py-3 rounded-full text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105"
        style={{
          background: isHiringMode ? 'var(--orange-red)' : 'var(--navy)',
          color: 'white',
        }}
      >
        {isHiringMode ? '✨ Exit Hiring Mode' : '👔 Hiring Manager Mode'}
      </button>
    </>
  );
}
