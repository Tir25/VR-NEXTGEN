/**
 * Form Validation Schemas
 * 
 * Zod schemas for form validation across the application.
 * Used with react-hook-form via @hookform/resolvers
 */

import { z } from 'zod';

// ============================================
// PASSWORD VALIDATION HELPERS
// ============================================

export const passwordRegex = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    special: /[^a-zA-Z0-9]/, // Matches any non-alphanumeric character (including spaces)
};

// ============================================
// LOGIN SCHEMA
// ============================================

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ============================================
// SIGNUP SCHEMA (Enhanced per mockup requirements)
// ============================================

export const signupSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(100, 'Name must be less than 100 characters'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters')
        .refine((val) => passwordRegex.lowercase.test(val), {
            message: 'Password must contain at least one lowercase letter',
        })
        .refine((val) => passwordRegex.uppercase.test(val), {
            message: 'Password must contain at least one uppercase letter',
        })
        .refine((val) => passwordRegex.special.test(val), {
            message: 'Password must contain at least one special character',
        }),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type SignupFormData = z.infer<typeof signupSchema>;

// ============================================
// EQUIPMENT SCHEMA
// ============================================

export const equipmentSchema = z.object({
    name: z
        .string()
        .min(1, 'Equipment name is required')
        .max(100, 'Name must be less than 100 characters'),
    serialNumber: z
        .string()
        .min(1, 'Serial number is required')
        .max(50, 'Serial number must be less than 50 characters'),
    category: z.string().min(1, 'Category is required'),
    department: z.string().min(1, 'Department is required'),
    location: z
        .string()
        .min(1, 'Location is required')
        .max(200, 'Location must be less than 200 characters'),
    purchaseDate: z.string().min(1, 'Purchase date is required'),
    warrantyExpiration: z.string().optional().nullable(),
    maintenanceTeamId: z.string().optional(),
    techId: z.string().optional(),
    employeeId: z.string().optional(),
    status: z.enum(['active', 'maintenance', 'scrap']),
    notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
});

export type EquipmentFormValues = z.infer<typeof equipmentSchema>;

// ============================================
// TEAM SCHEMA
// ============================================

export const teamMemberSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    name: z
        .string()
        .min(1, 'Name is required')
        .max(100, 'Name must be less than 100 characters'),
    email: z.string().email('Please enter a valid email'),
    role: z.enum(['lead', 'technician', 'apprentice']),
});

export const teamSchema = z.object({
    name: z
        .string()
        .min(1, 'Team name is required')
        .max(100, 'Name must be less than 100 characters'),
    description: z
        .string()
        .max(500, 'Description must be less than 500 characters')
        .optional(),
    members: z.array(teamMemberSchema).default([]),
});

export type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;
export type TeamFormValues = z.infer<typeof teamSchema>;

// ============================================
// REQUEST SCHEMA
// ============================================

export const requestSchema = z
    .object({
        subject: z
            .string()
            .min(1, 'Subject is required')
            .max(200, 'Subject must be less than 200 characters'),
        description: z
            .string()
            .max(2000, 'Description must be less than 2000 characters')
            .optional(),
        equipmentId: z.string().min(1, 'Equipment selection is required'),
        teamId: z.string().min(1, 'Team is required'),
        technicianId: z.string().optional(),
        type: z.enum(['corrective', 'preventive']),
        status: z.enum(['new', 'in_progress', 'repaired', 'scrap']).default('new'),
        priority: z.enum(['low', 'medium', 'high', 'critical']),
        scheduledDate: z.date().optional().nullable(),
        requesterId: z.string().min(1, 'Requester is required'),
    })
    .refine(
        (data) => {
            // If type is preventive, scheduledDate is required
            if (data.type === 'preventive' && !data.scheduledDate) {
                return false;
            }
            return true;
        },
        {
            message: 'Scheduled date is required for preventive maintenance',
            path: ['scheduledDate'],
        }
    );

export type RequestFormValues = z.infer<typeof requestSchema>;

// ============================================
// COMMON VALIDATION HELPERS
// ============================================

/**
 * Validate a single field
 */
export function validateField<T extends z.ZodType>(
    schema: T,
    value: unknown
): { success: true; data: z.infer<T> } | { success: false; error: string } {
    const result = schema.safeParse(value);
    if (result.success) {
        return { success: true, data: result.data };
    }
    // Zod v4 uses .issues instead of .errors
    return { success: false, error: result.error.issues[0]?.message || 'Invalid value' };
}

/**
 * Get all validation errors from a Zod error
 * @param error - Zod error object containing validation issues
 */
export function getValidationErrors(error: z.ZodError<unknown>): Record<string, string> {
    const errors: Record<string, string> = {};
    // Zod v4 uses .issues instead of .errors
    for (const issue of error.issues) {
        const path = issue.path.join('.');
        if (!errors[path]) {
            errors[path] = issue.message;
        }
    }
    return errors;
}
