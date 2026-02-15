"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingNarrative } from "./use-living-narrative";
import { StewardAttunementEngine } from "@/lib/engines/steward-attunement-engine";
import { useMemo } from "react";

/**
 * The Living Attunement Hook.
 * Establishes the real-time sensitivity intelligence of the OS toward the Steward.
 */
export function useLivingAttunement(posture: EmotionalPosture) {
    const narrative = useLivingNarrative(posture);

    // The Living Attunement
    const attunement = useMemo(() => {
        return StewardAttunementEngine.getLivingAttunement(narrative.narrative);
    }, [narrative.narrative]);

    return {
        // The Attunement
        attunement,

        // Inherited Narrative (and all prior stewardship layers)
        ...narrative,

        // Attunement Meta
        isFeelingPresence: attunement.triad.microSignal.isFeeling,
        sensitivityDepth: attunement.sensitivityLevel,
        harmonicAttuned: attunement.triad.harmonic.isFeeling
    };
}
