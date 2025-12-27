'use client';

/**
 * Requests Hooks
 * 
 * Custom hooks for maintenance request data with loading/error states.
 */

import { useState, useEffect, useCallback } from 'react';
import type { MaintenanceRequest } from '@/lib/types';
import * as requestService from '@/services/requestService';

// Re-export mutation hook for convenience
export { useRequestMutation } from './useRequestMutation';

// ============================================
// useRequests - Fetch all requests
// ============================================

interface UseRequestsOptions {
    realtime?: boolean;
}

interface UseRequestsReturn {
    requests: MaintenanceRequest[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useRequests(options: UseRequestsOptions = {}): UseRequestsReturn {
    const { realtime = false } = options;
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await requestService.getRequests();
            setRequests(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (realtime) {
            const unsubscribe = requestService.subscribeToRequests((data) => {
                setRequests(data);
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
            fetchData();
        }
    }, [realtime, fetchData]);

    return { requests, loading, error, refetch: fetchData };
}

// ============================================
// useRequestById - Fetch single request
// ============================================

interface UseRequestByIdReturn {
    request: MaintenanceRequest | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useRequestById(id: string | null): UseRequestByIdReturn {
    const [request, setRequest] = useState<MaintenanceRequest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!id) {
            setRequest(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await requestService.getRequestById(id);
            setRequest(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { request, loading, error, refetch: fetchData };
}

// ============================================
// useRequestsByEquipment - Fetch requests for equipment
// ============================================

export function useRequestsByEquipment(equipmentId: string | null): UseRequestsReturn {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!equipmentId) {
            setRequests([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await requestService.getRequestsByEquipment(equipmentId);
            setRequests(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [equipmentId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { requests, loading, error, refetch: fetchData };
}

// ============================================
// useRequestsByStatus - Group requests by status
// ============================================

interface RequestsByStatus {
    new: MaintenanceRequest[];
    in_progress: MaintenanceRequest[];
    repaired: MaintenanceRequest[];
    scrap: MaintenanceRequest[];
}

interface UseRequestsByStatusReturn {
    requestsByStatus: RequestsByStatus;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useRequestsByStatus(options: UseRequestsOptions = {}): UseRequestsByStatusReturn {
    const { realtime = false } = options;
    const [requestsByStatus, setRequestsByStatus] = useState<RequestsByStatus>({
        new: [],
        in_progress: [],
        repaired: [],
        scrap: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const groupByStatus = (requests: MaintenanceRequest[]): RequestsByStatus => ({
        new: requests.filter((r) => r.status === 'new'),
        in_progress: requests.filter((r) => r.status === 'in_progress'),
        repaired: requests.filter((r) => r.status === 'repaired'),
        scrap: requests.filter((r) => r.status === 'scrap'),
    });

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await requestService.getRequests();
            setRequestsByStatus(groupByStatus(data));
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (realtime) {
            const unsubscribe = requestService.subscribeToRequests((data) => {
                setRequestsByStatus(groupByStatus(data));
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
            fetchData();
        }
    }, [realtime, fetchData]);

    return { requestsByStatus, loading, error, refetch: fetchData };
}
