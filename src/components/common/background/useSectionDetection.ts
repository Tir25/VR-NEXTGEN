import { useState, useEffect } from 'react';

const SECTIONS = [
  'hero',
  'services',
  'why',
  'cta',
  'what-we-do-hero',
  'who-we-are-hero',
  'customer-stories',
  'case-studies',
  'events',
  'industries',
  'contact-hero',
  'contact-form',
  'blog-header',
  'blog-feed',
];

export function useSectionDetection() {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    let lastSectionUpdateTime = 0;
    const sectionThrottleDelay = 250;

    function updateCurrentSection() {
      const now = Date.now();
      if (now - lastSectionUpdateTime < sectionThrottleDelay) return;
      lastSectionUpdateTime = now;

      const windowHeight = window.innerHeight;
      let mostVisibleSection = 'hero';
      let maxVisibility = 0;

      for (let i = 0; i < SECTIONS.length; i++) {
        const section = document.getElementById(SECTIONS[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = visibleHeight / windowHeight;

          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisibleSection = SECTIONS[i];
          }
        }
      }

      setCurrentSection(mostVisibleSection);
    }

    // Initial detection
    updateCurrentSection();

    // Note: Scroll handling is managed by the unified scroll controller
    // No need to add scroll event listener here
  }, []);

  return currentSection;
}
