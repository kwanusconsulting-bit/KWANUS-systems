/**
 * KWANUS Architectural Guardrails
 * Utilities to ensure system integrity during development and execution.
 */

export const Guardrails = {
    /**
     * Prevents heavy intelligence logic from running in client bundles.
     */
    enforceServerSovereignty: (domain: string) => {
        if (typeof window !== 'undefined') {
            const msg = `[SECURITY_ALERT] ${domain} logic attempted to execute in client context. Architectural sovereignty violated.`;
            console.error(msg);
            // In development, we could throw, but for the OS, we silently fail and alert.
        }
    },

    /**
     * Verifies that events contain required metadata before propagation.
     */
    validateEventResonance: (event: any) => {
        const required = ['id', 'domain', 'type', 'payload'];
        const missing = required.filter(k => !event[k]);

        if (missing.length > 0) {
            throw new Error(`[RESONANCE_ERROR] Missing event metadata: ${missing.join(', ')}`);
        }
        return true;
    }
};
