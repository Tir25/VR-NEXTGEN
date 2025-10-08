import React from "react";
import { useUnifiedBackgroundAnimation } from "@/contexts/ScrollContext";
import { useBackgroundInteraction } from "./background/useBackgroundInteraction";
import { useSectionDetection } from "./background/useSectionDetection";
import BackgroundEffects from "./background/BackgroundEffects";

/**
 * AnimatedBackground
 * Self-contained, side-effect-free background component that reacts to cursor
 * movement and scroll position. Refactored for modularity and reusability.
 */
export default function AnimatedBackground() {
  const rootRef = useBackgroundInteraction();
  const currentSection = useSectionDetection();
  
  // Use unified background animation hook
  useUnifiedBackgroundAnimation();

  function getSectionClass(sectionId: string): string {
    const sectionMapping: Record<string, string> = {
      hero: "hero",
      services: "services",
      why: "why-choose",
      cta: "hero",
      "what-we-do-hero": "hero",
      "who-we-are-hero": "hero",
      "customer-stories": "services",
      "case-studies": "why-choose",
      events: "clients",
      industries: "industries",
      "contact-hero": "hero",
      "contact-form": "hero",
      "blog-header": "hero",
      "blog-feed": "hero",
    };

    return sectionMapping[sectionId] || "hero";
  }

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`site-bg pointer-events-none section-${getSectionClass(
        currentSection
      )}`}
      style={{
        "--cursor-x": "0.5",
        "--cursor-y": "0.5",
        "--gold": "var(--accent-gold)",
      } as React.CSSProperties}
    >
      <BackgroundEffects currentSection={currentSection} />
    </div>
  );
}


