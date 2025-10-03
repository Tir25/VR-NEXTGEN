/**
 * Security utilities for VR NextGEN Solutions
 * Provides input sanitization, validation, and security helpers
 */

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Removes potentially dangerous HTML tags and attributes
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic sanitization
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
      .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
      .replace(/<embed[^>]*>/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/javascript:/gi, '');
  }

  // Client-side: use DOMPurify if available
  // Note: You would need to install dompurify and its types
  // npm install dompurify @types/dompurify
  try {
    // For now, return basic sanitization
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/javascript:/gi, '');
  } catch {
    // Fallback to basic sanitization
    return html.replace(/<[^>]*>/g, '');
  }
}

/**
 * Validates and sanitizes user input
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .slice(0, 1000); // Limit length
}

/**
 * Validates email format and sanitizes
 */
export function sanitizeEmail(email: string): string {
  const sanitized = sanitizeInput(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  
  return sanitized.toLowerCase();
}

/**
 * Validates and sanitizes phone numbers
 */
export function sanitizePhone(phone: string): string {
  const sanitized = sanitizeInput(phone);
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,15}$/;
  
  if (!phoneRegex.test(sanitized)) {
    throw new Error('Invalid phone number format');
  }
  
  return sanitized;
}

/**
 * Creates a secure CSRF token
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates CSRF token
 */
export function validateCSRFToken(token: string, expectedToken: string): boolean {
  if (!token || !expectedToken) return false;
  
  // Use timing-safe comparison to prevent timing attacks
  const tokenBuffer = Buffer.from(token, 'hex');
  const expectedBuffer = Buffer.from(expectedToken, 'hex');
  
  if (tokenBuffer.length !== expectedBuffer.length) return false;
  
  let result = 0;
  for (let i = 0; i < tokenBuffer.length; i++) {
    result |= tokenBuffer[i] ^ expectedBuffer[i];
  }
  
  return result === 0;
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
  
  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
}

/**
 * Secure headers for API responses
 */
export const SECURE_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
} as const;

/**
 * Content Security Policy for production
 */
export const CSP_PRODUCTION = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // Adjust based on your needs
  "style-src 'self' 'unsafe-inline'", // Tailwind CSS requires this
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');

/**
 * Validates file uploads
 */
export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size too large. Maximum 5MB allowed.' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only images are allowed.' };
  }
  
  return { valid: true };
}
