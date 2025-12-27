'use client';

import { useState, useCallback, useEffect } from 'react';
import { MaintenanceRequest } from '@/lib/types';
import * as requestService from '@/services/requestService';

interface UseRequestsByEquipmentReturn {
    requests: MaintenanceRequest[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useRequestsByEquipment(equipmentId: string): UseRequestsByEquipmentReturn {
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
            console.error(err);
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
