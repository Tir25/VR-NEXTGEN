'use client';

/**
 * useAuth Hook
 * 
 * Provides access to authentication state and methods.
 * Wrapper around AuthContext for clean imports.
 */

import { useAuthContext } from '@/contexts/AuthContext';

export function useAuth() {
    return useAuthContext();
}
