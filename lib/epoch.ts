// lib/epoch.ts

import { OSState } from "./himalaya";
import { getEmotionalTrend, EmotionalMemory } from "./emotionalMemory";

export interface Epoch {
    name: string;
    description: string;
    unlocks: string[];
    beginsWhen: (state: OSState, memory: EmotionalMemory) => boolean;
}

export const epochs: Epoch[] = [
    {
        name: "Era of Grounding",
        description:
            "A stabilizing era where the OS reduces surface area and focuses on emotional safety.",
        unlocks: ["minimalNavigation", "gentleCeremony"],
        beginsWhen: (state, memory) =>
            state.emotion === "worst" ||
            getEmotionalTrend(memory) === "declining",
    },

    {
        name: "Era of Steadiness",
        description:
            "A calm, neutral era where consistency builds capability.",
        unlocks: ["timelineDepth", "identityLayers"],
        beginsWhen: (state, memory) =>
            state.emotion === "neutral" &&
            getEmotionalTrend(memory) === "steady",
    },

    {
        name: "Era of Momentum",
        description:
            "A rising era where clarity and capability align. The OS BS accelerates gently.",
        unlocks: ["expandedNavigation", "deepGuidance"],
        beginsWhen: (state, memory) =>
            state.emotion === "progressing" &&
            getEmotionalTrend(memory) === "rising",
    },

    {
        name: "Era of Expansion",
        description:
            "A thriving era where the universe opens and new possibilities appear.",
        unlocks: ["fundingInsights", "creditForecasting"],
        beginsWhen: (state, memory) =>
            state.emotion === "thriving" &&
            getEmotionalTrend(memory) !== "declining",
    },

    {
        name: "Era of Ascension",
        description:
            "A rare era of cosmic alignment. The OS evolves into its highest mythic form.",
        unlocks: [
            "mythicReveals",
            "personaEvolution",
            "ceremonyAscension",
            "navigationConstellations",
            "cosmicEvents",
        ],
        beginsWhen: (state, memory) =>
            state.emotion === "thriving" &&
            getEmotionalTrend(memory) === "surging",
    },
];
