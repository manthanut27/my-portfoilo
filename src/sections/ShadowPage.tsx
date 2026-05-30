import React, { useEffect } from 'react';

export const ShadowPage: React.FC = () => {
  useEffect(() => {
    // Set browser tab title
    document.title = 'shadow // manthan utekar';
    // Set page background and lock scroll
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    document.body.style.fontFamily = 'Space Mono, monospace';

    return () => {
      // Restore defaults on exit
      document.title = 'Manthan Utekar | Portfolio';
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-white text-black flex items-center justify-center font-mono select-none px-6">
      <span className="text-base md:text-lg tracking-wider text-center select-text">
        you found the shadow. not many do.
      </span>
    </div>
  );
};
export default ShadowPage;
