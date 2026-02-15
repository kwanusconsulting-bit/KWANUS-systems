import { GlobalAwareness } from './global';

/**
 * KWANUS State Selectors
 * Targeted logic for extracting state from the global awareness layer.
 */

export const selectEmotionalMode = (awareness: GlobalAwareness) => awareness.emotional.mode;
export const selectIntensity = (awareness: GlobalAwareness) => awareness.emotional.intensity;
export const selectIsThriving = (awareness: GlobalAwareness) => awareness.emotional.mode === 'thriving';

export const selectResonanceLevel = (awareness: GlobalAwareness) => {
    const intensity = awareness.emotional.intensity;
    if (intensity > 0.8) return 'vibrant';
    if (intensity > 0.4) return 'steady';
    return 'muted';
};
