import { useEffect, useState } from "react";
import { getOptimizedScrollManager } from "@/utils/UnifiedScrollManager";

/**
 * useViewport
 * Subscribes to the single debounced resize publisher in UnifiedScrollManager
 * and returns current viewport width/height. Avoids adding extra resize
 * listeners per component and keeps updates consistent across the app.
 */
export function useViewport() {
  const [size, setSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  useEffect(() => {
    const manager = getOptimizedScrollManager();
    // Immediate sync in case values changed before subscription
    setSize({ width: window.innerWidth, height: window.innerHeight });

    const unregister = manager.register(
      `viewport-subscriber-${Math.random().toString(36).slice(2)}`,
      (evt) => {
        setSize((prev) => {
          if (prev.width === evt.viewportWidth && prev.height === evt.viewportHeight) return prev;
          return { width: evt.viewportWidth, height: evt.viewportHeight };
        });
      },
      16 // throttle in ms
    );

    return () => unregister();
  }, []);

  return size;
}

export default useViewport;


