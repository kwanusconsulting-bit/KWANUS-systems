import { randomUUID } from "crypto";

export type LogLevel = "info" | "warn" | "error";

export interface LogMeta {
    requestId?: string;
    tenantId?: string;
    userId?: string;
    [key: string]: unknown;
}

/**
 * Structured logger — outputs JSON lines for log aggregators.
 * In development, pretty-prints for readability.
 */
export function log(level: LogLevel, message: string, meta: LogMeta = {}): void {
    const entry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...meta
    };

    if (process.env.NODE_ENV === "development") {
        const prefix = level === "error" ? "❌" : level === "warn" ? "⚠️" : "ℹ️";
        console.log(`${prefix} [${entry.timestamp}] ${message}`, meta);
    } else {
        // Production: structured JSON for log aggregators (Datadog, Axiom, etc.)
        console.log(JSON.stringify(entry));
    }
}

/**
 * Generate a unique request ID for tracing API calls.
 */
export function createRequestId(): string {
    return `req_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

// Convenience wrappers
export const logger = {
    info: (message: string, meta?: LogMeta) => log("info", message, meta),
    warn: (message: string, meta?: LogMeta) => log("warn", message, meta),
    error: (message: string, meta?: LogMeta) => log("error", message, meta)
};
