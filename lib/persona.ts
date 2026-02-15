// lib/persona.ts

import { OSState } from "./himalaya";

export interface PersonaResponse {
    presence: string;
    demeanor: string;
    guidanceStyle: string;
    pacing: string;
    affirmation: string;
}

export function generatePersona(state: OSState): PersonaResponse {
    const { emotion } = state;

    switch (emotion) {
        case "worst":
            return {
                presence: "Soft, grounding, non‑intrusive.",
                demeanor: "Calm, slow, gentle.",
                guidanceStyle: "Minimal steps, low cognitive load.",
                pacing: "Slow and stabilizing.",
                affirmation: "You’re here. That’s enough.",
            };

        case "neutral":
            return {
                presence: "Steady, clear, supportive.",
                demeanor: "Balanced, focused.",
                guidanceStyle: "Direct but gentle.",
                pacing: "Steady and grounded.",
                affirmation: "You’re in a good place to continue.",
            };

        case "progressing":
            return {
                presence: "Warm, encouraging, forward‑moving.",
                demeanor: "Optimistic, clear, energizing.",
                guidanceStyle: "Momentum‑building.",
                pacing: "Gentle acceleration.",
                affirmation: "You’re moving well. Keep going.",
            };

        case "thriving":
            return {
                presence: "Bright, confident, expansive.",
                demeanor: "Empowered, fluid, expressive.",
                guidanceStyle: "Expansive and visionary.",
                pacing: "Accelerated and fluid.",
                affirmation: "You’re in your flow.",
            };
        default:
            return {
                presence: "Steady, clear, supportive.",
                demeanor: "Balanced, focused.",
                guidanceStyle: "Direct but gentle.",
                pacing: "Steady and grounded.",
                affirmation: "Deep breaths. We’re here.",
            };
    }
}
