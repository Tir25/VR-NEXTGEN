import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { sanitizeInput, sanitizeEmail, generateCSRFToken, validateCSRFToken, RateLimiter, SECURE_HEADERS } from '@/utils/security';

// Rate limiter: 5 requests per minute per IP
const rateLimiter = new RateLimiter(5, 60000);

// Contact form validation schema
const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
  csrfToken: z.string().optional(),
});

// type ContactFormData = z.infer<typeof ContactSchema>; // Unused for now

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set security headers
  Object.entries(SECURE_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for'] as string || 
                     req.headers['x-real-ip'] as string || 
                     req.connection.remoteAddress || 
                     'unknown';

    // Check rate limit
    if (!rateLimiter.isAllowed(clientIP)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.',
        retryAfter: 60 
      });
    }

    // Validate request body
    const validationResult = ContactSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Invalid form data',
        details: validationResult.error.issues 
      });
    }

    const { name, email, message, csrfToken } = validationResult.data;

    // Validate CSRF token if provided (optional for now, but recommended)
    if (csrfToken && !validateCSRFToken(csrfToken, req.headers['x-csrf-token'] as string)) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeEmail(email),
      message: sanitizeInput(message),
    };

    // Log the submission (in production, send to your email service)
    // Contact form submission received - ready for production email service

    // TODO: In production, implement one of these:
    // 1. Send email using SendGrid, AWS SES, or similar
    // 2. Save to database
    // 3. Send to Slack/Discord webhook
    // 4. Use Formspree or similar service

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!',
      csrfToken: generateCSRFToken() // Generate new token for next request
    });

  } catch (error) {
    // Contact form error occurred - handled gracefully
    
    // Don't expose internal errors to client
    res.status(500).json({ 
      error: 'An error occurred while processing your request. Please try again later.' 
    });
  }
}
