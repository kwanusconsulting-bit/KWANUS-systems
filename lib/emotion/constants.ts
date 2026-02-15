import { EmotionalMode } from './types';

export const INTENSITY_THRESHOLDS = {
    WORST: 0.2,
    NEUTRAL: 0.5,
    PROGRESSING: 0.8,
    THRIVING: 1.0
};

export const MODE_LABELS: Record<EmotionalMode, string> = {
    worst: 'Protective Mode',
    neutral: 'Steady Baseline',
    progressing: 'Warming Resonance',
    thriving: 'High Vitality'
};

export const DECAY_RATE = 0.05; // Intensity decay per hour
