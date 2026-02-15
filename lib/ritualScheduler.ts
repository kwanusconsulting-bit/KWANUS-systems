// lib/ritualScheduler.ts

import { OSState } from "./himalaya";
import { getEmotionalTrend, EmotionalMemory } from "./emotionalMemory";
import { cosmicEvents } from "./cosmicEvents";
import { narrativeBeats } from "./narrative";
import { epochs } from "./epoch";

export interface RitualMoment {
    name: string;
    description: string;
    shouldTrigger: boolean;
    reason: string;
}

export function getRitualMoments(state: OSState, memory: EmotionalMemory): RitualMoment[] {
    const trend = getEmotionalTrend(memory);

    const moments: RitualMoment[] = [];

    // 1. Ceremony Opening
    moments.push({
        name: "Ceremony Opening",
        description: "A moment where the OS invites the user into a guided flow.",
        shouldTrigger:
            state.emotion === "progressing" ||
            (trend === "rising" && state.emotion !== "worst"),
        reason:
            trend === "rising"
                ? "Emotional momentum detected."
                : "User is in a forward-moving state.",
    });

    // 2. Ceremony Closing
    moments.push({
        name: "Ceremony Closing",
        description: "A moment where the OS gently concludes a ritual.",
        shouldTrigger:
            state.emotion === "neutral" && trend === "steady",
        reason: "Emotional stabilization detected.",
    });

    // 3. Expansion Window
    moments.push({
        name: "Expansion Window",
        description: "A moment where the universe opens and new surfaces appear.",
        shouldTrigger:
            state.emotion === "thriving" &&
            (trend === "rising" || trend === "surging"),
        reason: "High capability + upward trend.",
    });

    // 4. Protection Window
    moments.push({
        name: "Protection Window",
        description: "A moment where the OS collapses surface area to protect the user.",
        shouldTrigger:
            state.emotion === "worst" || trend === "declining",
        reason: "Emotional contraction detected.",
    });

    // 5. Narrative Sync
    const activeBeat = narrativeBeats.find((b) => b.trigger(state, memory));
    moments.push({
        name: "Narrative Sync",
        description: "A moment where the OS aligns story and state.",
        shouldTrigger: Boolean(activeBeat),
        reason: activeBeat
            ? `Narrative beat active: ${activeBeat.title}`
            : "No active narrative beat.",
    });

    // 6. Cosmic Sync
    const activeCosmic = cosmicEvents.find((e) => e.trigger(state, memory));
    moments.push({
        name: "Cosmic Sync",
        description: "A moment where cosmic events align with emotional state.",
        shouldTrigger: Boolean(activeCosmic),
        reason: activeCosmic
            ? `Cosmic event active: ${activeCosmic.name}`
            : "No cosmic alignment.",
    });

    // 7. Epoch Shift
    const activeEpoch = epochs.find((e) => e.beginsWhen(state, memory));
    moments.push({
        name: "Epoch Shift",
        description: "A moment where the OS transitions into a new era.",
        shouldTrigger: Boolean(activeEpoch),
        reason: activeEpoch
            ? `Epoch active: ${activeEpoch.name}`
            : "No epoch transition.",
    });

    return moments;
}
