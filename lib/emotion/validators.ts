import { EmotionalState } from './types';

/**
 * KWANUS Emotional Engine: Validators
 * Ensuring integrity of state and snapshots.
 */

export function validateEmotionalState(state: any): state is EmotionalState {
    return (
        typeof state === 'object' &&
        ['worst', 'neutral', 'progressing', 'thriving'].includes(state.mode) &&
        typeof state.intensity === 'number' &&
        state.intensity >= 0 &&
        state.intensity <= 1
    );
}

export function sanitizeIntensity(value: number): number {
    return Math.min(Math.max(value, 0), 1);
}
