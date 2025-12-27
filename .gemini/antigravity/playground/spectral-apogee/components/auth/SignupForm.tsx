'use client';

/**
 * Signup Form Component
 * 
 * User registration with enhanced password validation.
 * Password requirements: 8+ chars, uppercase, lowercase, special char.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { signupSchema, type SignupFormData } from '@/lib/validations';
import { Button } from '@/components/ui';
import { PasswordRequirements } from './PasswordRequirements';

export function SignupForm() {
    const router = useRouter();
    const { register: registerUser, loading, error, clearError } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const password = watch('password', '');

    const onSubmit = async (data: SignupFormData) => {
        clearError();
        try {
            await registerUser(data.email, data.password, data.name);
            router.push('/');
        } catch {
            // Error is handled by AuthContext
        }
    };

    const inputStyles = (hasError: boolean) => `
        block w-full pl-10 pr-10 py-2.5 rounded-lg border
        text-gray-900 dark:text-white
        bg-white dark:bg-gray-900
        placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
        transition-colors
        ${hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-gray-300 dark:border-gray-600'
        }
    `;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create an account
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Join GearGuard to manage your maintenance
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input {...register('name')} type="text" id="name" autoComplete="name"
                            className={inputStyles(!!errors.name)} placeholder="John Doe" />
                    </div>
                    {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input {...register('email')} type="email" id="email" autoComplete="email"
                            className={inputStyles(!!errors.email)} placeholder="you@example.com" />
                    </div>
                    {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input {...register('password')} type={showPassword ? 'text' : 'password'} id="password"
                            autoComplete="new-password" className={inputStyles(!!errors.password)} placeholder="••••••••" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
                        </button>
                    </div>
                    {errors.password && <p className="mt-1.5 text-sm text-red-500">{errors.password.message}</p>}
                    <PasswordRequirements password={password} />
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input {...register('confirmPassword')} type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword" autoComplete="new-password" className={inputStyles(!!errors.confirmPassword)}
                            placeholder="••••••••" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-500">{errors.confirmPassword.message}</p>}
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full">
                    Create Account
                </Button>
            </form>

            {/* Sign In Link */}
            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
