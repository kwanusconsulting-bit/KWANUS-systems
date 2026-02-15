"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardField } from "./use-steward-field";
import { StewardHarmonicsEngine } from "@/lib/engines/steward-harmonics-engine";
import { useMemo } from "react";

/**
 * The Steward's Harmonics Hook.
 * Emits the frequency signature that tunes the entire KWANUS universe.
 */
export function useStewardHarmonics(posture: EmotionalPosture) {
    const field = useStewardField(posture);

    // The Harmonic Spectrum (Low, Mid, High Bands)
    const spectrum = useMemo(() => {
        return StewardHarmonicsEngine.getHarmonicSpectrum(posture, field.senses, field.fieldTrifold);
    }, [posture, field.senses, field.fieldTrifold]);

    // System Tuning
    const tuning = useMemo(() => {
        return StewardHarmonicsEngine.calculateSystemTuning(spectrum);
    }, [spectrum]);

    return {
        // The Harmonics
        spectrum,
        tuning,

        // Inherited Field (The Energetic Environment and prior layers)
        ...field,

        // Harmonic Status
        isHarmonized: tuning.isResonant,
        baseFrequency: tuning.globalFrequency,
        tuningPower: tuning.tuningResonance
    };
}
