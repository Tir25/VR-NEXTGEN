/**
 * Signup Page
 * 
 * New user registration.
 */

import { SignupForm } from '@/components/auth';

export const metadata = {
    title: 'Sign Up | GearGuard',
    description: 'Create your GearGuard account',
};

export default function SignupPage() {
    return <SignupForm />;
}

