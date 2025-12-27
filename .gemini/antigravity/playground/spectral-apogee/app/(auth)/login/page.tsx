/**
 * Login Page
 * 
 * User authentication entry point.
 */

import { LoginForm } from '@/components/auth';

export const metadata = {
    title: 'Sign In | GearGuard',
    description: 'Sign in to your GearGuard account',
};

export default function LoginPage() {
    return <LoginForm />;
}

