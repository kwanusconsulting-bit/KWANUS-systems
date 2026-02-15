// lib/universe.ts

import { OSState } from "./himalaya";
import { getEmotionalTrend, EmotionalMemory } from "./emotionalMemory";
import { epochs } from "./epoch";
import { cosmicEvents } from "./cosmicEvents";
import { narrativeBeats } from "./narrative";

export interface UniverseState {
    era: string;
    phase: "birth" | "growth" | "stability" | "flux" | "ascension";
    density: "light" | "medium" | "heavy";
    alignment: string[];
    activeForces: string[];
}

export function generateUniverse(state: OSState, memory: EmotionalMemory): UniverseState {
    const trend = getEmotionalTrend(memory);

    // Determine phase
    let phase: UniverseState["phase"] = "stability";

    if (state.emotion === "worst") phase = "birth";
    if (state.emotion === "neutral") phase = "stability";
    if (state.emotion === "progressing") phase = "growth";
    if (state.emotion === "thriving" && trend === "rising") phase = "flux";
    if (state.emotion === "thriving" && trend === "surging") phase = "ascension";

    // Determine density
    const density =
        state.emotion === "worst"
            ? "heavy"
            : state.emotion === "neutral"
                ? "medium"
                : "light";

    // Determine era
    const activeEpoch = epochs.find((e) => e.beginsWhen(state, memory));
    const era = activeEpoch?.name ?? "Era of Unknowing";

    // Determine alignments
    const activeCosmic = cosmicEvents
        .filter((e) => e.trigger(state, memory))
        .map((e) => e.name);

    const activeNarrative = narrativeBeats
        .filter((b) => b.trigger(state, memory))
        .map((b) => b.title);

    const alignment = [...activeCosmic, ...activeNarrative];

    // Determine active forces
    const activeForces = [
        trend === "rising" && "Momentum",
        trend === "surging" && "Ascension",
        trend === "declining" && "Gravity",
        state.emotion === "worst" && "Protection",
        state.emotion === "thriving" && "Expansion",
    ].filter(Boolean) as string[];

    return {
        era,
        phase,
        density,
        alignment,
        activeForces,
    };
}
