import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import AnimatedBackground from "@/components/common/AnimatedBackground";
import SectionBoundary from "@/components/common/SectionBoundary";
import PerformanceMonitor from "@/components/common/PerformanceMonitor";
import dynamic from "next/dynamic";

// Dynamic import for scroll performance monitor to avoid SSR issues
const ScrollPerformanceMonitor = dynamic(() => import("@/components/common/ScrollPerformanceMonitor"), {
  ssr: false,
  loading: () => null
});
import MobileOptimizations from "@/components/common/MobileOptimizations";
import { useScrollOptimization } from "@/hooks/useScrollOptimization";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { ReactNode } from "react";

// Import ErrorBoundary directly to reduce dynamic import complexity
import ImportErrorBoundary from "@/components/common/ImportErrorBoundary";

// moved AnimatedBackground to '@/components/common/AnimatedBackground'

type LayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export default function Layout({ title, description, children }: LayoutProps) {
  const pageTitle = title ? `${title} | VR NextGEN Solutions` : "VR NextGEN Solutions";
  const pageDesc = description || "Professional portfolio website for VR NextGEN Solutions, a data-driven consultancy.";

  // Apply comprehensive scroll optimizations
  const { metrics: _metrics, isOptimized: _isOptimized } = useScrollOptimization({
    enablePassiveListeners: true,
    enableGPUAcceleration: true,
    enableSmoothScrolling: true,
    enablePerformanceMonitoring: process.env.NODE_ENV === 'development',
    throttleMs: 16,
    enableReducedMotion: true,
  });

  return (
    <ErrorBoundary>
      <ImportErrorBoundary>
        <ScrollProvider>
          <MobileOptimizations>
            <div className="flex min-h-screen flex-col bg-black text-white">
          <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDesc} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="VR NextGEN Solutions" />
            <meta name="keywords" content="data analytics, business consulting, process optimization, digital transformation, VR NextGEN" />
            <meta name="theme-color" content="#ffd700" />
            <meta name="msapplication-TileColor" content="#000000" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://vrnextgen.com" />
            <meta property="og:image" content="https://vrnextgen.com/images-optimized/logo-Final-png.png" />
            <meta property="og:site_name" content="VR NextGEN Solutions" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDesc} />
            <meta name="twitter:image" content="https://vrnextgen.com/images-optimized/logo-Final-png.png" />
            
            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            
            {/* Resource hints for performance optimization */}
            <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
            <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
            
            {/* Preload critical images */}
            <link rel="preload" href="/images-optimized/Hero.webp" as="image" />
            <link rel="preload" href="/icons-optimized/vr-logo-md.webp" as="image" />
            
            {/* Preload critical fonts - Using system fonts for better performance */}
            {/* <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
            
            {/* Manual prefetch for critical pages */}
            <link rel="prefetch" href="/what-we-do" />
            <link rel="prefetch" href="/who-we-are" />
            <link rel="prefetch" href="/contact" />
            
            {/* Scroll Performance Optimizations - Inline CSS for better performance */}
            <style dangerouslySetInnerHTML={{
              __html: `
                /* Critical scroll optimizations */
                * { -webkit-transform: translateZ(0); transform: translateZ(0); }
                html { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
                .bg-parallax { will-change: transform; }
                @media (prefers-reduced-motion: reduce) {
                  html { scroll-behavior: auto; }
                  .bg-parallax { will-change: auto; }
                }
              `
            }} />
            
            {/* Structured Data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "VR NextGEN Solutions",
                  "url": "https://vrnextgen.com",
                  "logo": "https://vrnextgen.com/images-optimized/logo-Final-png.png",
                  "description": pageDesc,
                  "sameAs": [
                    "https://linkedin.com/company/vr-nextgen-solutions",
                    "https://twitter.com/vrnextgen"
                  ]
                })
              }}
            />
          </Head>
          
          <SectionBoundary>
            <AnimatedBackground />
          </SectionBoundary>
          
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-gold text-black px-3 py-1 rounded">
            Skip to content
          </a>
          
          <SectionBoundary>
            <Header />
          </SectionBoundary>
          
          <main id="main" className="flex-1 relative z-10">
            <SectionBoundary>
              {children}
            </SectionBoundary>
          </main>
          
          
          <footer className="relative z-20">
            <Footer />
          </footer>
          
          {/* Performance Monitors - Development Only */}
          <PerformanceMonitor />
          <ScrollPerformanceMonitor 
            enabled={true}
            showMetrics={process.env.NODE_ENV === 'development'}
            autoOptimize={true}
          />
          </div>
          </MobileOptimizations>
        </ScrollProvider>
      </ImportErrorBoundary>
    </ErrorBoundary>
  );
}


