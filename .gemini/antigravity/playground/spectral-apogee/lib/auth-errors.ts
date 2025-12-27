/**
 * Auth Error Messages
 * 
 * Maps Firebase Auth error codes to user-friendly messages.
 * Extracted from AuthContext for better code organization.
 */

// ============================================
// ERROR MESSAGES
// ============================================

const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'Invalid email address format.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
};

/**
 * Get user-friendly error message from Firebase error code
 */
export function getAuthErrorMessage(code: string): string {
    return errorMessages[code] || 'An error occurred. Please try again.';
}
