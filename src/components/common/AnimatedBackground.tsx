import React from "react";

/**
 * AnimatedBackground
 * Self-contained, side-effect-free background component that reacts to cursor
 * movement and scroll position. It exposes no props today to keep the contract
 * simple and avoids coupling with layout logic. All DOM event listeners are
 * encapsulated and cleaned up on unmount for isolation.
 */
export default function AnimatedBackground() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [currentSection, setCurrentSection] = React.useState("hero");

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

  React.useEffect(() => {
    if (!rootRef.current) return;

    let lastUpdateTime = 0;
    const throttleDelay = 33; // ~30fps

    function update(e: Event) {
      const now = Date.now();
      if (now - lastUpdateTime < throttleDelay) return;
      lastUpdateTime = now;

      let x = 0.5;
      let y = 0.5;
      type TouchPoint = { clientX: number; clientY: number };
      type TouchLike = { touches: ReadonlyArray<TouchPoint> | TouchPoint[] };
      type MouseLike = { clientX: number; clientY: number };

      const ev = e as unknown;
      const maybeTouch = ev as Partial<TouchLike>;
      if (
        typeof maybeTouch === "object" &&
        maybeTouch !== null &&
        Array.isArray(maybeTouch.touches) &&
        maybeTouch.touches[0]
      ) {
        const t = maybeTouch.touches[0];
        x = t.clientX / window.innerWidth;
        y = t.clientY / window.innerHeight;
      } else {
        const maybeMouse = ev as Partial<MouseLike>;
        if (
          typeof maybeMouse?.clientX === "number" &&
          typeof maybeMouse?.clientY === "number"
        ) {
          x = maybeMouse.clientX / window.innerWidth;
          y = maybeMouse.clientY / window.innerHeight;
        }
      }
      const target = rootRef.current;
      if (!target) return;

      requestAnimationFrame(() => {
        target.style.setProperty("--cursor-x", `${x}`);
        target.style.setProperty("--cursor-y", `${y}`);
      });
    }

    let lastSectionUpdateTime = 0;
    const sectionThrottleDelay = 250;

    function updateCurrentSection() {
      const now = Date.now();
      if (now - lastSectionUpdateTime < sectionThrottleDelay) return;
      lastSectionUpdateTime = now;

      const sections = [
        "hero",
        "services",
        "why",
        "cta",
        "what-we-do-hero",
        "who-we-are-hero",
        "customer-stories",
        "case-studies",
        "events",
        "industries",
        "contact-hero",
        "contact-form",
        "blog-header",
        "blog-feed",
      ];
      const windowHeight = window.innerHeight;

      let mostVisibleSection = "hero";
      let maxVisibility = 0;

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = visibleHeight / windowHeight;

          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisibleSection = sections[i];
          }
        }
      }

      setCurrentSection(mostVisibleSection);
    }

    window.addEventListener("pointermove", update as EventListener, {
      passive: true,
    });
    window.addEventListener("pointerdown", update as EventListener, {
      passive: true,
    });
    window.addEventListener("scroll", updateCurrentSection, { passive: true });
    update(
      new MouseEvent("mousemove", {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      })
    );
    updateCurrentSection();

    return () => {
      window.removeEventListener("pointermove", update as EventListener);
      window.removeEventListener("pointerdown", update as EventListener);
      window.removeEventListener("scroll", updateCurrentSection);
    };
  }, []);

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
      <div className="site-bg__grid" />
      <div className="site-bg__aurora" />
      <div className="site-bg__shine" />
      <div className="site-bg__vignette" />
    </div>
  );
}


