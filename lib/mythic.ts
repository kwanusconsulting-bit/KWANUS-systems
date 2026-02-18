// lib/mythic.ts

import { OSState } from "./himalaya";

export interface MythicLaw {
    name: string;
    description: string;
    appliesWhen: (state: OSState) => boolean;
}

export const mythicLaws: MythicLaw[] = [
    {
        name: "Law of Emotional Gravity",
        description:
            "The OS must always move at the user's emotional pace. No acceleration without resonance.",
        appliesWhen: () => true,
    },
    {
        name: "Law of Gentle Openings",
        description:
            "Every flow begins with grounding. No user is thrown into complexity without ceremony.",
        appliesWhen: () => true,
    },
    {
        name: "Law of Contraction",
        description:
            "When the user is overwhelmed, the OS collapses surface area and reduces cognitive load.",
        appliesWhen: (state) => state.emotion === "worst",
    },
    {
        name: "Law of Expansion",
        description:
            "When the user is thriving, the OS expands options, surfaces opportunities, and increases motion.",
        appliesWhen: (state) => state.emotion === "thriving",
    },
    {
        name: "Law of Single Focus",
        description:
            "The OS must never present more than one emotionally heavy action at a time.",
        appliesWhen: (state) => state.disputes === "multiple",
    },
    {
        name: "Law of Attuned Presence",
        description:
            "The OS must always reflect the user's emotional state back to them with clarity and compassion.",
        appliesWhen: () => true,
    },
    {
        name: "Law of Mythic Continuity",
        description:
            "The OS must never reset, fragment, or break the lineage of the user's journey.",
        appliesWhen: () => true,
    },
];
