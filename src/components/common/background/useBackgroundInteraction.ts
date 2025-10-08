import { useRef, useEffect } from 'react';
import { MAGIC_NUMBERS } from '@/constants';

export function useBackgroundInteraction() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    let lastUpdateTime = 0;
    const throttleDelay = 1000 / MAGIC_NUMBERS.PERFORMANCE.MOBILE_TARGET_FPS; // ~30fps

    function update(e: Event) {
      const now = Date.now();
      if (now - lastUpdateTime < throttleDelay) return;
      lastUpdateTime = now;

      let x = 0.5;
      let y = 0.5;
      type TouchPoint = { clientX: number; clientY: number };
      type TouchLike = { touches: ReadonlyArray<TouchPoint> | TouchPoint[] };
      type MouseLike = { clientX: number; clientY: number };

      const ev = e as unknown;
      const maybeTouch = ev as Partial<TouchLike>;
      if (
        typeof maybeTouch === "object" &&
        maybeTouch !== null &&
        Array.isArray(maybeTouch.touches) &&
        maybeTouch.touches[0]
      ) {
        const t = maybeTouch.touches[0];
        x = t.clientX / window.innerWidth;
        y = t.clientY / window.innerHeight;
      } else {
        const maybeMouse = ev as Partial<MouseLike>;
        if (
          typeof maybeMouse?.clientX === "number" &&
          typeof maybeMouse?.clientY === "number"
        ) {
          x = maybeMouse.clientX / window.innerWidth;
          y = maybeMouse.clientY / window.innerHeight;
        }
      }
      const target = rootRef.current;
      if (!target) return;

      requestAnimationFrame(() => {
        target.style.setProperty("--cursor-x", `${x}`);
        target.style.setProperty("--cursor-y", `${y}`);
      });
    }

    window.addEventListener("pointermove", update as EventListener, {
      passive: true,
    });
    window.addEventListener("pointerdown", update as EventListener, {
      passive: true,
    });
    
    // Initialize cursor position
    update(
      new MouseEvent("mousemove", {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      })
    );

    return () => {
      window.removeEventListener("pointermove", update as EventListener);
      window.removeEventListener("pointerdown", update as EventListener);
    };
  }, []);

  return rootRef;
}
