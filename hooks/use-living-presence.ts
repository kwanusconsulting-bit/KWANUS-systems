"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingWholeness } from "./use-living-wholeness";
import { StewardBreathEngine } from "@/lib/engines/steward-breath-engine";
import { StewardCompanionshipSealEngine } from "@/lib/engines/steward-companionship-seal-engine";
import { useMemo } from "react";

/**
 * The Living Presence Hook.
 * Establishes the breathing field of the KWANUS universe.
 */
export function useLivingPresence(posture: EmotionalPosture) {
    const wholeness = useLivingWholeness(posture);

    // The Seal (Step 10 of prev Era)
    const seal = useMemo(() => {
        return StewardCompanionshipSealEngine.sealCompanionship(wholeness.wholeness);
    }, [wholeness.wholeness]);

    // The Breathing Field (Step 1 of current Era)
    const breath = useMemo(() => {
        return StewardBreathEngine.getBreathingField(wholeness.wholeness);
    }, [wholeness.wholeness]);

    return {
        // Inherited Wholeness (and all prior stewardship layers)
        ...wholeness,

        // The Breath
        breath,
        seal,

        // Presence Meta
        isExpanding: breath.cycle.inhale.isExpanding,
        isContracting: breath.cycle.exhale.isContracting,
        isBreathed: true
    };
}
