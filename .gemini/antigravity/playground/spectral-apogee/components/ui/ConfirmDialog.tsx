/**
 * ConfirmDialog Component
 * 
 * Delete/action confirmation modal with customizable content.
 */

'use client';

import { type ReactNode } from 'react';
import { AlertTriangle, Trash2, Info } from 'lucide-react';
import { Modal, ModalFooter } from './Modal';
import { Button } from './Button';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

export type ConfirmDialogVariant = 'danger' | 'warning' | 'info';

export interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string | ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ConfirmDialogVariant;
    isLoading?: boolean;
}

// ============================================
// STYLES
// ============================================

const variantConfig: Record<
    ConfirmDialogVariant,
    {
        icon: typeof AlertTriangle;
        iconBg: string;
        iconColor: string;
        confirmVariant: 'destructive' | 'primary';
    }
> = {
    danger: {
        icon: Trash2,
        iconBg: 'bg-red-100 dark:bg-red-900/30',
        iconColor: 'text-red-600 dark:text-red-400',
        confirmVariant: 'destructive',
    },
    warning: {
        icon: AlertTriangle,
        iconBg: 'bg-amber-100 dark:bg-amber-900/30',
        iconColor: 'text-amber-600 dark:text-amber-400',
        confirmVariant: 'primary',
    },
    info: {
        icon: Info,
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        confirmVariant: 'primary',
    },
};

// ============================================
// COMPONENT
// ============================================

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger',
    isLoading = false,
}: ConfirmDialogProps) {
    const config = variantConfig[variant];
    const Icon = config.icon;

    const handleConfirm = async () => {
        await onConfirm();
        if (!isLoading) {
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            showCloseButton={false}
            closeOnOverlayClick={!isLoading}
            closeOnEscape={!isLoading}
        >
            <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div
                    className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center mb-4',
                        config.iconBg
                    )}
                >
                    <Icon className={cn('h-6 w-6', config.iconColor)} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h3>

                {/* Message */}
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {message}
                </div>
            </div>

            <ModalFooter justify="center" className="mt-6">
                <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    {cancelLabel}
                </Button>
                <Button
                    variant={config.confirmVariant}
                    onClick={handleConfirm}
                    isLoading={isLoading}
                >
                    {confirmLabel}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

// ============================================
// PRESET DIALOGS
// ============================================

interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    itemType?: string;
    isLoading?: boolean;
}

export function DeleteDialog({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    itemType = 'item',
    isLoading,
}: DeleteDialogProps) {
    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title={`Delete ${itemType}?`}
            message={
                <>
                    Are you sure you want to delete{' '}
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {itemName}
                    </span>
                    ? This action cannot be undone.
                </>
            }
            confirmLabel="Delete"
            variant="danger"
            isLoading={isLoading}
        />
    );
}

