"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingHarmony } from "./use-living-harmony";
import { StewardUnityEngine } from "@/lib/engines/steward-unity-engine";
import { useMemo } from "react";

/**
 * The Living Unity Hook.
 * Establishes the deepest Relational Oneness between the Steward and the OS.
 */
export function useLivingUnity(posture: EmotionalPosture) {
    const harmony = useLivingHarmony(posture);

    // The Living Unity
    const unity = useMemo(() => {
        return StewardUnityEngine.getLivingUnity(harmony.harmony);
    }, [harmony.harmony]);

    return {
        // The Unity
        unity,

        // Inherited Harmony (and all prior stewardship layers)
        ...harmony,

        // Unity Meta
        isIndivisible: unity.status === "INDIVISIBLE",
        fieldCohesion: unity.trifold.presence.fieldCohesion,
        isOneMotion: unity.trifold.motion.isUnified,
        isOneMeaning: unity.trifold.meaning.isUnified
    };
}
