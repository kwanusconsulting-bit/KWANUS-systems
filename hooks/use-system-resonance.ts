"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useEmotionalRendering } from "./use-emotional-rendering";
import { useNavigationCeremony } from "./use-navigation-ceremony";
import { HarmonicEngine } from "@/lib/engines/harmonic-engine";
import { CoherenceEngine } from "@/lib/engines/coherence-matrix";
import { useMemo } from "react";

/**
 * The System-Level Resonance Hook.
 * Synthesizes Emotional, Navigation, Coherence, and Harmonic channels
 * into a single unified reactive state for the OS.
 */
export function useSystemResonance(posture: EmotionalPosture) {
    const rendering = useEmotionalRendering(posture);
    const movement = useNavigationCeremony(posture);

    // Static engine calls for coherence and harmonics
    const resonance = useMemo(() => HarmonicEngine.getResonance(posture), [posture]);
    const coherence = useMemo(() => CoherenceEngine.getCoherence(posture), [posture]);

    return {
        // The Resonant Identity
        posture,
        resonance,
        coherence,

        // Adaptive Rendering (Density, Tone, Guidance)
        rendering,

        // Ceremonial Movement (Transitions, Pacing)
        movement: {
            navigateTo: movement.navigateTo,
            rules: movement.transitionRules
        },

        // Harmonic Visuals (for CSS variables)
        visualTheme: {
            primaryColor: getThemeColor(coherence.palette),
            baseTempo: resonance.tempo,
            animationMultiplier: resonance.pacingWeight
        }
    };
}

function getThemeColor(palette: string): string {
    switch (palette) {
        case "GROUNDING_EARTH": return "var(--color-grounding)";
        case "BALANCED_CORE": return "var(--color-balanced)";
        case "MOMENTUM_VELOCITY": return "var(--color-momentum)";
        case "EXPANSIVE_LIGHT": return "var(--color-expansive)";
        default: return "var(--color-neutral)";
    }
}
