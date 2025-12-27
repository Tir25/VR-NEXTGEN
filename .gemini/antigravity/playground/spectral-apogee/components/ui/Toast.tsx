/**
 * Toast Component
 * 
 * Notification system with success/error/warning/info variants.
 * Uses a context-based approach for triggering toasts from anywhere.
 */

'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    type ReactNode,
} from 'react';
import { ToastItem } from './ToastItem';

// ============================================
// TYPES
// ============================================

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    variant: ToastVariant;
    title: string;
    description?: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    toast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
}

// ============================================
// CONTEXT
// ============================================

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

// ============================================
// PROVIDER
// ============================================

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: Toast = { ...toast, id };
        setToasts((prev) => [...prev, newToast]);

        // Auto remove after duration
        const duration = toast.duration ?? 5000;
        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = useCallback(
        (title: string, description?: string) => addToast({ variant: 'success', title, description }),
        [addToast]
    );

    const error = useCallback(
        (title: string, description?: string) => addToast({ variant: 'error', title, description }),
        [addToast]
    );

    const warning = useCallback(
        (title: string, description?: string) => addToast({ variant: 'warning', title, description }),
        [addToast]
    );

    const info = useCallback(
        (title: string, description?: string) => addToast({ variant: 'info', title, description }),
        [addToast]
    );

    return (
        <ToastContext.Provider
            value={{
                toasts,
                addToast,
                toast: addToast,
                removeToast,
                success,
                error,
                warning,
                info
            }}
        >
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

// ============================================
// TOAST CONTAINER
// ============================================

interface ToastContainerProps {
    toasts: Toast[];
    removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
                </div>
            ))}
        </div>
    );
}
