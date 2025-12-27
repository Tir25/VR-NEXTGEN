/**
 * Spinner Component
 * 
 * Loading indicator with multiple sizes.
 */

import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
    size?: SpinnerSize;
    className?: string;
    label?: string;
}

// ============================================
// STYLES
// ============================================

const sizeStyles: Record<SpinnerSize, string> = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
    xl: 'h-12 w-12 border-4',
};

// ============================================
// COMPONENT
// ============================================

export function Spinner({ size = 'md', className, label = 'Loading...' }: SpinnerProps) {
    return (
        <div role="status" className={cn('inline-flex items-center gap-2', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-blue-600 border-t-transparent',
                    sizeStyles[size]
                )}
                aria-hidden="true"
            />
            <span className="sr-only">{label}</span>
        </div>
    );
}

// ============================================
// FULL PAGE SPINNER
// ============================================

export interface FullPageSpinnerProps {
    message?: string;
}

export function FullPageSpinner({ message = 'Loading...' }: FullPageSpinnerProps) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <Spinner size="xl" />
            {message && (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{message}</p>
            )}
        </div>
    );
}

// ============================================
// INLINE SPINNER
// ============================================

export interface InlineSpinnerProps {
    message?: string;
    className?: string;
}

export function InlineSpinner({ message, className }: InlineSpinnerProps) {
    return (
        <div className={cn('flex items-center justify-center py-8', className)}>
            <div className="flex flex-col items-center gap-3">
                <Spinner size="lg" />
                {message && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
                )}
            </div>
        </div>
    );
}

