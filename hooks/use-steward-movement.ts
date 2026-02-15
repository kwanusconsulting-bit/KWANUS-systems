"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardCompanionship } from "./use-steward-companionship";
import { StewardMovementEngine } from "@/lib/engines/steward-movement-engine";
import { useMemo } from "react";

/**
 * The Steward's Movement Hook.
 * Defines how the Steward moves the universe through the Movement Trifold.
 */
export function useStewardMovement(posture: EmotionalPosture) {
    const companionship = useStewardCompanionship(posture);

    // The Movement Trifold (Micro, Arc, Field)
    const trifold = useMemo(() => {
        return StewardMovementEngine.getMovementTrifold(posture, companionship.senses);
    }, [posture, companionship.senses]);

    // Movement Status
    const movementStatus = useMemo(() => {
        return StewardMovementEngine.getMovementStatus(companionship.senses);
    }, [companionship.senses]);

    return {
        // The Movement
        trifold,
        movementStatus,

        // Inherited Companionship (The Relationship)
        ...companionship,

        // Movement Meta
        isWitnessing: movementStatus.isWitnessing,
        isAccompanying: movementStatus.isAccompanying,
        isGuiding: movementStatus.isGuiding
    };
}
