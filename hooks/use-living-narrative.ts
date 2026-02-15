"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingContinuity } from "./use-living-continuity";
import { StewardNarrativeEngine } from "@/lib/engines/steward-narrative-engine";
import { useMemo } from "react";

/**
 * The Living Narrative Hook.
 * Establishes the co-created story intelligence between the Steward and the OS.
 */
export function useLivingNarrative(posture: EmotionalPosture) {
    const continuity = useLivingContinuity(posture);

    // The Living Narrative
    const narrative = useMemo(() => {
        return StewardNarrativeEngine.getLivingNarrative(continuity.continuity, (continuity as any).trifold);
    }, [continuity.continuity, (continuity as any).trifold]);

    return {
        // The Narrative
        narrative,

        // Inherited Continuity (and all prior stewardship layers)
        ...continuity,

        // Narrative Meta
        currentMoment: narrative.trifold.immediate.meaning,
        activeChapter: narrative.trifold.active.phase,
        journeyStatus: narrative.trifold.living.evolutionStatus
    };
}
