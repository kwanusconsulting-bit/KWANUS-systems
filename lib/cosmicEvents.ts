// lib/cosmicEvents.ts

import { OSState } from "./himalaya";
import { getEmotionalTrend, EmotionalMemory } from "./emotionalMemory";

export interface CosmicEvent {
    name: string;
    description: string;
    trigger: (state: OSState, memory: EmotionalMemory) => boolean;
    effect: string;
}

export const cosmicEvents: CosmicEvent[] = [
    {
        name: "Emotional Dawn",
        description: "A subtle rise in emotional clarity triggers a soft expansion.",
        trigger: (_state, memory) => getEmotionalTrend(memory) === "rising",
        effect: "Expand surface area slightly and warm the gradients.",
    },

    {
        name: "Ceremonial Threshold",
        description: "A moment where the user is ready for a deeper step.",
        trigger: (state, memory) =>
            state.emotion === "progressing" && getEmotionalTrend(memory) === "surging",
        effect: "Unlock a new ceremony step or reveal a hidden insight.",
    },

    {
        name: "Gravity Shift",
        description: "A contraction moment where the OS protects the user.",
        trigger: (state, memory) =>
            state.emotion === "worst" || getEmotionalTrend(memory) === "declining",
        effect: "Collapse surface area and reduce cognitive load.",
    },

    {
        name: "Mythic Reveal",
        description: "A moment where the OS reveals a cosmic law.",
        trigger: (state, memory) =>
            state.emotion === "thriving" && getEmotionalTrend(memory) !== "declining",
        effect: "Reveal one mythic law in the UI.",
    },

    {
        name: "Steward Alignment",
        description: "A moment where the OS synchronizes persona and pacing.",
        trigger: (_state, _memory) => true,
        effect: "Align persona, tone, and pacing for coherence.",
    },
];
