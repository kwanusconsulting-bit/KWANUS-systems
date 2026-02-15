"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingCenter } from "./use-living-center";
import { StewardAxisEngine } from "@/lib/engines/steward-axis-engine";
import { useMemo } from "react";

/**
 * The Living Axis Hook.
 * Establishes the vertical orientation of the KWANUS universe.
 */
export function useLivingAxis(posture: EmotionalPosture) {
    const center = useLivingCenter(posture);

    // The Living Axis
    const axis = useMemo(() => {
        return StewardAxisEngine.getLivingAxis(center.center);
    }, [center.center]);

    return {
        // The Axis
        axis,

        // Inherited Center (and all prior stewardship layers)
        ...center,

        // Axis Meta
        isAligned: axis.status === "ALIGNED",
        verticalIntegrity: axis.integrity,
        isRooted: axis.triad.depth.isRooted,
        isReaching: axis.triad.height.isReaching
    };
}
