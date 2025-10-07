import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import AnimatedBackground from "@/components/common/AnimatedBackground";
import SectionBoundary from "@/components/common/SectionBoundary";
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
      <div className="flex min-h-screen flex-col bg-black text-white">
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDesc} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDesc} />
          <meta property="og:type" content="website" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
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
        
        <main id="main" className="flex-1">
          <SectionBoundary>
            {children}
          </SectionBoundary>
        </main>
        
        <SectionBoundary>
          <Footer />
        </SectionBoundary>
      </div>
    </ErrorBoundary>
  );
}


