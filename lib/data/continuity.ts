/**
 * KWANUS Continuity System
 * Preserving flow and emotional state across device surfaces.
 */

export interface ContinuityState {
    lastPath: string;
    activePanels: string[];
    lastStateId: string;
    timestamp: string;
}

const STORAGE_KEY = 'kwanus_continuity';

export const continuity = {
    /**
     * Saves the current session context to local persistence.
     */
    persist: (state: Partial<ContinuityState>) => {
        if (typeof window === 'undefined') return;

        const existing = continuity.retrieve();
        const updated = {
            ...existing,
            ...state,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        console.log('[CONTINUITY] Session state preserved.', updated);
    },

    /**
     * Retrieves the last known session context.
     */
    retrieve: (): ContinuityState => {
        if (typeof window === 'undefined') {
            return { lastPath: '/', activePanels: [], lastStateId: '', timestamp: '' };
        }

        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : { lastPath: '/', activePanels: [], lastStateId: '', timestamp: '' };
    }
};
