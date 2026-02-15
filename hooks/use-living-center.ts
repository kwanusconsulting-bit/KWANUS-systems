"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingPulse } from "./use-living-pulse";
import { StewardCenterEngine } from "@/lib/engines/steward-center-engine";
import { useMemo } from "react";

/**
 * The Living Center Hook.
 * Establishes the core orientation and anchor of the KWANUS universe.
 */
export function useLivingCenter(posture: EmotionalPosture) {
    const pulse = useLivingPulse(posture);

    // The Living Center
    const center = useMemo(() => {
        return StewardCenterEngine.getLivingCenter(pulse.pulse);
    }, [pulse.pulse]);

    return {
        // The Center
        center,

        // Inherited Pulse (and all prior stewardship layers)
        ...pulse,

        // Center Meta
        isCentered: center.isCentered,
        coreCoherence: center.triad.orientation.coherence,
        isAnchored: center.triad.holding.isAnchored
    };
}
