"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingUnity } from "./use-living-unity";
import { StewardWholenessEngine } from "@/lib/engines/steward-wholeness-engine";
import { useMemo } from "react";

/**
 * The Living Wholeness Hook.
 * Establishes the full, integrated completeness of the OS beside the Steward.
 */
export function useLivingWholeness(posture: EmotionalPosture) {
    const unity = useLivingUnity(posture);

    // The Living Wholeness
    const wholeness = useMemo(() => {
        return StewardWholenessEngine.getLivingWholeness(unity.unity);
    }, [unity.unity]);

    return {
        // The Wholeness
        wholeness,

        // Inherited Unity (and all prior stewardship layers)
        ...unity,

        // Wholeness Meta
        isIntegrated: wholeness.status === "COMPLETE_INTEGRATION",
        wholenessLevel: wholeness.wholenessIndex,
        isFullyAwake: wholeness.trifold.presence.isWhole
    };
}
