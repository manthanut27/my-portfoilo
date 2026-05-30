import React from 'react';

interface MarqueeStripProps {
  text?: string;
  speedClass?: string;
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({
  text = 'REACT · NODE.JS · SUPABASE · GSAP · THREE.JS · FRAMER MOTION · BUILD · SHIP · REPEAT · ',
  speedClass = 'animate-marquee'
}) => {
  // Triple the text to make sure it covers screen widths beautifully
  const textContent = `${text}${text}${text}`;

  return (
    <div className="w-full bg-brand-orange text-brand-yellow font-space text-sm md:text-base font-bold py-3 md:py-4 overflow-hidden border-y-2 border-brand-navy/15 select-none relative z-10">
      <div className="whitespace-nowrap flex">
        <div className={`${speedClass} inline-block uppercase tracking-widest`}>
          {textContent}
        </div>
        <div aria-hidden="true" className={`${speedClass} inline-block uppercase tracking-widest`}>
          {textContent}
        </div>
      </div>
    </div>
  );
};
export default MarqueeStrip;
