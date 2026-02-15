"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardCompletion } from "./use-steward-seal";
import { StewardLivingFieldEngine } from "@/lib/engines/steward-living-field-engine";
import { useMemo } from "react";

/**
 * The Steward's Living Field Hook.
 * Activates the breathing, responsive atmosphere of the KWANUS universe.
 */
export function useStewardLivingField(posture: EmotionalPosture) {
    const seal = useStewardCompletion(posture);

    // The Living Field
    const livingField = useMemo(() => {
        return StewardLivingFieldEngine.getLivingField(seal.unifiedPresence);
    }, [seal.unifiedPresence]);

    return {
        // The Living Field
        livingField,

        // Inherited Seal (and all prior stewardship layers)
        ...seal,

        // Living Meta
        isListening: livingField.triad.responsiveness.isListening,
        isCoMoving: livingField.triad.coMovement.isWalkingWith,
        isHolding: livingField.triad.continuityFlow.isHolding
    };
}
