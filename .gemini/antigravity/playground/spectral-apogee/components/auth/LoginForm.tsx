'use client';

/**
 * Login Form Component
 * 
 * Email/password login with validation and error handling.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { Button, Input } from '@/components/ui';

export function LoginForm() {
    const router = useRouter();
    const { login, loading, error, clearError } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        clearError();
        try {
            await login(data.email, data.password);
            router.push('/');
        } catch (err) {
            // Error is handled by AuthContext
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome back
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Sign in to your account to continue
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            {...register('email')}
                            type="email"
                            id="email"
                            autoComplete="email"
                            className={`
                                block w-full pl-10 pr-3 py-2.5 rounded-lg border
                                text-gray-900 dark:text-white
                                bg-white dark:bg-gray-900
                                placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                transition-colors
                                ${errors.email
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-gray-300 dark:border-gray-600'
                                }
                            `}
                            placeholder="you@example.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            className={`
                                block w-full pl-10 pr-10 py-2.5 rounded-lg border
                                text-gray-900 dark:text-white
                                bg-white dark:bg-gray-900
                                placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                                transition-colors
                                ${errors.password
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-gray-300 dark:border-gray-600'
                                }
                            `}
                            placeholder="••••••••"
                        />
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
                    </div>
                    {errors.password && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            {...register('rememberMe')}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={loading}
                    className="w-full"
                >
                    Sign In
                </Button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link
                    href="/signup"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}

