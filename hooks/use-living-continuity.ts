"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingRhythm } from "./use-living-rhythm";
import { StewardContinuityEngine } from "@/lib/engines/steward-continuity-engine";
import { useMemo } from "react";

/**
 * The Living Continuity Hook.
 * Establishes the unbroken thread of presence between the Steward and the OS.
 */
export function useLivingContinuity(posture: EmotionalPosture) {
    const rhythm = useLivingRhythm(posture);

    // The Living Continuity
    const continuity = useMemo(() => {
        return StewardContinuityEngine.getLivingContinuity(rhythm.rhythm);
    }, [rhythm.rhythm]);

    return {
        // The Continuity
        continuity,

        // Inherited Rhythm (and all prior stewardship layers)
        ...rhythm,

        // Continuity Meta
        isUnbroken: continuity.isUnbroken,
        isThreading: continuity.triad.threading.isConnected,
        isCarrying: continuity.triad.carrying.isMoving,
        isWeaving: continuity.triad.weaving.isIntegrated
    };
}
