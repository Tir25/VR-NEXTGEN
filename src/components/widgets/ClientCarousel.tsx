import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export type ClientItem = {
  src: string;
  alt?: string;
  title?: string;
  caseStudy?: string;
};

type Props = {
  items: ClientItem[];
  autoMs?: number;
  onChange?: (index: number) => void;
};

export default function ClientCarousel({ items, autoMs = 5000, onChange }: Props) {
  const [angle, setAngle] = useState(0);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const startAuto = useCallback(() => {
    stopAuto();
    intervalRef.current = window.setInterval(() => setCurrent((c) => (c + 1) % items.length), autoMs);
  }, [stopAuto, autoMs, items.length]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const radius = 120;
  const touchStart = useRef(0);

  useEffect(() => {
    const thetaPer = 360 / items.length;
    setAngle(current * thetaPer);
    onChange?.(current);
  }, [current, items.length, onChange]);

  return (
    <section id="clients" className="py-16 md:py-24" aria-label="Client carousel">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-gold">Our Clients</h2>
          <div className="flex gap-3">
            <button
              aria-label="Previous"
              className="h-10 w-10 rounded-full border border-gold text-gold hover:bg-gold hover:text-black"
              onClick={() => setAngle((a) => a - 15)}
            >
              ‹
            </button>
            <button
              aria-label="Next"
              className="h-10 w-10 rounded-full border border-gold text-gold hover:bg-gold hover:text-black"
              onClick={() => setAngle((a) => a + 15)}
            >
              ›
            </button>
          </div>
        </header>
        <div
          className="relative mx-auto h-[280px] w-full max-w-[520px] select-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client logos"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % items.length);
            if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + items.length) % items.length);
          }}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onTouchStart={(e) => (touchStart.current = e.changedTouches[0]?.clientX ?? 0)}
          onTouchEnd={(e) => {
            const endX = e.changedTouches[0]?.clientX ?? 0;
            const dx = endX - touchStart.current;
            if (Math.abs(dx) > 30) {
              if (dx < 0) setCurrent((c) => (c + 1) % items.length);
              else setCurrent((c) => (c - 1 + items.length) % items.length);
            }
          }}
        >
          <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `rotate(${angle}deg)` }}>
            {items.map((item, i) => {
              const theta = (i / items.length) * 360;
              const x = Math.cos((theta * Math.PI) / 180) * radius;
              const y = Math.sin((theta * Math.PI) / 180) * radius;
              return (
                <Image
                  key={(item.src || "") + i}
                  src={item.src}
                  alt={item.alt || item.title || "Client logo"}
                  height={64}
                  width={64}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 md:h-16 md:w-16 rounded-lg bg-white/5 p-3 transition hover:scale-110 hover:shadow-lg border border-transparent hover:border-gold"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


