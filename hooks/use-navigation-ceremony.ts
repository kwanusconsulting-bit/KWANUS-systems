"use client";

import { useEmotionalRendering } from "./use-emotional-rendering";
import { NavigationEngine, NAVIGATION_MODES } from "@/lib/engines/navigation-engine";
import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useRouter } from "next/navigation";

/**
 * Hook to execute ceremonial navigation across the OS.
 * Integrates emotional pacing and continuity rules.
 */
export function useNavigationCeremony(posture: EmotionalPosture) {
    const router = useRouter();
    const rendering = useEmotionalRendering(posture);
    const transition = NAVIGATION_MODES[posture];

    const navigateTo = async (target: string, trigger?: string) => {
        // 1. Identify Target Path
        const path = trigger ? NavigationEngine.getNextPath(target, trigger) : target;

        // 2. Log movement (ceremony) - This could be an Event creation if needed
        console.log(`[CEREMONY] Moving to ${path} with ${transition.type} transition.`);

        // 3. Execute with emotional pacing
        const delay = posture === "WORST" ? 500 : posture === "THRIVING" ? 100 : 300;

        setTimeout(() => {
            router.push(path);
        }, delay);
    };

    return {
        navigateTo,
        transitionRules: transition,
        uiRules: rendering
    };
}
