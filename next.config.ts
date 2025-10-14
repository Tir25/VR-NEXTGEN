import type { NextConfig } from "next";

// Bundle analyzer configuration - only load when needed
let withBundleAnalyzer: any = null;
if (process.env.ANALYZE === 'true') {
  withBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Optimize bundle size
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },
  serverExternalPackages: [],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    remotePatterns: [],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Minimal webpack configuration to prevent memory issues
  webpack: (config, { dev, isServer }) => {
    // Only apply minimal optimizations in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        minimize: true,
        // Minimal chunk splitting
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      };
    }

    // Bundle analyzer configuration - only when explicitly requested
    if (process.env.ANALYZE === 'true' && withBundleAnalyzer) {
      config.plugins.push(
        new withBundleAnalyzer({
          analyzerMode: 'server',
          analyzerPort: process.env.BUNDLE_ANALYZE_PORT || 8888,
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';
    const scriptSrc = [
      "script-src 'self' 'unsafe-inline'",
      isDev ? "'unsafe-eval'" : ''
    ].filter(Boolean).join(' ');

    const styleSrc = [
      "style-src 'self' 'unsafe-inline'",
      'https://cdnjs.cloudflare.com'
    ].join(' ');

    const connectSrc = [
      'connect-src',
      "'self' https:",
      isDev ? 'ws:' : ''
    ].filter(Boolean).join(' ');

    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // XSS Protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              styleSrc,
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://cdnjs.cloudflare.com",
              connectSrc,
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // Strict Transport Security (HTTPS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/nextgen-blog',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
