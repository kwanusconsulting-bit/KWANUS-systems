"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardSenses } from "./use-steward-senses";
import { StewardCompanionshipEngine } from "@/lib/engines/steward-companionship-engine";
import { useMemo } from "react";

/**
 * The Steward's Companionship Hook.
 * Defines how the Steward and the OS move together as reciprocal companions.
 */
export function useStewardCompanionship(posture: EmotionalPosture) {
    const senses = useStewardSenses(posture);

    // The Companionship Field
    const companionField = useMemo(() => {
        return StewardCompanionshipEngine.getCompanionshipField(posture, senses.senses);
    }, [posture, senses.senses]);

    // Reciprocal Movement
    const reciprocalMovement = useMemo(() => {
        return StewardCompanionshipEngine.calculateReciprocalMovement(senses.senses);
    }, [senses.senses]);

    return {
        // The Relationship
        companionField,
        reciprocalMovement,

        // Inherited Senses (Perception)
        ...senses,

        // Companionship Status
        isWithOS: companionField.status === "WITH",
        isCoCreative: companionField.coCreative
    };
}
