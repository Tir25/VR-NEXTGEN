import React, { memo } from "react";

type Stat = {
  value: string | number;
  label: string;
};

type HeroStatsProps = {
  stats: Stat[];
  className?: string;
};

function HeroStatsBase({ stats, className }: HeroStatsProps) {
  const safeStats = Array.isArray(stats) ? stats : [];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {safeStats.slice(0, 3).map((s, idx) => (
          <div key={idx} className="stat-item">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-1 md:mb-2">
              {s?.value ?? "-"}
            </div>
            <div className="text-sm md:text-base text-gray-300 uppercase tracking-wider">
              {s?.label ?? ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const HeroStats = memo(HeroStatsBase);
export default HeroStats;


