import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  // API rate limiting headers (basic implementation)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    
    // Add rate limiting headers (in production, use a proper rate limiting service)
    response.headers.set('X-RateLimit-Limit', '10');
    response.headers.set('X-RateLimit-Remaining', '9');
    response.headers.set('X-RateLimit-Reset', String(Date.now() + 60000));
  }

  // Block suspicious user agents
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousAgents = [
    'sqlmap',
    'nikto',
    'nmap',
    'masscan',
    'zap',
    'burp',
    'w3af',
    'havij',
    'acunetix',
  ];

  if (suspiciousAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
    return new Response('Forbidden', { status: 403 });
  }

  // Block requests with suspicious patterns
  const url = request.nextUrl.pathname;
  const suspiciousPatterns = [
    /\.\./, // Directory traversal
    /<script/i, // XSS attempts
    /union.*select/i, // SQL injection
    /eval\(/i, // Code injection
    /javascript:/i, // JavaScript protocol
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(url))) {
    return new Response('Bad Request', { status: 400 });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
