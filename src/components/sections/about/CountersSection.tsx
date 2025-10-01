import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

function useCountTo(target: number, enabled: boolean, durationMs: number = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const steps = 60;
    const stepTime = Math.max(16, Math.floor(durationMs / steps));
    let current = 0;
    const inc = target / steps;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setValue(Math.round(current));
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, enabled, durationMs]);
  return value;
}

const metrics = [
  { label: "Years of Experience", value: 12 },
  { label: "Projects Completed", value: 140 },
  { label: "Satisfied Clients", value: 85 },
];

export default function CountersSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <section className="py-16 md:py-24" aria-label="Company metrics">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {metrics.map((m) => (
            <Metric key={m.label} label={m.label} value={m.value} enabled={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, enabled }: { label: string; value: number; enabled: boolean }) {
  const count = useCountTo(value, enabled);
  return (
    <div>
      <div className="text-4xl md:text-5xl font-extrabold text-gold">{count}</div>
      <div className="mt-2 text-white/80">{label}</div>
    </div>
  );
}


