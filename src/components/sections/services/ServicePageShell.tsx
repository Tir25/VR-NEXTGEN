import React, { ReactNode } from "react";

type ServicePageShellProps = {
  badgeText: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  description?: string;
  cardTitle?: string;
  cardBgUrl?: string;
};

export default function ServicePageShell({ badgeText, title, subtitle, children, cardTitle, cardBgUrl }: ServicePageShellProps) {
  return (
    <div id="services" className="min-h-screen pt-8 pb-16 text-black">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Golden title removed - cardTitle hidden */}
        {false && cardTitle && (
          <div className="text-center mb-4 md:mb-5 relative z-20">
            <h2 className="inline-block text-gold text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {cardTitle}
            </h2>
          </div>
        )}

        <header className="text-center mb-6 md:mb-8">
          {/* Golden badge removed - badgeText hidden */}
          {false && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-black text-sm font-medium mb-6 shadow-sm">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              {badgeText}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3 tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">{subtitle}</p>
          )}
        </header>

        <main className="relative rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
          <div
            className="relative bg-cover bg-center"
            style={cardBgUrl ? { backgroundImage: `url('${cardBgUrl}')` } : undefined}
          >
            {/* subtle readability overlay so background stays visible but content is clear */}
            <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px]" aria-hidden />
            <div className="relative p-6 md:p-10">
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
              <section className="relative z-10 max-w-none text-base md:text-[17px] leading-relaxed">
                {children}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


