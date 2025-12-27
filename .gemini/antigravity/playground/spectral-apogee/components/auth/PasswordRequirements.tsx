/**
 * Password Requirements Component
 * 
 * Visual checklist showing password strength requirements.
 * Extracted from SignupForm for code organization.
 */

import { Check, X } from 'lucide-react';
import { passwordRegex } from '@/lib/validations';

// ============================================
// PASSWORD REQUIREMENTS
// ============================================

export const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', regex: /.{8,}/ },
    { id: 'lowercase', label: 'One lowercase letter', regex: passwordRegex.lowercase },
    { id: 'uppercase', label: 'One uppercase letter', regex: passwordRegex.uppercase },
    { id: 'special', label: 'One special character', regex: passwordRegex.special },
];

// ============================================
// COMPONENT
// ============================================

interface PasswordRequirementsProps {
    password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
    if (!password) return null;

    return (
        <div className="mt-3 space-y-1.5">
            {passwordRequirements.map((req) => {
                const isMet = req.regex.test(password);
                return (
                    <div
                        key={req.id}
                        className={`flex items-center gap-2 text-xs ${isMet ? 'text-green-600' : 'text-gray-400'
                            }`}
                    >
                        {isMet ? (
                            <Check className="w-3.5 h-3.5" />
                        ) : (
                            <X className="w-3.5 h-3.5" />
                        )}
                        <span>{req.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
