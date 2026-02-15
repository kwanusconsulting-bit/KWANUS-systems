"use client";

import { useSystemResonance } from "./use-system-resonance";
import { SynthesisEngine } from "@/lib/engines/synthesis-engine";
import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useMemo } from "react";

/**
 * The ultimate hook for the KWANUS OS.
 * Synthesizes all prior layers (Timeline, Emotion, Navigation, Continuity, Coherence, Harmony)
 * into a single unified operating consciousness.
 */
export function useSystemSynthesis(posture: EmotionalPosture) {
    const resonance = useSystemResonance(posture);

    // The Synthesis Field (The Mind of the OS)
    const field = useMemo(() => SynthesisEngine.getSynthesisField(posture), [posture]);

    // Integrated Intelligence
    const intelligence = useMemo(() => SynthesisEngine.getIntegratedIntelligence(posture), [posture]);

    return {
        // The Integrated Mind
        field,
        intelligence,

        // Inherited Resonance (The Soul and Music of the OS)
        ...resonance,

        // Synthesis Rules
        isUnified: field.emotionalUnified && field.identityAnchored,
        oneIdentity: true,
        oneStory: true
    };
}
