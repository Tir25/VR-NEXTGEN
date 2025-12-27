'use client';

/**
 * Authentication Context
 * 
 * Provides Firebase Auth state management across the application.
 * Handles login, logout, and registration functionality.
 * Gracefully handles cases where Firebase is not configured.
 */

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    type User as FirebaseUser,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { getAuthErrorMessage } from '@/lib/auth-errors';
import type { User } from '@/lib/types';

// ============================================
// TYPES
// ============================================

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isConfigured: boolean;
}

interface AuthContextValue extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, displayName: string) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

// ============================================
// CONTEXT
// ============================================

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ============================================
// HELPERS
// ============================================

function mapFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || undefined,
        photoURL: firebaseUser.photoURL || undefined,
    };
}

// ============================================
// PROVIDER
// ============================================

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [state, setState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null,
        isConfigured: isFirebaseConfigured,
    });

    // Listen for auth state changes
    useEffect(() => {

        // If Firebase is not configured, stop loading and show appropriate state
        if (!isFirebaseConfigured || !auth) {
            setState({
                user: null,
                loading: false,
                error: null,
                isConfigured: false,
            });
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setState({
                    user: mapFirebaseUser(firebaseUser),
                    loading: false,
                    error: null,
                    isConfigured: true,
                });
            } else {
                setState({
                    user: null,
                    loading: false,
                    error: null,
                    isConfigured: true,
                });
            }
        });

        return () => unsubscribe();
    }, []);

    // Login with email and password
    const login = useCallback(async (email: string, password: string) => {
        if (!auth) {
            setState((prev) => ({
                ...prev,
                error: 'Firebase is not configured. Please set up your .env.local file.',
            }));
            return;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            const error = err as { code?: string };
            setState((prev) => ({
                ...prev,
                loading: false,
                error: getAuthErrorMessage(error.code || ''),
            }));
            throw err;
        }
    }, []);

    // Register new user
    const register = useCallback(async (email: string, password: string, displayName: string) => {
        if (!auth) {
            setState((prev) => ({
                ...prev,
                error: 'Firebase is not configured. Please set up your .env.local file.',
            }));
            return;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(firebaseUser, { displayName });
            setState((prev) => ({
                ...prev,
                user: mapFirebaseUser(firebaseUser),
                loading: false,
            }));
        } catch (err) {
            const error = err as { code?: string };
            setState((prev) => ({
                ...prev,
                loading: false,
                error: getAuthErrorMessage(error.code || ''),
            }));
            throw err;
        }
    }, []);

    // Logout
    const logout = useCallback(async () => {
        if (!auth) {
            return;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            await signOut(auth);
        } catch (err) {
            const error = err as { code?: string };
            setState((prev) => ({
                ...prev,
                loading: false,
                error: getAuthErrorMessage(error.code || ''),
            }));
            throw err;
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setState((prev) => ({ ...prev, error: null }));
    }, []);

    const value: AuthContextValue = {
        ...state,
        login,
        register,
        logout,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// HOOK
// ============================================

export function useAuthContext(): AuthContextValue {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
