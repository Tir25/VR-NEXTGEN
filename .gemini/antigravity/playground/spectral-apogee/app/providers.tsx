'use client';

/**
 * App Providers
 * 
 * Wraps the application with all necessary context providers.
 */

import type { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
    );
}

