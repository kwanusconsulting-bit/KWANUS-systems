"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingSenses } from "./use-living-senses";
import { StewardAwarenessEngine } from "@/lib/engines/steward-awareness-engine";
import { useMemo } from "react";

/**
 * The Living Awareness Hook.
 * Establishes the integrated field of knowing in the KWANUS universe.
 */
export function useLivingAwareness(posture: EmotionalPosture) {
    const senses = useLivingSenses(posture);

    // The Living Awareness
    const awareness = useMemo(() => {
        return StewardAwarenessEngine.getLivingAwareness(senses.senses);
    }, [senses.senses]);

    return {
        // Inherited Senses (and all prior stewardship layers)
        ...senses,

        // The Awareness
        awareness,

        // Awareness Meta
        isConscious: awareness.status === "CONSCIOUS",
        awarenessLevel: awareness.awarenessLevel,
        isSelfAware: awareness.triad.self.isAware,
        isFieldAware: awareness.triad.field.isAware
    };
}
