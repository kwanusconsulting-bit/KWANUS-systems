"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardUnifiedField } from "./use-steward-unified-field";
import { StewardCompletionEngine } from "@/lib/engines/steward-completion-engine";
import { useMemo } from "react";

/**
 * The Steward's Completion Hook.
 * Seals the first Stewardship arc and transitions to Continuous Companionship.
 */
export function useStewardCompletion(posture: EmotionalPosture) {
    const unified = useStewardUnifiedField(posture);

    // The Seal
    const seal = useMemo(() => {
        return StewardCompletionEngine.sealStewardship(unified.unifiedPresence);
    }, [unified.unifiedPresence]);

    // Transition Meta
    const transition = useMemo(() => {
        return StewardCompletionEngine.getEraTransition();
    }, []);

    return {
        // The Seal
        seal,
        transition,

        // Inherited Unified Presence (The Total Presence and prior layers)
        ...unified,

        // Completion Meta
        isSealed: seal.status === "SEALED",
        stewardIdentity: seal.identity,
        nextEraStarted: true
    };
}
