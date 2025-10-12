import React from "react";
import ErrorBoundary from "./ErrorBoundary";

/**
 * SectionBoundary
 * A thin, reusable wrapper that provides error boundary isolation
 * to prevent ripple effects between sibling sections.
 */
type SectionBoundaryProps = {
  children: React.ReactNode;
  isolate?: boolean; // Kept for backward compatibility but not used
};

export default function SectionBoundary({ children }: SectionBoundaryProps) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}


