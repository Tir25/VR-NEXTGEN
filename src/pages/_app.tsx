import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { useEffect } from "react";
import { register, preloadCriticalResources, trackPerformance } from "@/utils/serviceWorker";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Register service worker for PWA functionality
    register({
      onSuccess: () => {
        // Service worker registered successfully
      },
      onUpdate: () => {
        // New service worker available
        // Optionally show update notification to user
      }
    });

    // Preload critical resources
    preloadCriticalResources();

    // Track performance metrics
    trackPerformance();
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
