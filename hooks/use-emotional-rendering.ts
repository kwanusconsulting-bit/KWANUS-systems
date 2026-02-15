"use client";

import { EmotionalPosture, POSTURE_RULES, EmotionalRenderingRules } from "@/lib/engines/emotional-field";
import { useEffect, useState } from "react";

/**
 * Hook to provide system-level rendering rules based on the global emotional posture.
 * This is the central mechanism for adaptive UI across the entire OS.
 */
export function useEmotionalRendering(posture: EmotionalPosture = "NEUTRAL"): EmotionalRenderingRules {
    const [rules, setRules] = useState<EmotionalRenderingRules>(POSTURE_RULES[posture]);

    useEffect(() => {
        setRules(POSTURE_RULES[posture]);
    }, [posture]);

    return rules;
}

/**
 * Helper to get CSS animation classes based on Transitions rule
 */
export function getTransitionClass(transition: EmotionalRenderingRules["transitions"]): string {
    switch (transition) {
        case "GENTLE": return "animate-fade-in-slow";
        case "STANDARD": return "animate-fade-in";
        case "FORWARD": return "animate-slide-up-momentum";
        case "ENERGY": return "animate-scale-in-dynamic";
        default: return "animate-fade-in";
    }
}
