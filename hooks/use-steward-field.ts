"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardInfluence } from "./use-steward-influence";
import { StewardFieldEngine } from "@/lib/engines/steward-field-engine";
import { useMemo } from "react";

/**
 * The Steward's Field Hook.
 * Defines the energetic environment the Steward radiates into the universe.
 */
export function useStewardField(posture: EmotionalPosture) {
    const influence = useStewardInfluence(posture);

    // The Field Trifold (Inner, Relational, Environmental)
    const fieldTrifold = useMemo(() => {
        return StewardFieldEngine.getFieldTrifold(posture, influence.senses, influence.influenceSpiral);
    }, [posture, influence.senses, influence.influenceSpiral]);

    // Field Stability
    const stability = useMemo(() => {
        return StewardFieldEngine.getFieldStability(fieldTrifold);
    }, [fieldTrifold]);

    return {
        // The Field
        fieldTrifold,
        fieldStability: stability,

        // Inherited Influence (The Spiral and prior layers)
        ...influence,

        // Field Status
        isStabilized: stability > 0.9,
        isGrounded: fieldTrifold.inner.groundedness === 1.0,
        radiatingTone: fieldTrifold.environmental.tone
    };
}
