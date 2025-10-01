import { useEffect, useState } from "react";

export default function AboutHero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden" aria-label="About hero">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,215,0,0.07),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(255,215,0,0.06),transparent_40%)]"
        style={{ transform: `translateY(${offset * -1}px)` }}
        aria-hidden
      />
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gold">About VR Next Gen Solutions</h1>
      </div>
    </section>
  );
}


