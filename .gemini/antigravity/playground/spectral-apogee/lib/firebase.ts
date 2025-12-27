/**
 * Firebase Client Configuration
 * 
 * Initializes Firebase app, Firestore, and Auth instances.
 * Uses environment variables from .env.local
 * Gracefully handles missing credentials for development.
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// ============================================
// CONFIGURATION
// ============================================

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Check if Firebase is properly configured
const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
);



// ============================================
// INITIALIZATION
// ============================================

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

// Only initialize if properly configured
if (isFirebaseConfigured) {
    try {
        // Prevent multiple instances during hot reload
        if (!getApps().length) {
            app = initializeApp(firebaseConfig);
        } else {
            app = getApps()[0];
        }

        db = getFirestore(app);
        auth = getAuth(app);
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
} else if (typeof window !== 'undefined') {
    // Only warn in browser, not during SSR build
    console.warn(
        '⚠️ Firebase not configured. Please set up your .env.local file with Firebase credentials.\n' +
        'See .env.local.example for required variables.'
    );
}

// ============================================
// EXPORTS
// ============================================

export { app, db, auth, isFirebaseConfigured };

// Helper to check if Firebase is ready
export function ensureFirebaseInitialized(): { db: Firestore; auth: Auth } {
    if (!db || !auth) {
        throw new Error(
            'Firebase is not initialized. Please configure your .env.local file with valid Firebase credentials.'
        );
    }
    return { db, auth };
}
