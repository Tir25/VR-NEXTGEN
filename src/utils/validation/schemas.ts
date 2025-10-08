/**
 * Centralized validation schemas using Zod
 * Provides type-safe validation for forms, API responses, and data structures
 */

import { z } from 'zod';

// Base validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email is too long');

export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
  .max(20, 'Phone number is too long');

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters');

export const messageSchema = z
  .string()
  .min(1, 'Message is required')
  .min(10, 'Message must be at least 10 characters')
  .max(2000, 'Message is too long');

export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .max(2048, 'URL is too long');

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: z
    .string()
    .max(100, 'Company name is too long')
    .optional(),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject is too long'),
  message: messageSchema,
  consent: z
    .boolean()
    .refine(val => val === true, 'You must agree to the privacy policy'),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: emailSchema,
  consent: z
    .boolean()
    .refine(val => val === true, 'You must agree to receive newsletters'),
});

// User profile schema
export const userProfileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: z
    .string()
    .max(100, 'Company name is too long')
    .optional(),
  jobTitle: z
    .string()
    .max(100, 'Job title is too long')
    .optional(),
  industry: z
    .enum([
      'technology',
      'healthcare',
      'finance',
      'manufacturing',
      'retail',
      'education',
      'other'
    ])
    .optional(),
});

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  errors: z.array(z.string()).optional(),
});

export const paginatedResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number().min(1),
    limit: z.number().min(1),
    total: z.number().min(0),
    totalPages: z.number().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// File upload schemas
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(file => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      file => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type),
      'File must be an image (JPEG, PNG, GIF, or WebP)'
    ),
  description: z
    .string()
    .max(500, 'Description is too long')
    .optional(),
});

// Configuration validation schemas
export const appConfigSchema = z.object({
  appName: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  environment: z.enum(['development', 'staging', 'production']),
  apiUrl: urlSchema,
  features: z.record(z.string(), z.boolean()),
  limits: z.object({
    maxFileSize: z.number().min(1),
    maxRequestSize: z.number().min(1),
    rateLimit: z.number().min(1),
  }),
});

// Environment variables schema
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_APP_VERSION: z.string().min(1),
  NEXT_PUBLIC_APP_URL: urlSchema,
  API_BASE_URL: urlSchema.optional(),
  CONTACT_EMAIL: emailSchema.optional(),
  DATABASE_URL: z.string().url().optional(),
  SECRET_KEY: z.string().min(32).optional(),
});

// Type exports for TypeScript inference
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type UserProfileData = z.infer<typeof userProfileSchema>;
export type ApiResponse<T = unknown> = z.infer<typeof apiResponseSchema> & { data?: T };
export type PaginatedResponse<T = unknown> = z.infer<typeof paginatedResponseSchema> & { data: T[] };
export type FileUploadData = z.infer<typeof fileUploadSchema>;
export type AppConfig = z.infer<typeof appConfigSchema>;
export type EnvConfig = z.infer<typeof envSchema>;

// Validation helper functions
export const validateData = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map(err => err.message),
      };
    }
    return {
      success: false,
      errors: ['Validation failed'],
    };
  }
};

export const validateFormField = <T>(
  schema: z.ZodSchema<T>,
  value: unknown
): { success: true; data: T } | { success: false; error: string } => {
  try {
    const result = schema.parse(value);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid value',
      };
    }
    return {
      success: false,
      error: 'Validation failed',
    };
  }
};

// Custom validation rules
export const createCustomValidator = <T>(
  schema: z.ZodSchema<T>,
  customRules: Array<(data: T) => string | null>
) => {
  return z.custom<T>((data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new z.ZodError(result.error.issues);
    }
    
    for (const rule of customRules) {
      const error = rule(result.data);
      if (error) {
        throw new z.ZodError([{
          code: 'custom',
          message: error,
          path: [],
        }]);
      }
    }
    
    return result.data;
  });
};
