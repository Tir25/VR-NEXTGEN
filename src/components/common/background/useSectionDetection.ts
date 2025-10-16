import { useState, useEffect } from 'react';

const SECTIONS = [
  "hero",
  "services",
  "why",
  "cta",
  "what-we-do-hero",
  "what-we-do-main",
  "who-we-are-hero",
  "our-values",
  "our-vision",
  "customer-stories",
  "case-studies",
  "events",
  "industries",
  "contact-hero",
  "contact-form",
  "blog-header",
  "blog-feed",
  "careers-hero",
  "careers-content",
];

export function useSectionDetection() {
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    let lastSectionUpdateTime = 0;
    const sectionThrottleDelay = 250;

    function updateCurrentSection() {
      const now = Date.now();
      if (now - lastSectionUpdateTime < sectionThrottleDelay) return;
      lastSectionUpdateTime = now;

      const windowHeight = window.innerHeight;
      let mostVisibleSection = "hero";
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

    // Listen to scroll events
    window.addEventListener('scroll', updateCurrentSection, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateCurrentSection);
    };
  }, []);

  return currentSection;
}
