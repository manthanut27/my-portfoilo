import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-brand-yellow text-brand-navy border-t-4 border-brand-navy z-10 relative">
      <div className="font-space text-xs md:text-sm font-bold tracking-wider uppercase">
        © {new Date().getFullYear()} MANTHAN UTEKAR. ALL RIGHTS RESERVED.
      </div>
      <div className="font-space text-xs md:text-sm font-bold tracking-wide uppercase">
        BUILT WITH React + GSAP + too much chai ☕
      </div>
    </footer>
  );
};
export default Footer;
