import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import SafeWrapper from "./SafeWrapper";

/**
 * SectionBoundary
 * A thin, reusable wrapper that combines SafeWrapper isolation with
 * ErrorBoundary to prevent ripple effects between sibling sections.
 */
type SectionBoundaryProps = {
  children: React.ReactNode;
  isolate?: boolean;
};

export default function SectionBoundary({ children, isolate = true }: SectionBoundaryProps) {
  return (
    <ErrorBoundary>
      <SafeWrapper isolate={isolate}>{children}</SafeWrapper>
    </ErrorBoundary>
  );
}


