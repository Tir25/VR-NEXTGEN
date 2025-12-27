/**
 * Generic Firestore Utilities
 * 
 * Reusable functions for Firestore operations.
 * Prevents duplicate CRUD logic across services.
 * Gracefully handles cases where Firebase is not configured.
 */

import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    type DocumentData,
    type QueryConstraint,
    type WhereFilterOp,
    type OrderByDirection,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

// Re-export subscription functions for backward compatibility
export { subscribeToCollection, subscribeToDocument } from './firestore-subscriptions';

// ============================================
// TYPES
// ============================================

export interface QueryOptions {
    filters?: Array<{
        field: string;
        operator: WhereFilterOp;
        value: unknown;
    }>;
    orderByField?: string;
    orderDirection?: OrderByDirection;
    limitCount?: number;
}

// ============================================
// HELPERS
// ============================================

function ensureDb() {
    if (!isFirebaseConfigured || !db) {
        throw new Error(
            'Firebase is not configured. Please set up your .env.local file with Firebase credentials.'
        );
    }
    return db;
}

/**
 * Removes undefined values from an object (shallow)
 * Firestore throws an error if undefined is passed.
 */
function stripUndefined(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    // Don't modify Firestore types or Date objects
    if (obj.toDate || obj instanceof Date) return obj;

    if (Array.isArray(obj)) {
        return obj.map(stripUndefined);
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined) {
            acc[key] = stripUndefined(value);
        }
        return acc;
    }, {} as any);
}

// ============================================
// FETCH OPERATIONS
// ============================================

/**
 * Fetch all documents from a collection
 */
export async function fetchCollection<T>(
    collectionName: string,
    options?: QueryOptions
): Promise<T[]> {
    const database = ensureDb();
    const constraints: QueryConstraint[] = [];

    if (options?.filters) {
        for (const filter of options.filters) {
            constraints.push(where(filter.field, filter.operator, filter.value));
        }
    }

    if (options?.orderByField) {
        constraints.push(orderBy(options.orderByField, options.orderDirection || 'asc'));
    }

    if (options?.limitCount) {
        constraints.push(limit(options.limitCount));
    }

    const q = constraints.length > 0
        ? query(collection(database, collectionName), ...constraints)
        : collection(database, collectionName);

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as T[];
}

/**
 * Fetch a single document by ID
 */
export async function fetchDocument<T>(
    collectionName: string,
    documentId: string
): Promise<T | null> {
    const database = ensureDb();
    const docRef = doc(database, collectionName, documentId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data(),
    } as T;
}

// ============================================
// WRITE OPERATIONS
// ============================================

/**
 * Create a new document
 */
export async function createDocument<T extends DocumentData>(
    collectionName: string,
    data: T
): Promise<string> {
    const database = ensureDb();
    const cleanData = stripUndefined(data);
    const docRef = await addDoc(collection(database, collectionName), {
        ...cleanData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

/**
 * Update an existing document
 */
export async function updateDocument<T extends Partial<DocumentData>>(
    collectionName: string,
    documentId: string,
    data: T
): Promise<void> {
    const database = ensureDb();
    const cleanData = stripUndefined(data);
    const docRef = doc(database, collectionName, documentId);
    await updateDoc(docRef, {
        ...cleanData,
        updatedAt: serverTimestamp(),
    });
}

/**
 * Delete a document
 */
export async function deleteDocument(
    collectionName: string,
    documentId: string
): Promise<void> {
    const database = ensureDb();
    const docRef = doc(database, collectionName, documentId);
    await deleteDoc(docRef);
}
