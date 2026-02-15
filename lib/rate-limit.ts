const RATE_LIMIT = 20; // requests per window
const WINDOW = 60 * 1000; // 1 minute

const ipHits = new Map<string, { count: number; timestamp: number }>();

export function rateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = ipHits.get(ip);

    if (!entry) {
        ipHits.set(ip, { count: 1, timestamp: now });
        return true;
    }

    // Reset if window has passed
    if (now - entry.timestamp > WINDOW) {
        ipHits.set(ip, { count: 1, timestamp: now });
        return true;
    }

    // Reject if limit exceeded
    if (entry.count >= RATE_LIMIT) {
        return false;
    }

    // Increment counter
    entry.count++;
    return true;
}

// Cleanup old entries periodically (optional but recommended)
setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of ipHits.entries()) {
        if (now - data.timestamp > WINDOW) {
            ipHits.delete(ip);
        }
    }
}, WINDOW);
