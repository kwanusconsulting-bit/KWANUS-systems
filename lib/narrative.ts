// lib/narrative.ts

import { OSState } from "./himalaya";
import { getEmotionalTrend, EmotionalMemory } from "./emotionalMemory";

export interface NarrativeBeat {
    title: string;
    description: string;
    trigger: (state: OSState, memory: EmotionalMemory) => boolean;
    chapterShift: boolean;
}

export const narrativeBeats: NarrativeBeat[] = [
    {
        title: "Crossing the Threshold",
        description:
            "You’ve moved from hesitation into motion. A new chapter begins.",
        trigger: (state, memory) =>
            state.emotion === "progressing" &&
            getEmotionalTrend(memory) === "rising",
        chapterShift: true,
    },

    {
        title: "The Quiet Middle",
        description:
            "You’re steady. This is the part of the story where consistency builds power.",
        trigger: (state, memory) =>
            state.emotion === "neutral" &&
            getEmotionalTrend(memory) === "steady",
        chapterShift: false,
    },

    {
        title: "The Descent",
        description:
            "A moment of contraction. The OS protects you by reducing surface area.",
        trigger: (state, memory) =>
            state.emotion === "worst" ||
            getEmotionalTrend(memory) === "declining",
        chapterShift: false,
    },

    {
        title: "The Ascent",
        description:
            "Momentum is returning. You’re rising into clarity and capability.",
        trigger: (state, memory) =>
            state.emotion === "progressing" &&
            getEmotionalTrend(memory) !== "declining",
        chapterShift: false,
    },

    {
        title: "The Expansion",
        description:
            "You’re thriving. The universe opens. New possibilities appear.",
        trigger: (state, memory) =>
            state.emotion === "thriving" &&
            getEmotionalTrend(memory) === "surging",
        chapterShift: true,
    },
];
