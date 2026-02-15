import { EmotionalMode } from './state';

/**
 * KWANUS Emotional Engine: Calculation
 * Logic for determining resonance intensity and sentiment shifts.
 */

export function calculateIntensity(events: any[]): number {
    if (events.length === 0) return 0.5; // Baseline

    // Simple decay-weighted average of event intensities
    const sum = events.reduce((acc, event) => acc + (event.intensity || 0.5), 0);
    return Math.min(Math.max(sum / events.length, 0.0), 1.0);
}

export function determineMode(intensity: number): EmotionalMode {
    if (intensity < 0.2) return 'worst';
    if (intensity < 0.5) return 'neutral';
    if (intensity < 0.8) return 'progressing';
    return 'thriving';
}
