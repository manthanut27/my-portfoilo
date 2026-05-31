import { useEffect, useRef } from 'react';

interface ObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = (
  setActiveSection: (id: string) => void,
  onSectionEnter?: (kanji: string, label: string) => void,
  options: ObserverOptions = { threshold: 0.3, rootMargin: '0px' },
  dependencies: any[] = []
) => {
  // Store callbacks in mutable refs to avoid breaking the useEffect dependency chain
  const setActiveSectionRef = useRef(setActiveSection);
  const onSectionEnterRef = useRef(onSectionEnter);

  // Keep refs up-to-date on every render
  useEffect(() => {
    setActiveSectionRef.current = setActiveSection;
    onSectionEnterRef.current = onSectionEnter;
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSectionRef.current(sectionId);

          // Get the Kanji details if available
          const kanji = entry.target.getAttribute('data-kanji');
          const label = entry.target.getAttribute('data-label');

          if (kanji && label && onSectionEnterRef.current) {
            onSectionEnterRef.current(kanji, label);
          }
        }
      });
    }, options);

    // Helper to query and observe all current sections
    const observeSections = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    };

    // Initial binding
    observeSections();

    // Monitor the DOM for lazy-loaded sections mounting
    const mutationObserver = new MutationObserver(() => {
      observeSections();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, ...dependencies]);
};
export default useIntersectionObserver;
