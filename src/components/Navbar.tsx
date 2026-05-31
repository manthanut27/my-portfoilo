import React, { useEffect, useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  hiringManagerMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, hiringManagerMode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Terminal', id: 'terminal' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-brand-navy/10 select-none">
        {/* Scroll Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[3px] bg-brand-orange transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-syne font-black text-3xl md:text-4xl text-brand-navy cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          MU
        </div>

        {/* Desktop Navigation Links */}
        {!hiringManagerMode && (
          <div className="hidden md:flex items-center gap-8 font-syne font-black uppercase text-sm tracking-wide">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={`relative py-1 border-b-2 transition-all duration-300 text-brand-navy cursor-pointer ${
                    isActive ? 'border-brand-orange text-brand-orange' : 'border-transparent hover:text-brand-orange'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Actions Button Bar */}
        <div className="flex items-center gap-4">

          {/* Resume Download Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-orange text-white font-label font-bold text-sm py-2 px-4 md:px-5 rounded-full hover:scale-105 transition-transform duration-200 active:scale-95 shadow-md cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Toggle */}
          {!hiringManagerMode && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-navy cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-screen h-screen z-40 bg-brand-yellow/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 font-syne font-black text-3xl uppercase tracking-wider text-brand-navy">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleScrollTo(link.id)}
                  className={`py-2 px-6 border-b-4 ${
                    activeSection === link.id ? 'border-brand-orange text-brand-orange' : 'border-transparent'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
