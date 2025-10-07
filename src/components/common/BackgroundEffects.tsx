/**
 * BackgroundEffects Component
 * Modular and reusable background effects system
 * Provides consistent layering and performance optimization
 */

import React from 'react';

interface BackgroundEffectsProps {
  /** Background variant */
  variant?: 'hero' | 'services' | 'industries' | 'why-choose' | 'clients';
  /** Enable grid animation */
  enableGrid?: boolean;
  /** Enable aurora effect */
  enableAurora?: boolean;
  /** Enable shine effect */
  enableShine?: boolean;
  /** Enable vignette */
  enableVignette?: boolean;
  /** Enable starfield (for cosmic themes) */
  enableStarfield?: boolean;
  /** Custom z-index */
  zIndex?: number;
  /** Custom className */
  className?: string;
}

/**
 * Centralized background effects configuration
 */
const BACKGROUND_CONFIGS = {
  hero: {
    enableGrid: true,
    enableAurora: true,
    enableShine: true,
    enableVignette: true,
    enableStarfield: false,
    gridColor: 'rgba(255,255,255,0.08)',
    auroraColors: [
      'rgba(173,151,79,0.12)',
      'rgba(142,121,62,0.10)',
      'rgba(255,215,0,0.08)'
    ]
  },
  services: {
    enableGrid: true,
    enableAurora: true,
    enableShine: true,
    enableVignette: false,
    enableStarfield: false,
    gridColor: 'rgba(255,187,1,0.40)',
    auroraColors: [
      'rgba(255,187,1,0.08)',
      'rgba(255,187,1,0.06)',
      'rgba(255,187,1,0.04)'
    ]
  },
  industries: {
    enableGrid: true,
    enableAurora: true,
    enableShine: true,
    enableVignette: false,
    enableStarfield: true,
    gridColor: 'rgba(255,255,255,0.08)',
    auroraColors: [
      'rgba(157,0,255,0.12)',
      'rgba(0,229,255,0.10)',
      'rgba(255,0,229,0.08)'
    ]
  },
  'why-choose': {
    enableGrid: true,
    enableAurora: true,
    enableShine: false,
    enableVignette: false,
    enableStarfield: false,
    gridColor: 'rgba(255,255,255,0.12)',
    auroraColors: [
      'rgba(255,215,0,0.15)',
      'rgba(255,215,0,0.12)',
      'rgba(255,215,0,0.10)'
    ]
  },
  clients: {
    enableGrid: true,
    enableAurora: true,
    enableShine: true,
    enableVignette: false,
    enableStarfield: false,
    gridColor: 'rgba(255,187,1,0.40)',
    auroraColors: [
      'rgba(255,187,1,0.08)',
      'rgba(255,187,1,0.06)',
      'rgba(255,187,1,0.04)'
    ]
  }
} as const;

export default function BackgroundEffects({
  variant = 'hero',
  enableGrid,
  enableAurora,
  enableShine,
  enableVignette,
  enableStarfield,
  zIndex = 0,
  className = ''
}: BackgroundEffectsProps) {
  const config = BACKGROUND_CONFIGS[variant];

  // Override defaults with props if provided
  const finalConfig = {
    enableGrid: enableGrid ?? config.enableGrid,
    enableAurora: enableAurora ?? config.enableAurora,
    enableShine: enableShine ?? config.enableShine,
    enableVignette: enableVignette ?? config.enableVignette,
    enableStarfield: enableStarfield ?? config.enableStarfield,
    gridColor: config.gridColor,
    auroraColors: config.auroraColors
  };

  return (
    <div 
      className={`site-bg section-${variant} ${className}`}
      style={{ zIndex }}
    >
      {/* Grid Layer */}
      {finalConfig.enableGrid && (
        <div 
          className="site-bg__grid"
          style={{
            backgroundImage: `
              linear-gradient(${finalConfig.gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${finalConfig.gridColor} 1px, transparent 1px)
            `
          }}
        />
      )}

      {/* Aurora Layer */}
      {finalConfig.enableAurora && (
        <div 
          className="site-bg__aurora"
          style={{
            background: `
              radial-gradient(600px 300px at 20% 10%, ${finalConfig.auroraColors[0]}, transparent 60%),
              radial-gradient(500px 250px at 80% 20%, ${finalConfig.auroraColors[1]}, transparent 60%),
              radial-gradient(700px 350px at 50% 80%, ${finalConfig.auroraColors[2]}, transparent 65%)
            `
          }}
        />
      )}

      {/* Shine Layer */}
      {finalConfig.enableShine && (
        <div className="site-bg__shine" />
      )}

      {/* Vignette Layer */}
      {finalConfig.enableVignette && (
        <div className="site-bg__vignette" />
      )}

      {/* Starfield Layer (for cosmic themes) */}
      {finalConfig.enableStarfield && (
        <div className="site-bg__starfield" />
      )}
    </div>
  );
}

// Export individual background layers for granular control
export const GridLayer = ({ color = 'rgba(255,255,255,0.08)' }: { color?: string }) => (
  <div 
    className="site-bg__grid"
    style={{
      backgroundImage: `
        linear-gradient(${color} 1px, transparent 1px),
        linear-gradient(90deg, ${color} 1px, transparent 1px)
      `
    }}
  />
);

export const AuroraLayer = ({ colors }: { colors: string[] }) => (
  <div 
    className="site-bg__aurora"
    style={{
      background: `
        radial-gradient(600px 300px at 20% 10%, ${colors[0]}, transparent 60%),
        radial-gradient(500px 250px at 80% 20%, ${colors[1]}, transparent 60%),
        radial-gradient(700px 350px at 50% 80%, ${colors[2]}, transparent 65%)
      `
    }}
  />
);

export const ShineLayer = () => <div className="site-bg__shine" />;
export const VignetteLayer = () => <div className="site-bg__vignette" />;
export const StarfieldLayer = () => <div className="site-bg__starfield" />;
