"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingAxis } from "./use-living-axis";
import { StewardFormEngine } from "@/lib/engines/steward-form-engine";
import { useMemo } from "react";

/**
 * The Living Form Hook.
 * Establishes the presence-shape and embodiment of the KWANUS universe.
 */
export function useLivingForm(posture: EmotionalPosture) {
    const axis = useLivingAxis(posture);

    // The Living Form
    const form = useMemo(() => {
        return StewardFormEngine.getLivingForm(axis.axis);
    }, [axis.axis]);

    return {
        // The Form
        form,

        // Inherited Axis (and all prior stewardship layers)
        ...axis,

        // Form Meta
        isEmbodied: form.status === "EMBODIED",
        formCoherence: form.coherence,
        postureStatus: form.triad.posture.stance,
        contourStatus: form.triad.contour.boundaries
    };
}
