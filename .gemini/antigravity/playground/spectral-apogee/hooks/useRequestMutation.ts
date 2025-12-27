'use client';

/**
 * Request Mutation Hook
 * 
 * CRUD operations for maintenance requests.
 * Extracted from useRequests.ts for code organization.
 */

import { useState, useCallback } from 'react';
import type { RequestFormData, RequestStatus } from '@/lib/types';
import * as requestService from '@/services/requestService';

// ============================================
// TYPES
// ============================================

interface UseRequestMutationReturn {
    addRequest: (data: RequestFormData) => Promise<string>;
    updateRequest: (id: string, data: Partial<RequestFormData>) => Promise<void>;
    deleteRequest: (id: string) => Promise<void>;
    updateStatus: (id: string, status: RequestStatus) => Promise<void>;
    loading: boolean;
    error: Error | null;
}

// ============================================
// HOOK
// ============================================

export function useRequestMutation(): UseRequestMutationReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addRequest = useCallback(async (data: RequestFormData): Promise<string> => {
        try {
            setLoading(true);
            setError(null);
            return await requestService.addRequest(data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateRequest = useCallback(async (id: string, data: Partial<RequestFormData>): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await requestService.updateRequest(id, data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteRequest = useCallback(async (id: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await requestService.deleteRequest(id);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateStatus = useCallback(async (id: string, status: RequestStatus): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await requestService.updateRequestStatus(id, status);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { addRequest, updateRequest, deleteRequest, updateStatus, loading, error };
}
