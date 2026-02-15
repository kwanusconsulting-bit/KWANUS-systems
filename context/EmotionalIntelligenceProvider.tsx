"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { eventRouter } from '@/lib/events/router';
import { KwanusEvent } from '@/lib/events/types';

type EmotionalMode = 'worst' | 'neutral' | 'progressing' | 'thriving';

interface EmotionalIntelligenceState {
    mode: EmotionalMode;
    intensity: number;
    harmonic: number;
    hybridScore: number;
    partnerHarmonics: number;
}

const EIContext = createContext<EmotionalIntelligenceState | undefined>(undefined);

export const EmotionalIntelligenceProvider = ({ children }: { children: ReactNode }) => {
    // Initial State (Neutral)
    const [state, setState] = useState<EmotionalIntelligenceState>({
        mode: 'neutral',
        intensity: 0.5,
        harmonic: 432.0,
        hybridScore: 720,
        partnerHarmonics: 0.85
    });

    useEffect(() => {
        // Listen for internal emotional recalibration events
        eventRouter.on('INTENSITY_SHIFT', (event: KwanusEvent) => {
            const { mode, intensity, harmonic, hybridScore, partnerHarmonics } = event.payload;
            setState(prev => ({
                ...prev,
                mode: mode || prev.mode,
                intensity: intensity ?? prev.intensity,
                harmonic: harmonic ?? prev.harmonic,
                hybridScore: hybridScore ?? prev.hybridScore,
                partnerHarmonics: partnerHarmonics ?? prev.partnerHarmonics
            }));

            if (mode) document.body.className = `k-mode-${mode}`;
        });

        // Mocking an initial shift to 'thriving' for the demonstration
        const timer = setTimeout(() => {
            eventRouter.emit({
                id: 'init-shift',
                type: 'INTENSITY_SHIFT',
                domain: 'emotional',
                userId: 'root',
                payload: { mode: 'thriving', intensity: 0.88, harmonic: 444.0, hybridScore: 780, partnerHarmonics: 0.92 },
                createdAt: new Date().toISOString()
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <EIContext.Provider value={state}>
            <div className={`k-mode-${state.mode} min-h-full transition-all duration-1000`}>
                {children}
            </div>
        </EIContext.Provider>
    );
};

export const useEI = () => {
    const context = useContext(EIContext);
    if (!context) throw new Error("useEI must be used within an EmotionalIntelligenceProvider");
    return context;
};
