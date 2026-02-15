"use client"

import { useEI } from '@/context/EmotionalIntelligenceProvider';
import { useMemo } from 'react';
import { PerformanceMode } from '@/lib/performance/effort';

export function usePerformance() {
    const { mode } = useEI();

    const performanceMode = useMemo((): PerformanceMode => {
        if (mode === 'worst') return 'low-power';
        if (mode === 'thriving') return 'high-effort';
        return 'standard';
    }, [mode]);

    return {
        performanceMode,
        isLowPower: performanceMode === 'low-power',
        isHighEffort: performanceMode === 'high-effort',
        prefetchBudget: mode === 'worst' ? 0.2 : mode === 'thriving' ? 1.0 : 0.5
    };
}
