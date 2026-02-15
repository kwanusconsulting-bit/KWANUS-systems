"use client"

import { useState, useEffect, useMemo } from 'react';
import { useEI } from '@/context/EmotionalIntelligenceProvider';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop' | 'expansive' | 'minimal';
export type DensityMode = 'comfortable' | 'compact' | 'adaptive';

export function useDevice() {
    const { mode } = useEI();
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const deviceMode = useMemo((): DeviceMode => {
        if (width < 640) return 'mobile';
        if (width < 1024) return 'tablet';
        if (width < 1536) return 'desktop';
        return 'expansive';
    }, [width]);

    // Emotional-Adaptive Density
    const density = useMemo((): DensityMode => {
        if (mode === 'worst') return 'comfortable';
        if (mode === 'thriving') return 'adaptive';
        return 'compact';
    }, [mode]);

    return {
        deviceMode,
        density,
        isMobile: deviceMode === 'mobile',
        isTablet: deviceMode === 'tablet',
        isDesktop: deviceMode === 'desktop' || deviceMode === 'expansive',
        isExpansive: deviceMode === 'expansive'
    };
}
