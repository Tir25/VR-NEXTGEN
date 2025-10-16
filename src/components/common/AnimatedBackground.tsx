import { useUnifiedBackgroundAnimation } from "@/contexts/ScrollContext";
import { useBackgroundInteraction } from "./background/useBackgroundInteraction";
import { useSectionDetection } from "./background/useSectionDetection";
import BackgroundEffects from "./background/BackgroundEffects";
import { useConditionalAnimation } from "@/hooks/usePerformanceAnimation";

/**
 * AnimatedBackground
 * Self-contained, side-effect-free background component that reacts to cursor
 * movement and scroll position. Refactored for modularity and reusability.
 */
export default function AnimatedBackground() {
  const rootRef = useBackgroundInteraction();
  const currentSection = useSectionDetection();
  const { shouldBackgroundEffects, isLowEnd } = useConditionalAnimation();
  
  // Use unified background animation hook only if effects are enabled
  // Always call the hook to satisfy React Hook rules, but conditionally use its result
  useUnifiedBackgroundAnimation();
  // Note: Animation result is used by the BackgroundEffects component internally

  function getSectionClass(sectionId: string): string {
    const sectionMapping: Record<string, string> = {
      hero: "hero",
      services: "services",
      why: "why-choose",
      cta: "hero",
      "what-we-do-hero": "hero",
      "what-we-do-main": "hero", // Keep hero background for main content section
      "who-we-are-hero": "hero",
      "our-values": "why-choose", // Use why-choose styling for values section
      "our-vision": "hero", // Use hero styling for vision section
      "customer-stories": "services",
      "case-studies": "why-choose",
      events: "clients",
      industries: "industries",
      "contact-hero": "hero",
      "contact-form": "hero",
      "blog-header": "hero",
      "blog-feed": "hero",
      "careers-hero": "hero",
      "careers-content": "services",
    };

    return sectionMapping[sectionId] || "hero";
  }

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`site-bg pointer-events-none section-${getSectionClass(
        currentSection
      )} ${isLowEnd ? 'low-end-device' : ''}`}
      style={{
        "--cursor-x": "0.5",
        "--cursor-y": "0.5",
        "--gold": "var(--accent-gold)",
      } as React.CSSProperties}
    >
      {shouldBackgroundEffects ? (
        <BackgroundEffects currentSection={currentSection} />
      ) : (
        <div className="simplified-background" />
      )}
    </div>
  );
}


