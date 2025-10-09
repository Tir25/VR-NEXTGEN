/**
 * Font Optimization Utilities
 * Provides font loading optimization and performance monitoring
 */

interface FontLoadOptions {
  fontFamily: string;
  fontWeight?: number | string;
  fontStyle?: string;
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload?: boolean;
}

class FontOptimizer {
  private loadedFonts = new Set<string>();
  private loadingPromises = new Map<string, Promise<FontFace>>();

  /**
   * Optimize font loading with preloading and fallbacks
   */
  async loadFont(options: FontLoadOptions): Promise<FontFace | null> {
    const fontKey = `${options.fontFamily}-${options.fontWeight || 'normal'}-${options.fontStyle || 'normal'}`;
    
    if (this.loadedFonts.has(fontKey)) {
      return null; // Already loaded
    }

    if (this.loadingPromises.has(fontKey)) {
      return this.loadingPromises.get(fontKey)!;
    }

    const loadPromise = this.loadFontFace(options);
    this.loadingPromises.set(fontKey, loadPromise);

    try {
      const fontFace = await loadPromise;
      this.loadedFonts.add(fontKey);
      this.loadingPromises.delete(fontKey);
      return fontFace;
    } catch (error) {
      console.warn(`Failed to load font ${fontKey}:`, error);
      this.loadingPromises.delete(fontKey);
      return null;
    }
  }

  private async loadFontFace(options: FontLoadOptions): Promise<FontFace> {
    const fontFace = new FontFace(
      options.fontFamily,
      `url(https://fonts.gstatic.com/s/geistsans/v1/geist-sans-${options.fontWeight || 'regular'}.woff2)`,
      {
        weight: options.fontWeight?.toString() || '400',
        style: options.fontStyle || 'normal',
        display: options.display || 'swap',
      }
    );

    await fontFace.load();
    document.fonts.add(fontFace);
    return fontFace;
  }

  /**
   * Preload critical fonts
   */
  preloadCriticalFonts(): void {
    const criticalFonts: FontLoadOptions[] = [
      { fontFamily: 'Geist Sans', fontWeight: 400, preload: true },
      { fontFamily: 'Geist Sans', fontWeight: 500, preload: true },
      { fontFamily: 'Geist Sans', fontWeight: 700, preload: true },
    ];

    criticalFonts.forEach(font => this.loadFont(font));
  }

  /**
   * Get font loading performance metrics
   */
  getFontMetrics(): {
    loadedCount: number;
    loadingCount: number;
    totalSize: number;
  } {
    return {
      loadedCount: this.loadedFonts.size,
      loadingCount: this.loadingPromises.size,
      totalSize: this.estimateFontSize(),
    };
  }

  private estimateFontSize(): number {
    // Rough estimation of font file sizes
    return this.loadedFonts.size * 45000; // ~45KB per font file
  }
}

// Create singleton instance
export const fontOptimizer = new FontOptimizer();

/**
 * Hook for font loading optimization
 */
export function useFontOptimization() {
  const preloadFonts = () => {
    fontOptimizer.preloadCriticalFonts();
  };

  const getMetrics = () => {
    return fontOptimizer.getFontMetrics();
  };

  return {
    preloadFonts,
    getMetrics,
  };
}

/**
 * Font loading performance monitoring
 */
export function monitorFontPerformance() {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes('font') || entry.name.includes('woff')) {
        console.log(`Font loading: ${entry.name} took ${entry.duration}ms`);
        
        // Warn about slow font loads
        if (entry.duration > 1000) {
          console.warn(`Slow font load detected: ${entry.name} (${entry.duration}ms)`);
        }
      }
    }
  });

  observer.observe({ entryTypes: ['resource'] });

  return () => observer.disconnect();
}
