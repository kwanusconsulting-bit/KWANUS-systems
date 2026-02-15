"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingAttunement } from "./use-living-attunement";
import { StewardHarmonyEngine } from "@/lib/engines/steward-harmony-engine";
import { useMemo } from "react";

/**
 * The Living Harmony Hook.
 * Establishes the resonant alignment between the Steward and the OS.
 */
export function useLivingHarmony(posture: EmotionalPosture) {
    const attunement = useLivingAttunement(posture);

    // The Living Harmony
    const harmony = useMemo(() => {
        return StewardHarmonyEngine.getLivingHarmony(attunement.attunement);
    }, [attunement.attunement]);

    return {
        // The Harmony
        harmony,

        // Inherited Attunement (and all prior stewardship layers)
        ...attunement,

        // Harmony Meta
        isInTune: harmony.status === "IN_TUNE",
        globalResonance: harmony.resonanceScore,
        emotionalResonant: harmony.trifold.emotional.isResonant
    };
}
