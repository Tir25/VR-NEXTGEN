'use client';

/**
 * Work Centers Hooks
 * 
 * Custom hooks for work center data.
 */

import { useState, useEffect, useCallback } from 'react';
import type { WorkCenter, WorkCenterFormData } from '@/lib/types';
import * as workCenterService from '@/services/workCenterService';

// ============================================
// useWorkCenters - Fetch all work centers
// ============================================

interface UseWorkCentersOptions {
    realtime?: boolean;
}

interface UseWorkCentersReturn {
    workCenters: WorkCenter[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useWorkCenters(options: UseWorkCentersOptions = {}): UseWorkCentersReturn {
    const { realtime = false } = options;
    const [workCenters, setWorkCenters] = useState<WorkCenter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await workCenterService.getWorkCenters();
            setWorkCenters(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (realtime) {
            const unsubscribe = workCenterService.subscribeToWorkCenters((data) => {
                setWorkCenters(data);
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
            fetchData();
        }
    }, [realtime, fetchData]);

    return { workCenters, loading, error, refetch: fetchData };
}

// ============================================
// useWorkCenterMutation - CRUD operations
// ============================================

interface UseWorkCenterMutationReturn {
    addWorkCenter: (data: WorkCenterFormData) => Promise<string>;
    updateWorkCenter: (id: string, data: Partial<WorkCenterFormData>) => Promise<void>;
    deleteWorkCenter: (id: string) => Promise<void>;
    loading: boolean;
    error: Error | null;
}

export function useWorkCenterMutation(): UseWorkCenterMutationReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addWorkCenter = useCallback(async (data: WorkCenterFormData): Promise<string> => {
        try {
            setLoading(true);
            setError(null);
            return await workCenterService.addWorkCenter(data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateWorkCenter = useCallback(async (id: string, data: Partial<WorkCenterFormData>): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await workCenterService.updateWorkCenter(id, data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteWorkCenter = useCallback(async (id: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await workCenterService.deleteWorkCenter(id);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { addWorkCenter, updateWorkCenter, deleteWorkCenter, loading, error };
}

