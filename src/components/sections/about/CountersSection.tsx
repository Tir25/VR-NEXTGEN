import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

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
        <div ref={ref}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {metrics.map((m) => (
              <div key={m.label}>
                <Metric label={m.label} value={m.value} enabled={inView} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, enabled }: { label: string; value: number; enabled: boolean }) {
  const { count } = useCountUp(value, 1200, 0);
  return (
    <div>
      <div className="text-4xl md:text-5xl font-extrabold text-gold">{enabled ? count : 0}</div>
      <div className="mt-2 text-white/80">{label}</div>
    </div>
  );
}


