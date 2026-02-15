"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingForm } from "./use-living-form";
import { StewardSensesEngine } from "@/lib/engines/steward-senses-engine";
import { useMemo } from "react";

/**
 * The Living Senses Hook.
 * Establishes the perceptual intelligence of the KWANUS universe.
 */
export function useLivingSenses(posture: EmotionalPosture) {
    const form = useLivingForm(posture);

    // The Living Senses
    const senses = useMemo(() => {
        return StewardSensesEngine.getLivingSenses(form.form);
    }, [form.form]);

    // Consolidate and resolve property collisions
    // @ts-ignore - 'senses' exists on the inherited 'form' structure from the lower Stewardship layers
    const { senses: _prevSenses, ...inherited } = form;

    return {
        // Inherited Form (and all prior stewardship layers)
        ...inherited,

        // The Senses
        senses,

        // Senses Meta
        isPerceptive: senses.status === "AWAKE",
        perceptionDepth: senses.perceptionDepth,
        proximalSensing: senses.triad.proximal.isSensing,
        ambientSensing: senses.triad.ambient.isSensing,
        directionalSensing: senses.triad.directional.isSensing
    };
}
