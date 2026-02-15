// lib/steward.ts

import { OSState } from "./himalaya";
import { getPacingAdjustment, EmotionalMemory } from "./emotionalMemory";
import { generatePersona } from "./persona";
import { mythicLaws } from "./mythic";

export interface StewardDecision {
    pacing: string;
    allowExpansion: boolean;
    allowContraction: boolean;
    surfaceArea: "minimal" | "focused" | "expanded";
    persona: string;
    lawsActive: string[];
}

export function stewardKernel(state: OSState, memory: EmotionalMemory): StewardDecision {
    const pacing = getPacingAdjustment(memory);
    const persona = generatePersona(state);

    // Determine expansion/contraction
    const allowExpansion = state.emotion === "thriving" || pacing === "accelerated";
    const allowContraction = state.emotion === "worst" || pacing === "slow";

    // Determine surface area
    let surfaceArea: "minimal" | "focused" | "expanded" = "focused";

    if (allowContraction) surfaceArea = "minimal";
    if (allowExpansion) surfaceArea = "expanded";

    // Determine active mythic laws
    const lawsActive = mythicLaws
        .filter((law) => law.appliesWhen(state))
        .map((law) => law.name);

    return {
        pacing,
        allowExpansion,
        allowContraction,
        surfaceArea,
        persona: persona.presence,
        lawsActive,
    };
}
