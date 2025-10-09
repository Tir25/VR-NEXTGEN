import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { useEffect } from "react";
import { fontOptimizer, monitorFontPerformance } from "@/utils/fontOptimizer";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize font optimization
    fontOptimizer.preloadCriticalFonts();
    
    // Monitor font performance
    const cleanup = monitorFontPerformance();
    
    return cleanup;
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
