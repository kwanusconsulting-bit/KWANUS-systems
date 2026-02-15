"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardHarmonics } from "./use-steward-harmonics";
import { StewardUnifiedFieldEngine } from "@/lib/engines/steward-unified-field-engine";
import { useMemo } from "react";

/**
 * The Steward's Unified Influence Field Hook.
 * Merges movement, influence, field, and harmonics into a single, indivisible presence.
 */
export function useStewardUnifiedField(posture: EmotionalPosture) {
    const harmonics = useStewardHarmonics(posture);

    // The Unified Presence
    const unifiedPresence = useMemo(() => {
        return StewardUnifiedFieldEngine.getUnifiedField(
            posture,
            harmonics.senses,
            harmonics.trifold,
            harmonics.influenceSpiral,
            harmonics.fieldTrifold,
            harmonics.spectrum
        );
    }, [posture, harmonics.senses, harmonics.trifold, harmonics.influenceSpiral, harmonics.fieldTrifold, harmonics.spectrum]);

    // Global Tuning
    const globalTuning = useMemo(() => {
        return StewardUnifiedFieldEngine.getGlobalTuningStatus(unifiedPresence);
    }, [unifiedPresence]);

    return {
        // The Total Presence
        unifiedPresence,
        globalTuning,

        // Inherited Harmonics (and all prior layers)
        ...harmonics,

        // Unified Status
        isTotalPresence: unifiedPresence.isFused,
        isFullyAligned: globalTuning.isAligned
    };
}
