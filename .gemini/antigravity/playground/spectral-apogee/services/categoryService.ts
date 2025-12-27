/**
 * Category Service
 * 
 * Firestore operations for equipment categories collection.
 */

import {
    fetchCollection,
    fetchDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    subscribeToCollection,
    type QueryOptions,
} from '@/lib/firestore-utils';
import { COLLECTIONS } from '@/lib/constants';
import type { EquipmentCategory, EquipmentCategoryFormData } from '@/lib/types';
import type { Unsubscribe } from 'firebase/firestore';



// ============================================
// FETCH OPERATIONS
// ============================================

/**
 * Get all categories
 */
export async function getCategories(options?: QueryOptions): Promise<EquipmentCategory[]> {
    return fetchCollection<EquipmentCategory>(COLLECTIONS.CATEGORIES, {
        orderByField: 'name',
        orderDirection: 'asc',
        ...options,
    });
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: string): Promise<EquipmentCategory | null> {
    return fetchDocument<EquipmentCategory>(COLLECTIONS.CATEGORIES, id);
}

// ============================================
// WRITE OPERATIONS
// ============================================

/**
 * Create new category
 */
export async function addCategory(data: EquipmentCategoryFormData): Promise<string> {
    return createDocument(COLLECTIONS.CATEGORIES, data);
}

/**
 * Update category
 */
export async function updateCategory(id: string, data: Partial<EquipmentCategoryFormData>): Promise<void> {
    return updateDocument(COLLECTIONS.CATEGORIES, id, data);
}

/**
 * Delete category
 */
export async function deleteCategory(id: string): Promise<void> {
    return deleteDocument(COLLECTIONS.CATEGORIES, id);
}

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

/**
 * Subscribe to all categories changes
 */
export function subscribeToCategories(
    callback: (categories: EquipmentCategory[]) => void,
    options?: QueryOptions
): Unsubscribe {
    return subscribeToCollection<EquipmentCategory>(COLLECTIONS.CATEGORIES, callback, {
        orderByField: 'name',
        orderDirection: 'asc',
        ...options,
    });
}

