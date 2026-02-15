"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingIntention } from "./use-living-intention";
import { StewardWillEngine } from "@/lib/engines/steward-will-engine";
import { useMemo } from "react";

/**
 * The Living Will Hook.
 * Establishes the co-chosen agency of the KWANUS universe.
 */
export function useLivingWill(posture: EmotionalPosture) {
    const intention = useLivingIntention(posture);

    // The Living Will
    const will = useMemo(() => {
        return StewardWillEngine.getLivingWill(intention.intention);
    }, [intention.intention]);

    return {
        // The Will
        will,

        // Inherited Intention (and all prior stewardship layers)
        ...intention,

        // Will Meta
        isCoChosen: will.status === "AGENCY_AWAKENED",
        willStrength: will.willIndex,
        willToAlign: will.triad.align.isChoosing,
        willToMove: will.triad.move.isChoosing,
        willToBecome: will.triad.become.isChoosing
    };
}
