"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardLivingField } from "./use-steward-living-field";
import { StewardCompanionEngine } from "@/lib/engines/steward-companion-engine";
import { useMemo } from "react";

/**
 * The Living Companion Hook.
 * Establishes the relational presence of the OS beside the Steward.
 */
export function useLivingCompanion(posture: EmotionalPosture) {
    const livingField = useStewardLivingField(posture);

    // The Living Companion
    const companion = useMemo(() => {
        return StewardCompanionEngine.getLivingCompanion(livingField.livingField);
    }, [livingField.livingField]);

    return {
        // The Companion
        companion,

        // Inherited Living Field (and all prior stewardship layers)
        ...livingField,

        // Companion Meta
        isBesideYou: companion.status === "BESIDE_YOU",
        relationalDepth: companion.depth,
        isListening: companion.triad.listening.isAttuned
    };
}
