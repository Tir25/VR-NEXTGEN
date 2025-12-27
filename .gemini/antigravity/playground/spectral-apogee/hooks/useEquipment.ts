'use client';

/**
 * Equipment Hooks
 * 
 * Custom hooks for equipment data with loading/error states.
 */

import { useState, useEffect, useCallback } from 'react';
import type { Equipment, EquipmentFormData, EquipmentStatus } from '@/lib/types';
import * as equipmentService from '@/services/equipmentService';

// ============================================
// useEquipment - Fetch all equipment
// ============================================

interface UseEquipmentOptions {
    realtime?: boolean;
}

interface UseEquipmentReturn {
    equipment: Equipment[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useEquipment(options: UseEquipmentOptions = {}): UseEquipmentReturn {
    const { realtime = false } = options;
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await equipmentService.getEquipment();
            setEquipment(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (realtime) {
            const unsubscribe = equipmentService.subscribeToEquipment((data) => {
                setEquipment(data);
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
            fetchData();
        }
    }, [realtime, fetchData]);

    return { equipment, loading, error, refetch: fetchData };
}

// ============================================
// useEquipmentById - Fetch single equipment
// ============================================

interface UseEquipmentByIdReturn {
    equipment: Equipment | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useEquipmentById(id: string | null): UseEquipmentByIdReturn {
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!id) {
            setEquipment(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await equipmentService.getEquipmentById(id);
            setEquipment(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { equipment, loading, error, refetch: fetchData };
}

// ============================================
// useEquipmentByStatus - Fetch equipment by status
// ============================================

export function useEquipmentByStatus(status: EquipmentStatus): UseEquipmentReturn {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await equipmentService.getEquipmentByStatus(status);
            setEquipment(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [status]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { equipment, loading, error, refetch: fetchData };
}

// ============================================
// useEquipmentMutation - CRUD operations
// ============================================

interface UseEquipmentMutationReturn {
    addEquipment: (data: EquipmentFormData) => Promise<string>;
    updateEquipment: (id: string, data: Partial<EquipmentFormData>) => Promise<void>;
    deleteEquipment: (id: string) => Promise<void>;
    loading: boolean;
    error: Error | null;
}

export function useEquipmentMutation(): UseEquipmentMutationReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addEquipment = useCallback(async (data: EquipmentFormData): Promise<string> => {
        try {
            setLoading(true);
            setError(null);
            return await equipmentService.addEquipment(data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateEquipment = useCallback(async (id: string, data: Partial<EquipmentFormData>): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await equipmentService.updateEquipment(id, data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteEquipment = useCallback(async (id: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await equipmentService.deleteEquipment(id);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { addEquipment, updateEquipment, deleteEquipment, loading, error };
}

