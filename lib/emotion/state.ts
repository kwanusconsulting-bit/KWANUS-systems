/**
 * KWANUS Emotional Nervous System
 * Baseline state definitions.
 */

export type EmotionalMode = 'worst' | 'neutral' | 'progressing' | 'thriving';

export interface EmotionalState {
    mode: EmotionalMode;
    intensity: number; // 0.0 to 1.0
}

export const BASELINE_STATE: EmotionalState = {
    mode: 'neutral',
    intensity: 0.5
};
