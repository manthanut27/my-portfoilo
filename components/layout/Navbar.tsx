'use client';
import { useState, useEffect, useCallback } from 'react';
import { navLinks } from '@/lib/constants';
import { useHiringManager } from '@/providers/HiringManagerProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isHiringMode } = useHiringManager();

  // Scroll progress + background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'terminal', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Main Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background: isScrolled ? 'rgba(253, 224, 71, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(12, 74, 110, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="font-syne text-2xl font-extrabold tracking-tight"
            style={{ color: 'var(--navy)' }}
            aria-label="Scroll to top"
          >
            MU
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="relative text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? 'var(--orange-red)' : 'var(--navy)' }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px]"
                      style={{ background: 'var(--orange-red)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Resume Button */}
            <a
              href="/resume/Manthan_Utekar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--orange-red)',
                color: 'white',
              }}
            >
              RESUME
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-[5px] w-7"
              aria-label="Toggle menu"
            >
              <span
                className="block h-[2px] rounded transition-all duration-300"
                style={{
                  background: 'var(--navy)',
                  width: isMenuOpen ? '100%' : '100%',
                  transform: isMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                }}
              />
              <span
                className="block h-[2px] rounded transition-all duration-300"
                style={{
                  background: 'var(--navy)',
                  opacity: isMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-[2px] rounded transition-all duration-300"
                style={{
                  background: 'var(--navy)',
                  transform: isMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: 'var(--navy)' }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollToSection(link.href)}
                className="font-syne text-3xl font-bold"
                style={{ color: 'white' }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              href="/resume/Manthan_Utekar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-8 py-3 text-lg font-bold rounded-full"
              style={{ background: 'var(--orange-red)', color: 'white' }}
            >
              RESUME
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
