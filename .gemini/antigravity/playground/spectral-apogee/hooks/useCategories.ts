'use client';

/**
 * Categories Hooks
 * 
 * Custom hooks for equipment category data.
 */

import { useState, useEffect, useCallback } from 'react';
import type { EquipmentCategory, EquipmentCategoryFormData } from '@/lib/types';
import * as categoryService from '@/services/categoryService';

// ============================================
// useCategories - Fetch all categories
// ============================================

interface UseCategoriesOptions {
    realtime?: boolean;
}

interface UseCategoriesReturn {
    categories: EquipmentCategory[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useCategories(options: UseCategoriesOptions = {}): UseCategoriesReturn {
    const { realtime = false } = options;
    const [categories, setCategories] = useState<EquipmentCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await categoryService.getCategories();
            setCategories(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (realtime) {
            const unsubscribe = categoryService.subscribeToCategories((data) => {
                setCategories(data);
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
            fetchData();
        }
    }, [realtime, fetchData]);

    return { categories, loading, error, refetch: fetchData };
}

// ============================================
// useCategoryMutation - CRUD operations
// ============================================

interface UseCategoryMutationReturn {
    addCategory: (data: EquipmentCategoryFormData) => Promise<string>;
    updateCategory: (id: string, data: Partial<EquipmentCategoryFormData>) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    loading: boolean;
    error: Error | null;
}

export function useCategoryMutation(): UseCategoryMutationReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addCategory = useCallback(async (data: EquipmentCategoryFormData): Promise<string> => {
        try {
            setLoading(true);
            setError(null);
            return await categoryService.addCategory(data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateCategory = useCallback(async (id: string, data: Partial<EquipmentCategoryFormData>): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await categoryService.updateCategory(id, data);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteCategory = useCallback(async (id: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await categoryService.deleteCategory(id);
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { addCategory, updateCategory, deleteCategory, loading, error };
}

