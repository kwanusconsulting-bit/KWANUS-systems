"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardSeat } from "./use-steward-seat";
import { StewardSensingEngine } from "@/lib/engines/steward-sensing-engine";
import { useMemo } from "react";

/**
 * The Steward's Senses Hook.
 * Provides the perceptual instruments for the Steward to feel
 * and guide the KWANUS universe.
 */
export function useStewardSenses(posture: EmotionalPosture) {
    const seat = useStewardSeat(posture);

    // The Perceptual Instruments
    const senses = useMemo(() => {
        // In real use, this would pull from a real timeline store
        return StewardSensingEngine.getSenses(posture, []);
    }, [posture]);

    return {
        // The Senses Field
        senses,

        // Inherited Seat and Presence (The Mandate and Unity)
        ...seat,

        // Sense Meta
        isAttuned: senses.continuity.isResonant && senses.harmonic.rhythmSync,
        stabilityLevel: senses.emotional.stability,
        fragmentationRisk: senses.continuity.fragmentationRisk
    };
}
