/**
 * FormInput Component
 * 
 * Reusable form input with icon, error state, and password toggle.
 * Extracted from LoginForm and SignupForm to prevent duplication.
 */

'use client';

import { useState, forwardRef, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';

// ============================================
// TYPES
// ============================================

export interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
    icon: LucideIcon;
    type?: 'text' | 'email' | 'password';
    error?: string;
}

// ============================================
// COMPONENT
// ============================================

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, icon: Icon, type = 'text', error, id, className, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const inputType = isPassword && showPassword ? 'text' : type;

        return (
            <div>
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                    {label}
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        ref={ref}
                        type={inputType}
                        id={id}
                        className={`
                            block w-full pl-10 ${isPassword ? 'pr-10' : 'pr-3'} py-2.5 rounded-lg border
                            text-gray-900 dark:text-white
                            bg-white dark:bg-gray-900
                            placeholder:text-gray-400
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                            transition-colors
                            ${error
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-gray-300 dark:border-gray-600'
                            }
                            ${className || ''}
                        `}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    )}
                </div>
                {error && (
                    <p className="mt-1.5 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';
