import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { ReactNode, useState } from "react";
import React from "react";

function AnimatedBackground() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [currentSection, setCurrentSection] = useState('hero');

  // Function to map section IDs to CSS classes
  function getSectionClass(sectionId: string): string {
    const sectionMapping: Record<string, string> = {
      'hero': 'hero',
      'services': 'services',
      'why': 'why-choose',
      'cta': 'hero',
      'what-we-do-hero': 'hero',
      'who-we-are-hero': 'hero',
      'customer-stories': 'services',
      'case-studies': 'why-choose',
      'events': 'clients',
      'industries': 'services',
      'contact-hero': 'hero',
      'contact-form': 'hero',
      'blog-header': 'hero',
      'blog-feed': 'hero'
    };
    
    return sectionMapping[sectionId] || 'hero';
  }

  React.useEffect(() => {
    if (!rootRef.current) return;

    // Optimized event handler with throttling for better performance
    let lastUpdateTime = 0;
    const throttleDelay = 16; // ~60fps
    
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
      
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        target.style.setProperty("--cursor-x", `${x}`);
        target.style.setProperty("--cursor-y", `${y}`);
      });
    }

    // Optimized section detection with throttling
    let lastSectionUpdateTime = 0;
    const sectionThrottleDelay = 100; // Update section every 100ms max
    
    function updateCurrentSection() {
      const now = Date.now();
      if (now - lastSectionUpdateTime < sectionThrottleDelay) return;
      lastSectionUpdateTime = now;
      
      const sections = ['hero', 'services', 'why', 'cta', 'what-we-do-hero', 'who-we-are-hero', 'customer-stories', 'case-studies', 'events', 'industries', 'contact-hero', 'contact-form', 'blog-header', 'blog-feed'];
      const windowHeight = window.innerHeight;
      
      // Find the section that's most visible in the viewport
      let mostVisibleSection = 'hero';
      let maxVisibility = 0;
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, sectionTop);
          const visibleBottom = Math.min(windowHeight, sectionBottom);
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

    window.addEventListener("pointermove", update as EventListener, { passive: true });
    window.addEventListener("pointerdown", update as EventListener, { passive: true });
    window.addEventListener("scroll", updateCurrentSection, { passive: true });
    update(new MouseEvent("mousemove", { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }));
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
      className={`site-bg pointer-events-none section-${getSectionClass(currentSection)}`}
      style={{
        '--cursor-x': '0.5',
        '--cursor-y': '0.5',
        '--gold': 'var(--accent-gold)'
      } as React.CSSProperties}
    >
      <div className="site-bg__grid" />
      <div className="site-bg__aurora" />
      <div className="site-bg__shine" />
      <div className="site-bg__vignette" />
    </div>
  );
}

type LayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export default function Layout({ title, description, children }: LayoutProps) {
  const pageTitle = title ? `${title} | VR NextGEN Solutions` : "VR NextGEN Solutions";
  const pageDesc = description || "Professional portfolio website for VR NextGEN Solutions, a data-driven consultancy.";

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col bg-black text-white">
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDesc} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDesc} />
          <meta property="og:type" content="website" />
        </Head>
        <AnimatedBackground />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-gold text-black px-3 py-1 rounded">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}


