/**
 * Firestore Real-time Subscriptions
 * 
 * Functions for subscribing to Firestore data changes.
 * Extracted from firestore-utils.ts for code organization.
 */

import {
    collection,
    doc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    type QueryConstraint,
    type Unsubscribe,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import type { QueryOptions } from './firestore-utils';

// ============================================
// HELPER
// ============================================

function ensureDb() {
    if (!isFirebaseConfigured || !db) {
        throw new Error(
            'Firebase is not configured. Please set up your .env.local file with Firebase credentials.'
        );
    }
    return db;
}

// ============================================
// SUBSCRIPTION FUNCTIONS
// ============================================

/**
 * Subscribe to collection changes
 */
export function subscribeToCollection<T>(
    collectionName: string,
    callback: (data: T[]) => void,
    options?: QueryOptions
): Unsubscribe {
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

    return onSnapshot(
        q,
        (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as T[];
            callback(data);
        },
        (error) => {
            console.error(`[Firestore] Subscription error for ${collectionName}:`, error);
        }
    );
}

/**
 * Subscribe to a single document
 */
export function subscribeToDocument<T>(
    collectionName: string,
    documentId: string,
    callback: (data: T | null) => void
): Unsubscribe {
    const database = ensureDb();
    const docRef = doc(database, collectionName, documentId);

    return onSnapshot(
        docRef,
        (snapshot) => {
            if (!snapshot.exists()) {
                callback(null);
                return;
            }

            callback({
                id: snapshot.id,
                ...snapshot.data(),
            } as T);
        },
        (error) => {
            console.error(`[Firestore] Document subscription error for ${collectionName}/${documentId}:`, error);
        }
    );
}
