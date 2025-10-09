import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import ImportErrorBoundary from "@/components/common/ImportErrorBoundary";
import AnimatedBackground from "@/components/common/AnimatedBackground";
// import SectionBoundary from "@/components/common/SectionBoundary"; // Removed to reduce DOM depth
import FlatContainer from "@/components/common/FlatContainer";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { PerformanceProvider } from "@/utils/componentOptimizer";
import { ReactNode } from "react";

// moved AnimatedBackground to '@/components/common/AnimatedBackground'

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
      <ImportErrorBoundary>
        <PerformanceProvider>
          <ScrollProvider>
          <div className="flex min-h-screen flex-col bg-black text-white">
          <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDesc} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDesc} />
            <meta property="og:type" content="website" />
            {/* Optimized Font Awesome - Only load specific icons we need */}
            <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/solid.min.css" />
          </Head>
          
          {/* Optimized DOM structure - reduced nesting depth */}
          <FlatContainer className="relative z-10" aria-hidden>
            <AnimatedBackground />
          </FlatContainer>
          
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-gold text-black px-3 py-1 rounded">
            Skip to content
          </a>
          
          <Header />
          
          <main id="main" className="flex-1">
            {children}
          </main>
          
          <Footer />
        </div>
        </ScrollProvider>
        </PerformanceProvider>
      </ImportErrorBoundary>
    </ErrorBoundary>
  );
}


