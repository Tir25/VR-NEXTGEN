import { useEffect } from 'react';

/**
 * Custom hook to scroll to top on component mount
 * Provides a clean way to ensure pages start at the top
 */
export function useScrollToTop() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);
}
