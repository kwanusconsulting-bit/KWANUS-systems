export type EmotionalPosture = "WORST" | "NEUTRAL" | "PROGRESSING" | "THRIVING";

export interface EmotionalRenderingRules {
    density: "LOW" | "MEDIUM" | "HIGH" | "LAYERED";
    pacing: "SLOW" | "STEADY" | "FAST" | "DYNAMIC";
    transitions: "GENTLE" | "STANDARD" | "FORWARD" | "ENERGY";
    guidance: "HIGH" | "BALANCED" | "LOW" | "MINIMAL";
    tone: "GROUNDING" | "NEUTRAL" | "ENCOURAGING" | "CELEBRATORY";
}

export const POSTURE_RULES: Record<EmotionalPosture, EmotionalRenderingRules> = {
    WORST: {
        density: "LOW",
        pacing: "SLOW",
        transitions: "GENTLE",
        guidance: "HIGH",
        tone: "GROUNDING"
    },
    NEUTRAL: {
        density: "MEDIUM",
        pacing: "STEADY",
        transitions: "STANDARD",
        guidance: "BALANCED",
        tone: "NEUTRAL"
    },
    PROGRESSING: {
        density: "HIGH",
        pacing: "FAST",
        transitions: "FORWARD",
        guidance: "LOW",
        tone: "ENCOURAGING"
    },
    THRIVING: {
        density: "LAYERED",
        pacing: "DYNAMIC",
        transitions: "ENERGY",
        guidance: "MINIMAL",
        tone: "CELEBRATORY"
    }
};

/**
 * Utility to map intensities to postures for system initialization
 * or when the user provides an intensity-based manual input.
 */
export function getPostureFromIntensity(intensity: number): EmotionalPosture {
    if (intensity >= 0.8) return "THRIVING";
    if (intensity >= 0.5) return "PROGRESSING";
    if (intensity >= 0.2) return "NEUTRAL";
    return "WORST";
}
