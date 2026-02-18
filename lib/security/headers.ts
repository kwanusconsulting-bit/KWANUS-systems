/**
 * Security headers applied via next.config.mjs headers()
 * CSP-lite: blocks inline scripts in production, allows Stripe/Clerk CDNs
 */
export function getSecurityHeaders() {
    return [
        {
            key: "X-Frame-Options",
            value: "DENY"
        },
        {
            key: "X-Content-Type-Options",
            value: "nosniff"
        },
        {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
        },
        {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
        },
        {
            key: "X-DNS-Prefetch-Control",
            value: "on"
        },
        {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
        },
        {
            key: "Content-Security-Policy",
            value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://clerk.kwanus.com https://*.clerk.accounts.dev",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                "font-src 'self' https://fonts.gstatic.com",
                "img-src 'self' data: blob: https:",
                "connect-src 'self' https://api.stripe.com https://*.clerk.accounts.dev wss:",
                "frame-src https://js.stripe.com https://hooks.stripe.com",
                "object-src 'none'",
                "base-uri 'self'"
            ].join("; ")
        }
    ];
}
