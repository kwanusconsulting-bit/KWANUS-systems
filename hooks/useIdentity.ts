"use client"

import { useEI } from '@/context/EmotionalIntelligenceProvider';
import { VOICE_MODULATION, NAMING_CONVENTIONS } from '@/lib/brand/identity';

export function useIdentity() {
    const { mode } = useEI();

    const voice = VOICE_MODULATION[mode] || VOICE_MODULATION.neutral;

    return {
        voice,
        naming: NAMING_CONVENTIONS,
        traits: {
            isGentle: voice.tone === 'soft' || voice.tone === 'steady',
            isEnergetic: voice.tone === 'expressive',
            shouldSimplify: voice.complexity === 'minimal'
        }
    };
}
