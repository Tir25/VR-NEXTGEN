import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import React from "react";

function AnimatedBackground() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!rootRef.current) return;

    // Safe event handler that supports mouse, pointer and touch events without relying on instanceof checks
    function update(e: Event) {
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
      target.style.setProperty("--cursor-x", `${x}`);
      target.style.setProperty("--cursor-y", `${y}`);
    }

    window.addEventListener("pointermove", update as EventListener, { passive: true });
    window.addEventListener("pointerdown", update as EventListener, { passive: true });
    update(new MouseEvent("mousemove", { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }));

    return () => {
      window.removeEventListener("pointermove", update as EventListener);
      window.removeEventListener("pointerdown", update as EventListener);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="site-bg pointer-events-none">
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
        {children}
      </main>
      <Footer />
    </div>
  );
}


