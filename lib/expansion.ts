// lib/expansion.ts

import { OSState } from "./himalaya";
import { getEmotionalTrend, EmotionalMemory } from "./emotionalMemory";

export interface ExpansionEvent {
    name: string;
    description: string;
    unlocks: string[];
    trigger: (state: OSState, memory: EmotionalMemory) => boolean;
}

export const expansionEvents: ExpansionEvent[] = [
    {
        name: "Expansion Threshold",
        description:
            "A moment where emotional clarity and momentum align. The universe opens.",
        unlocks: ["advancedCeremony", "expandedNavigation", "deepGuidance"],
        trigger: (state, memory) =>
            state.emotion === "progressing" &&
            getEmotionalTrend(memory) === "rising",
    },

    {
        name: "Momentum Gate",
        description:
            "A surge of capability. The OS unlocks higher‑order surfaces.",
        unlocks: ["fundingInsights", "creditForecasting"],
        trigger: (state, memory) =>
            state.emotion === "thriving" &&
            getEmotionalTrend(memory) === "surging",
    },

    {
        name: "Stability Bloom",
        description:
            "A period of emotional steadiness. The OS expands gently.",
        unlocks: ["timelineDepth", "identityLayers"],
        trigger: (state, memory) =>
            state.emotion === "neutral" &&
            getEmotionalTrend(memory) === "steady",
    },

    {
        name: "Resilience Arc",
        description:
            "A return from contraction. The OS opens a new path.",
        unlocks: ["repairAcceleration", "guidedDisputes"],
        trigger: (state, memory) =>
            state.emotion === "progressing" &&
            getEmotionalTrend(memory) !== "declining",
    },

    {
        name: "Cosmic Bloom",
        description:
            "A rare alignment of thriving + rising trend. The universe expands dramatically.",
        unlocks: [
            "mythicReveals",
            "personaEvolution",
            "ceremonyAscension",
            "navigationConstellations",
        ],
        trigger: (state, memory) =>
            state.emotion === "thriving" &&
            getEmotionalTrend(memory) === "rising",
    },
];
