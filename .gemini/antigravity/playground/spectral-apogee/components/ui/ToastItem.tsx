/**
 * ToastItem Component
 * 
 * Individual toast notification display.
 * Extracted from Toast.tsx for code organization.
 */

import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Toast, ToastVariant } from './Toast';

// ============================================
// STYLES
// ============================================

const icons: Record<ToastVariant, typeof CheckCircle> = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
};

const styles: Record<ToastVariant, { bg: string; icon: string; border: string }> = {
    success: {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        icon: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800',
    },
    error: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        icon: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
    },
    warning: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        icon: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
    },
    info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        icon: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
    },
};

// ============================================
// COMPONENT
// ============================================

export interface ToastItemProps {
    toast: Toast;
    onClose: () => void;
}

export function ToastItem({ toast, onClose }: ToastItemProps) {
    const Icon = icons[toast.variant];
    const style = styles[toast.variant];

    return (
        <div
            className={cn(
                'flex items-start gap-3 p-4 rounded-lg border shadow-lg',
                style.bg,
                style.border
            )}
            role="alert"
        >
            <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', style.icon)} />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {toast.title}
                </p>
                {toast.description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {toast.description}
                    </p>
                )}
            </div>
            <button
                onClick={onClose}
                className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Close notification"
            >
                <X className="h-4 w-4 text-gray-500" />
            </button>
        </div>
    );
}
