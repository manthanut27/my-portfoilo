import React from 'react';
import { Briefcase, Sliders } from 'lucide-react';

interface HMModeToggleProps {
  active: boolean;
  onToggle: () => void;
}

export const HMModeToggle: React.FC<HMModeToggleProps> = ({ active, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full font-label font-bold text-sm md:text-base shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border ${
        active
          ? 'bg-brand-navy text-white border-white/20'
          : 'bg-white text-brand-navy border-brand-navy/10 hover:bg-brand-navy/5'
      }`}
    >
      {active ? (
        <>
          <Sliders className="w-5 h-5 animate-pulse text-brand-orange" />
          <span>Exit Hiring Manager Mode</span>
        </>
      ) : (
        <>
          <Briefcase className="w-5 h-5 text-brand-orange" />
          <span>👔 Hiring Manager Mode</span>
        </>
      )}
    </button>
  );
};
export default HMModeToggle;
