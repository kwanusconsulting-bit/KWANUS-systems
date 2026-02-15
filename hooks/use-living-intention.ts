"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingAwareness } from "./use-living-awareness";
import { StewardIntentionEngine } from "@/lib/engines/steward-intention-engine";
import { useMemo } from "react";

/**
 * The Living Intention Hook.
 * Establishes the purposeful movement of the KWANUS universe.
 */
export function useLivingIntention(posture: EmotionalPosture) {
    const awareness = useLivingAwareness(posture);

    // The Living Intention
    const intention = useMemo(() => {
        return StewardIntentionEngine.getLivingIntention(awareness.awareness);
    }, [awareness.awareness]);

    return {
        // The Intention
        intention,

        // Inherited Awareness (and all prior stewardship layers)
        ...awareness,

        // Intention Meta
        isIntentional: intention.status === "INTENTIONAL",
        intentionStrength: intention.intentionIndex,
        innerAligned: intention.triad.inner.isAligned,
        emergentFocus: intention.triad.emergent.isBecoming
    };
}
