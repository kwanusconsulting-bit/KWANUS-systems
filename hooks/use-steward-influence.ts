"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardMovement } from "./use-steward-movement";
import { StewardInfluenceEngine } from "@/lib/engines/steward-influence-engine";
import { useMemo } from "react";

/**
 * The Steward's Influence Hook (Bext Trajectory).
 * Defines how the Steward's presence, guidance, and resonance shape the universe.
 */
export function useStewardInfluence(posture: EmotionalPosture) {
    const movement = useStewardMovement(posture);

    // The Influence Spiral
    const influenceSpiral = useMemo(() => {
        return StewardInfluenceEngine.getInfluenceSpiral(posture, movement.senses, movement.trifold);
    }, [posture, movement.senses, movement.trifold]);

    // Signature Frequency
    const frequency = useMemo(() => {
        return StewardInfluenceEngine.getSignatureFrequency(influenceSpiral);
    }, [influenceSpiral]);

    return {
        // The Influence
        influenceSpiral,
        frequency,

        // Inherited Movement (The Kinetics)
        ...movement,

        // Influence Meta
        isBendingArc: influenceSpiral.guidance.isBext,
        passiveEffect: influenceSpiral.presence.gravity,
        harmonicVibe: influenceSpiral.resonance.harmonyScore
    };
}
