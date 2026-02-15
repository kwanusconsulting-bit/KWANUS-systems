export const logger = {
    info: (message: string, meta?: any) => {
        if (process.env.NODE_ENV === "production") {
            console.log(JSON.stringify({ level: "info", message, meta, timestamp: new Date().toISOString() }));
        } else {
            console.log(`[INFO] ${message}`, meta || "");
        }
    },

    error: (message: string, error?: any) => {
        if (process.env.NODE_ENV === "production") {
            console.error(JSON.stringify({ level: "error", message, error: error?.message || error, stack: error?.stack, timestamp: new Date().toISOString() }));
        } else {
            console.error(`[ERROR] ${message}`, error || "");
        }
    },

    warn: (message: string, meta?: any) => {
        if (process.env.NODE_ENV === "production") {
            console.warn(JSON.stringify({ level: "warn", message, meta, timestamp: new Date().toISOString() }));
        } else {
            console.warn(`[WARN] ${message}`, meta || "");
        }
    },

    debug: (message: string, meta?: any) => {
        if (process.env.NODE_ENV !== "production") {
            console.debug(`[DEBUG] ${message}`, meta || "");
        }
    }
};
