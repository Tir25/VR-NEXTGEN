/**
 * Performance Detection Utility
 * Detects device capabilities and adjusts performance settings accordingly
 */

interface DeviceCapabilities {
  isLowEnd: boolean;
  isMobile: boolean;
  supportsWebP: boolean;
  supportsAVIF: boolean;
  memoryGB: number;
  cpuCores: number;
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
  prefersReducedMotion: boolean;
}

interface PerformanceSettings {
  enableHeavyAnimations: boolean;
  enableParallax: boolean;
  enableBackgroundEffects: boolean;
  imageQuality: 'high' | 'medium' | 'low';
  animationDuration: number;
  enableGPUAcceleration: boolean;
}

class PerformanceDetector {
  private capabilities: DeviceCapabilities | null = null;
  private settings: PerformanceSettings | null = null;

  constructor() {
    this.detectCapabilities();
    this.generateSettings();
  }

  private detectCapabilities(): void {
    if (typeof window === 'undefined') return;

    const nav = navigator as any;
    
    // Memory detection (Chrome only)
    const memoryGB = nav.deviceMemory ? nav.deviceMemory : 4;
    
    // CPU cores detection
    const cpuCores = nav.hardwareConcurrency || 4;
    
    // Connection type detection
    const connection = (nav as any).connection || (nav as any).mozConnection || (nav as any).webkitConnection;
    const connectionType = connection?.effectiveType || 'unknown';
    
    // Image format support
    const supportsWebP = this.checkWebPSupport();
    const supportsAVIF = this.checkAVIFSupport();
    
    // Device type detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Low-end device detection based on multiple factors
    const isLowEnd = this.checkIsLowEndDevice(memoryGB, cpuCores, connectionType, isMobile);
    
    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.capabilities = {
      isLowEnd,
      isMobile,
      supportsWebP,
      supportsAVIF,
      memoryGB,
      cpuCores,
      connectionType,
      prefersReducedMotion
    };
  }

  private checkIsLowEndDevice(memoryGB: number, cpuCores: number, connectionType: string, isMobile: boolean): boolean {
    // Conservative approach to low-end detection
    const memoryThreshold = isMobile ? 2 : 4; // GB
    const cpuThreshold = isMobile ? 2 : 4; // cores
    const slowConnection = ['slow-2g', '2g'].includes(connectionType);
    
    return (
      memoryGB < memoryThreshold ||
      cpuCores < cpuThreshold ||
      slowConnection ||
      // Additional mobile-specific checks
      (isMobile && (memoryGB < 3 || cpuCores < 4))
    );
  }

  private checkWebPSupport(): boolean {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch {
      return false;
    }
  }

  private checkAVIFSupport(): boolean {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    } catch {
      return false;
    }
  }

  private generateSettings(): void {
    if (!this.capabilities) return;

    const { isLowEnd, isMobile, supportsWebP, supportsAVIF, prefersReducedMotion } = this.capabilities;

    // Determine image quality based on device capabilities
    let imageQuality: 'high' | 'medium' | 'low' = 'high';
    if (isLowEnd || !supportsWebP) {
      imageQuality = 'low';
    } else if (isMobile && !supportsAVIF) {
      imageQuality = 'medium';
    }

    // Animation settings based on device capabilities
    const enableHeavyAnimations = !isLowEnd && !prefersReducedMotion;
    const enableParallax = !isLowEnd && !prefersReducedMotion && !isMobile;
    const enableBackgroundEffects = !isLowEnd && !prefersReducedMotion;
    const enableGPUAcceleration = !isLowEnd;

    // Animation duration scaling
    const baseDuration = prefersReducedMotion ? 0.1 : 0.3;
    const animationDuration = isLowEnd ? baseDuration * 0.5 : baseDuration;

    this.settings = {
      enableHeavyAnimations,
      enableParallax,
      enableBackgroundEffects,
      imageQuality,
      animationDuration,
      enableGPUAcceleration
    };
  }

  public getCapabilities(): DeviceCapabilities | null {
    return this.capabilities;
  }

  public getSettings(): PerformanceSettings | null {
    return this.settings;
  }

  public isLowEndDevice(): boolean {
    return this.capabilities?.isLowEnd || false;
  }

  public shouldUseOptimizedImages(): boolean {
    return this.capabilities?.supportsWebP || false;
  }

  public shouldUseAVIF(): boolean {
    return this.capabilities?.supportsAVIF || false;
  }

  public shouldReduceAnimations(): boolean {
    return this.capabilities?.prefersReducedMotion || this.capabilities?.isLowEnd || false;
  }
}

// Create singleton instance
const performanceDetector = new PerformanceDetector();

export { performanceDetector, type DeviceCapabilities, type PerformanceSettings };
export default performanceDetector;
