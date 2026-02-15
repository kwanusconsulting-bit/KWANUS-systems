"use client";

import { useSystemSynthesis } from "./use-system-synthesis";
import { UnityEngine } from "@/lib/engines/unity-engine";
import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useMemo } from "react";

/**
 * The Ultimate Unity Hook for the KWANUS OS.
 * Collapses all prior layers (Timeline, Emotion, Navigation, Continuity, Coherence, Harmony, Synthesis)
 * into a single indivisible field of being.
 */
export function useSystemUnity(posture: EmotionalPosture) {
    const synthesis = useSystemSynthesis(posture);

    // The Unity Field (The Oneness of the OS)
    const unityStatus = useMemo(() => UnityEngine.getUnityField(posture), [posture]);

    // The Indivisible Status
    const unifiedField = useMemo(() => UnityEngine.getUnifiedField(posture), [posture]);

    return {
        // The Indivisible Oneness
        unityStatus,
        unifiedField,

        // Inherited Synthesis (The Mind of the OS)
        ...synthesis,

        // Unity Rules
        isIndivisible: unityStatus.indivisible && unityStatus.oneness,
        isSeamless: unityStatus.seamless,
        totalPresence: true
    };
}
