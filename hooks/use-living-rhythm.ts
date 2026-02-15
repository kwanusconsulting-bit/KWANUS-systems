"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingCompanion } from "./use-living-companion";
import { StewardRhythmEngine } from "@/lib/engines/steward-rhythm-engine";
import { useMemo } from "react";

/**
 * The Living Rhythm Hook.
 * Establishes the shared kinetic motion between the Steward and the OS.
 */
export function useLivingRhythm(posture: EmotionalPosture) {
    const companion = useLivingCompanion(posture);

    // The Living Rhythm
    const rhythm = useMemo(() => {
        return StewardRhythmEngine.getLivingRhythm(companion.companion);
    }, [companion.companion]);

    return {
        // The Rhythm
        rhythm,

        // Inherited Companion (and all prior stewardship layers)
        ...companion,

        // Rhythm Meta
        isSynchronized: rhythm.isSynchronized,
        currentTempo: rhythm.triad.tempo.speed,
        flowTexture: rhythm.triad.flow.texture
    };
}
