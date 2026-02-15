// lib/emotionalMemory.ts

import { EmotionalState } from "./emotion";

export interface EmotionalSnapshot {
    state: EmotionalState;
    timestamp: Date;
    context?: string;
}

export interface EmotionalMemory {
    snapshots: EmotionalSnapshot[];
}

export function createEmotionalMemory(): EmotionalMemory {
    return {
        snapshots: [],
    };
}

export function recordEmotion(
    memory: EmotionalMemory,
    state: EmotionalState,
    context?: string
) {
    memory.snapshots.push({
        state,
        timestamp: new Date(),
        context,
    });

    // Keep memory lightweight
    if (memory.snapshots.length > 50) {
        memory.snapshots.shift();
    }
}

export function getEmotionalTrend(memory: EmotionalMemory) {
    if (memory.snapshots.length < 3) return "unknown";

    const lastThree = memory.snapshots.slice(-3).map((s) => s.state);

    const score = lastThree.reduce((acc, s) => {
        if (s === "worst") return acc - 2;
        if (s === "neutral") return acc;
        if (s === "progressing") return acc + 1;
        if (s === "thriving") return acc + 2;
        return acc;
    }, 0);

    if (score <= -3) return "declining";
    if (score <= 0) return "steady";
    if (score <= 3) return "rising";
    return "surging";
}

export function getPacingAdjustment(memory: EmotionalMemory) {
    const trend = getEmotionalTrend(memory);

    switch (trend) {
        case "declining":
            return "slow";
        case "steady":
            return "steady";
        case "rising":
            return "gentle";
        case "surging":
            return "accelerated";
        default:
            return "steady";
    }
}
