/**
 * KWANUS OS: Safe Action Wrapper
 * Ensuring integrity and predictability across server boundaries.
 */

export interface ActionResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    resonance: number;
}

export async function safeAction<T>(
    logic: () => Promise<T>
): Promise<ActionResponse<T>> {
    try {
        const result = await logic();
        return {
            success: true,
            data: result,
            resonance: 1.0
        };
    } catch (error) {
        console.error('[SAFE_ACTION_ERROR]', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Nexus signal loss.',
            resonance: 0.0
        };
    }
}
