const WINDOW = 60 * 1000; // 1 minute

// Per-route limits (requests per window)
const ROUTE_LIMITS: Record<string, number> = {
    auth: 10,
    billing: 5,
    ml: 30,
    motherboard: 5,
    default: 20
};

const ipRouteHits = new Map<string, { count: number; timestamp: number }>();

/**
 * Rate limit by IP + route category.
 * Returns true if request is allowed, false if limit exceeded.
 */
export function rateLimitRoute(ip: string, route: string): boolean {
    const limit = ROUTE_LIMITS[route] ?? ROUTE_LIMITS.default;
    const key = `${ip}:${route}`;
    const now = Date.now();
    const entry = ipRouteHits.get(key);

    if (!entry) {
        ipRouteHits.set(key, { count: 1, timestamp: now });
        return true;
    }

    if (now - entry.timestamp > WINDOW) {
        ipRouteHits.set(key, { count: 1, timestamp: now });
        return true;
    }

    if (entry.count >= limit) {
        return false;
    }

    entry.count++;
    return true;
}

/**
 * Legacy: general rate limit (20/min, no route distinction).
 */
export function rateLimit(ip: string): boolean {
    return rateLimitRoute(ip, "default");
}

// Cleanup old entries every minute
setInterval(() => {
    const now = Date.now();
    for (const [key, data] of ipRouteHits.entries()) {
        if (now - data.timestamp > WINDOW) {
            ipRouteHits.delete(key);
        }
    }
}, WINDOW);
