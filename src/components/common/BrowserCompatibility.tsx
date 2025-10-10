/**
 * Browser Compatibility Component
 * Provides feature detection and graceful fallbacks for unsupported browsers
 */

import React, { ReactNode, useEffect, useState } from 'react';

export interface BrowserCompatibilityProps {
  children: ReactNode;
  fallback?: ReactNode;
  requiredFeatures?: BrowserFeature[];
  onUnsupported?: (missingFeatures: BrowserFeature[]) => void;
  className?: string;
}

export type BrowserFeature =
  | 'intersection-observer'
  | 'css-transforms'
  | 'css-animations'
  | 'local-storage'
  | 'session-storage'
  | 'webgl'
  | 'canvas'
  | 'fetch'
  | 'promises'
  | 'es6-classes'
  | 'custom-properties';

interface FeatureCheck {
  feature: BrowserFeature;
  supported: boolean;
  check: () => boolean;
}

const featureChecks: FeatureCheck[] = [
  {
    feature: 'intersection-observer',
    supported: false,
    check: () => 'IntersectionObserver' in window,
  },
  {
    feature: 'css-transforms',
    supported: false,
    check: () => {
      const testEl = document.createElement('div');
      const style = testEl.style;
      return !!(style.transform !== undefined || style.webkitTransform !== undefined);
    },
  },
  {
    feature: 'css-animations',
    supported: false,
    check: () => {
      const testEl = document.createElement('div');
      const style = testEl.style;
      return !!(style.animation !== undefined || style.webkitAnimation !== undefined);
    },
  },
  {
    feature: 'local-storage',
    supported: false,
    check: () => {
      try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch {
        return false;
      }
    },
  },
  {
    feature: 'session-storage',
    supported: false,
    check: () => {
      try {
        const test = '__sessionStorage_test__';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
      } catch {
        return false;
      }
    },
  },
  {
    feature: 'webgl',
    supported: false,
    check: () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch {
        return false;
      }
    },
  },
  {
    feature: 'canvas',
    supported: false,
    check: () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
      } catch {
        return false;
      }
    },
  },
  {
    feature: 'fetch',
    supported: false,
    check: () => 'fetch' in window,
  },
  {
    feature: 'promises',
    supported: false,
    check: () => 'Promise' in window,
  },
  {
    feature: 'es6-classes',
    supported: false,
    check: () => {
      try {
        // Test ES6 class support without eval
        return typeof class {} === 'function';
      } catch {
        return false;
      }
    },
  },
  {
    feature: 'custom-properties',
    supported: false,
    check: () => {
      try {
        const testEl = document.createElement('div');
        testEl.style.setProperty('--test-var', 'test');
        return testEl.style.getPropertyValue('--test-var') === 'test';
      } catch {
        return false;
      }
    },
  },
];

export default function BrowserCompatibility({
  children,
  fallback,
  requiredFeatures = ['intersection-observer', 'css-transforms', 'css-animations'],
  onUnsupported,
  className = '',
}: BrowserCompatibilityProps) {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [missingFeatures, setMissingFeatures] = useState<BrowserFeature[]>([]);

  useEffect(() => {
    const checkFeatures = () => {
      const unsupportedFeatures: BrowserFeature[] = [];

      requiredFeatures.forEach(requiredFeature => {
        const featureCheck = featureChecks.find(check => check.feature === requiredFeature);
        if (featureCheck && !featureCheck.check()) {
          unsupportedFeatures.push(requiredFeature);
        }
      });

      setMissingFeatures(unsupportedFeatures);
      const supported = unsupportedFeatures.length === 0;
      setIsSupported(supported);

      if (!supported && onUnsupported) {
        onUnsupported(unsupportedFeatures);
      }
    };

    // Run check after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkFeatures, 100);

    return () => clearTimeout(timeoutId);
  }, [requiredFeatures, onUnsupported]);

  // Show loading state while checking
  if (isSupported === null) {
    return <div className={`browser-compatibility-checking ${className}`}>{children}</div>;
  }

  // Show fallback if features are not supported
  if (!isSupported) {
    if (fallback) {
      return <div className={className}>{fallback}</div>;
    }

    return (
      <div className={`browser-compatibility-fallback ${className}`}>
        <div className='text-center p-6 bg-yellow-50 border border-yellow-200 rounded-lg'>
          <div className='text-yellow-600 mb-4'>
            <svg
              className='w-12 h-12 mx-auto mb-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
            <h3 className='text-lg font-semibold'>Browser Compatibility</h3>
            <p className='text-sm text-yellow-700 mt-2'>
              Some features may not work properly in your current browser. Consider updating to a
              modern browser for the best experience.
            </p>
            <p className='text-xs text-yellow-600 mt-2'>
              Missing features: {missingFeatures.join(', ')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}

// Convenience components for specific feature requirements
export const IntersectionObserverCompatible = (
  props: Omit<BrowserCompatibilityProps, 'requiredFeatures'>
) => <BrowserCompatibility {...props} requiredFeatures={['intersection-observer']} />;

export const AnimationCompatible = (props: Omit<BrowserCompatibilityProps, 'requiredFeatures'>) => (
  <BrowserCompatibility {...props} requiredFeatures={['css-transforms', 'css-animations']} />
);

export const StorageCompatible = (props: Omit<BrowserCompatibilityProps, 'requiredFeatures'>) => (
  <BrowserCompatibility {...props} requiredFeatures={['local-storage', 'session-storage']} />
);

export const ModernBrowserCompatible = (
  props: Omit<BrowserCompatibilityProps, 'requiredFeatures'>
) => (
  <BrowserCompatibility
    {...props}
    requiredFeatures={[
      'intersection-observer',
      'css-transforms',
      'css-animations',
      'fetch',
      'promises',
    ]}
  />
);
