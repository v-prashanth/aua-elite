/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Security Headers — applied to every route.
   * Reference: https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent browsers from MIME-sniffing the response
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Block clickjacking attacks
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Force HTTPS for 2 years, include subdomains
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Stop leaking the referrer to third-party domains
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restrict browser features we don't use
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Content Security Policy
          // Adjust 'img-src' when adding a CDN for images.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js requires 'unsafe-inline' for its inline styles
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Scripts: self + Next.js runtime inline scripts
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // API calls: self + Supabase
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
              // Images: self + data URIs + Supabase Storage
              "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in",
              // Fonts from Google Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Disallow all object embeds
              "object-src 'none'",
              // Prevent form submissions to external origins
              "form-action 'self'",
              // Prevent framing by other origins
              "frame-ancestors 'none'",
              // Upgrade insecure requests
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // Disable browser XSS auditor (deprecated, but still useful for older browsers)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      // Cache-control for static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
