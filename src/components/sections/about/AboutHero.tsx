import { useParallax } from "@/hooks/useParallax";

export default function AboutHero() {
  const offset = useParallax(0.25);

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden" aria-label="About hero">
      {/* Enhanced background */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,215,0,0.08),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(255,215,0,0.06),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(255,215,0,0.04),transparent_60%)]"
        style={{ transform: `translateY(${offset * -1}px)` }}
        aria-hidden
      />
      
      {/* Floating visual elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 left-1/6 w-32 h-32 border border-gold/20 rotate-45 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-1/6 w-24 h-24 bg-gold/10 rounded-full blur-sm animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent rotate-12 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              About Our Company
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gold leading-tight">
                About VR Next Gen 
                <span className="block text-white">Solutions</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                We are a forward-thinking business consulting firm dedicated to transforming organizations through data-driven strategies and innovative solutions.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-gold">50+</div>
                <div className="text-sm text-white/70">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-gold">15+</div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-gold">98%</div>
                <div className="text-sm text-white/70">Client Satisfaction</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-gold">24/7</div>
                <div className="text-sm text-white/70">Support Available</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-96">
              {/* Central company logo/icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/20 rounded-full border-2 border-gold/40 flex items-center justify-center">
                <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-black">VR</span>
                </div>
              </div>

              {/* Orbiting values/features */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gold/10 rounded-full border border-gold/30 flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-20 h-20 bg-gold/10 rounded-full border border-gold/30 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.5s' }}>
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gold/10 rounded-full border border-gold/30 flex items-center justify-center animate-pulse" style={{ animationDelay: '1s' }}>
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-20 h-20 bg-gold/10 rounded-full border border-gold/30 flex items-center justify-center animate-pulse" style={{ animationDelay: '1.5s' }}>
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                <defs>
                  <linearGradient id="aboutLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,215,0,0.4)" />
                    <stop offset="100%" stopColor="rgba(255,215,0,0.1)" />
                  </linearGradient>
                </defs>
                <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="url(#aboutLineGradient)" strokeWidth="2" strokeDasharray="8,4" className="animate-pulse" />
                <line x1="80%" y1="50%" x2="50%" y2="50%" stroke="url(#aboutLineGradient)" strokeWidth="2" strokeDasharray="8,4" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                <line x1="50%" y1="80%" x2="50%" y2="50%" stroke="url(#aboutLineGradient)" strokeWidth="2" strokeDasharray="8,4" className="animate-pulse" style={{ animationDelay: '1s' }} />
                <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="url(#aboutLineGradient)" strokeWidth="2" strokeDasharray="8,4" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


