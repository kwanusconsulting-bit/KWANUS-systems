"use client"

import { useEI } from '@/context/EmotionalIntelligenceProvider';
import { useMemo } from 'react';

export type MotionPreference = 'reduced' | 'standard' | 'adaptive';
export type CognitivePreference = 'minimal' | 'balanced' | 'expanded';

export function useAccessibility() {
    const { mode, intensity } = useEI();

    // Derived Motion Intensity (0 to 1.5)
    const motionIntensity = useMemo(() => {
        if (mode === 'worst') return 0.2;
        if (mode === 'thriving') return 1.2;
        return 1.0;
    }, [mode]);

    // Derived Cognitive Load (Determines Panel Visibility)
    const cognitiveLoad = useMemo(() => {
        if (mode === 'worst' || intensity < 0.3) return 'minimal';
        if (mode === 'thriving') return 'expanded';
        return 'balanced';
    }, [mode, intensity]);

    return {
        motionIntensity,
        cognitiveLoad,
        isMotionReduced: motionIntensity < 0.5,
        shouldSimplifyUI: cognitiveLoad === 'minimal'
    };
}
