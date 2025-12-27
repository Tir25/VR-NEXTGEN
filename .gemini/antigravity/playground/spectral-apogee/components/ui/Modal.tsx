/**
 * Modal Component
 * 
 * Accessible dialog with portal rendering and keyboard navigation.
 */

'use client';

import {
    type ReactNode,
    type HTMLAttributes,
    useEffect,
    useCallback,
    forwardRef,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

// ============================================
// TYPES
// ============================================

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    size?: ModalSize;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    children: ReactNode;
}

// ============================================
// STYLES
// ============================================

const sizeStyles: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
};

// ============================================
// COMPONENT
// ============================================

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    children,
}: ModalProps) {
    // Handle escape key
    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (closeOnEscape && e.key === 'Escape') {
                onClose();
            }
        },
        [closeOnEscape, onClose]
    );

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, handleEscape]);

    // Don't render on server
    if (typeof window === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? 'modal-title' : undefined}
                    aria-describedby={description ? 'modal-description' : undefined}
                >
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeOnOverlayClick ? onClose : undefined}
                        aria-hidden="true"
                    />

                    {/* Modal content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={cn(
                            'relative w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl',
                            'max-h-[90vh] overflow-hidden flex flex-col',
                            sizeStyles[size]
                        )}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div className="flex items-start justify-between gap-4 p-5 border-b border-gray-100 dark:border-gray-800">
                                <div>
                                    {title && (
                                        <h2
                                            id="modal-title"
                                            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                                        >
                                            {title}
                                        </h2>
                                    )}
                                    {description && (
                                        <p
                                            id="modal-description"
                                            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            {description}
                                        </p>
                                    )}
                                </div>
                                {showCloseButton && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={onClose}
                                        className="flex-shrink-0 -mr-2 -mt-1"
                                        aria-label="Close modal"
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-5">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

// ============================================
// MODAL FOOTER (for consistent action buttons)
// ============================================

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
    justify?: 'start' | 'end' | 'between' | 'center';
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
    ({ className, justify = 'end', ...props }, ref) => {
        const justifyStyles = {
            start: 'justify-start',
            end: 'justify-end',
            between: 'justify-between',
            center: 'justify-center',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-gray-800 -mx-5 -mb-5 px-5 pb-5 mt-5',
                    justifyStyles[justify],
                    className
                )}
                {...props}
            />
        );
    }
);

ModalFooter.displayName = 'ModalFooter';

