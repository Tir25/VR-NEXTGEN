import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import React from "react";

function AnimatedBackground() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    function update(e: any) {
      let x = 0.5;
      let y = 0.5;
      if (e && typeof e === "object" && "touches" in e && e.touches && e.touches[0]) {
        const t = e.touches[0];
        x = t.clientX / window.innerWidth;
        y = t.clientY / window.innerHeight;
      } else if (e && typeof e.clientX === "number" && typeof e.clientY === "number") {
        x = e.clientX / window.innerWidth;
        y = e.clientY / window.innerHeight;
      }
      el.style.setProperty("--cursor-x", `${x}`);
      el.style.setProperty("--cursor-y", `${y}`);
    }

    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("pointerdown", update, { passive: true });
    update(new MouseEvent("mousemove", { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }));

    return () => {
      window.removeEventListener("pointermove", update as any);
      window.removeEventListener("pointerdown", update as any);
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


