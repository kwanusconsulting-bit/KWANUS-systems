// lib/destiny.ts

import { OSState } from "./himalaya";
import { getEmotionalTrend, EmotionalMemory } from "./emotionalMemory";
import { generateUniverse } from "./universe";

export interface DestinyTrajectory {
    arc: string;
    description: string;
    momentum: "low" | "medium" | "high";
    inevitability: "weak" | "forming" | "strong";
    forces: string[];
}

export function generateDestiny(state: OSState, memory: EmotionalMemory): DestinyTrajectory {
    const trend = getEmotionalTrend(memory);
    const universe = generateUniverse(state, memory);

    // Determine arc
    let arc = "Unresolved Arc";
    if (universe.phase === "birth") arc = "Stabilization Arc";
    if (universe.phase === "growth") arc = "Momentum Arc";
    if (universe.phase === "flux") arc = "Transformation Arc";
    if (universe.phase === "ascension") arc = "Ascension Arc";

    // Determine momentum
    const momentum =
        trend === "declining"
            ? "low"
            : trend === "steady"
                ? "medium"
                : "high";

    // Determine inevitability
    const inevitability =
        universe.phase === "ascension"
            ? "strong"
            : universe.phase === "flux"
                ? "forming"
                : "weak";

    // Forces come from universe kernel
    const forces = universe.activeForces;

    return {
        arc,
        description:
            arc === "Stabilization Arc"
                ? "You are in a phase of grounding and protection."
                : arc === "Momentum Arc"
                    ? "You are building capability and forward motion."
                    : arc === "Transformation Arc"
                        ? "You are shifting into a new form of clarity and identity."
                        : arc === "Ascension Arc"
                            ? "You are entering a rare era of expansion and mythic alignment."
                            : "Your arc is forming.",
        momentum,
        inevitability,
        forces,
    };
}
