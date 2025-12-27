/**
 * Skeleton Component
 * 
 * Loading placeholder with shimmer animation.
 */

import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

export interface SkeletonProps {
    className?: string;
    variant?: 'rectangular' | 'circular' | 'text';
    width?: string | number;
    height?: string | number;
    lines?: number;
}

// ============================================
// BASE SKELETON
// ============================================

export function Skeleton({
    className,
    variant = 'rectangular',
    width,
    height,
}: SkeletonProps) {
    const variantStyles = {
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
        text: 'rounded h-4',
    };

    return (
        <div
            className={cn(
                'animate-pulse bg-gray-200 dark:bg-gray-700',
                variantStyles[variant],
                className
            )}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
            aria-hidden="true"
        />
    );
}

// ============================================
// SKELETON TEXT
// ============================================

export interface SkeletonTextProps {
    lines?: number;
    className?: string;
    lastLineWidth?: string;
}

export function SkeletonText({
    lines = 3,
    className,
    lastLineWidth = '75%',
}: SkeletonTextProps) {
    return (
        <div className={cn('space-y-2', className)} aria-hidden="true">
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="text"
                    className={cn(
                        'h-4',
                        index === lines - 1 && lastLineWidth && `w-[${lastLineWidth}]`
                    )}
                    width={index === lines - 1 ? lastLineWidth : '100%'}
                />
            ))}
        </div>
    );
}

// ============================================
// SKELETON CARD
// ============================================

export interface SkeletonCardProps {
    className?: string;
    showImage?: boolean;
    showFooter?: boolean;
}

export function SkeletonCard({
    className,
    showImage = false,
    showFooter = true,
}: SkeletonCardProps) {
    return (
        <div
            className={cn(
                'rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden',
                className
            )}
            aria-hidden="true"
        >
            {showImage && <Skeleton className="w-full h-40 rounded-none" />}
            <div className="p-5 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
                {showFooter && (
                    <div className="flex items-center justify-between pt-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// SKELETON TABLE ROW
// ============================================

export interface SkeletonTableProps {
    rows?: number;
    columns?: number;
    className?: string;
}

export function SkeletonTable({
    rows = 5,
    columns = 4,
    className,
}: SkeletonTableProps) {
    return (
        <div className={cn('space-y-3', className)} aria-hidden="true">
            {/* Header */}
            <div className="flex gap-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 py-2">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <Skeleton
                            key={colIndex}
                            className="h-4 flex-1"
                            width={colIndex === 0 ? '80%' : undefined}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

// ============================================
// SKELETON AVATAR
// ============================================

export interface SkeletonAvatarProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function SkeletonAvatar({ size = 'md', className }: SkeletonAvatarProps) {
    const sizeStyles = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
    };

    return (
        <Skeleton
            variant="circular"
            className={cn(sizeStyles[size], className)}
        />
    );
}

