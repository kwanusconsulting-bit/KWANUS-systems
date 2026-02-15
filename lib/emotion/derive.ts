import { EmotionalMode } from './state';

/**
 * KWANUS Emotional Engine: Derivation
 * Logic for mapping global resonance to specific domain behaviors.
 */

export interface DerivedBehavior {
    pacing: 'protective' | 'steady' | 'accelerated';
    density: 'minimal' | 'comfortable' | 'compact';
    guidance: boolean;
}

export function deriveBehavior(mode: EmotionalMode): DerivedBehavior {
    switch (mode) {
        case 'worst':
            return { pacing: 'protective', density: 'minimal', guidance: true };
        case 'progressing':
            return { pacing: 'steady', density: 'comfortable', guidance: true };
        case 'thriving':
            return { pacing: 'accelerated', density: 'compact', guidance: false };
        default:
            return { pacing: 'steady', density: 'comfortable', guidance: false };
    }
}
