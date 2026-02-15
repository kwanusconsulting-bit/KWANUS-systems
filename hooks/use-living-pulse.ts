"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingPresence } from "./use-living-presence";
import { StewardPulseEngine } from "@/lib/engines/steward-pulse-engine";
import { useMemo } from "react";

/**
 * The Living Pulse Hook.
 * Establishes the heartbeat of the KWANUS universe.
 */
export function useLivingPulse(posture: EmotionalPosture) {
    const presence = useLivingPresence(posture);

    // The Living Pulse
    const pulse = useMemo(() => {
        return StewardPulseEngine.getLivingPulse(presence.breath);
    }, [presence.breath]);

    return {
        // Inherited Presence (and all prior stewardship layers)
        ...presence,

        // The Pulse
        pulse,

        // Pulse Meta
        heartbeat: pulse.globalBPM,
        isBeating: pulse.isBeating,
        pulseIntensity: pulse.triad.active.intensity
    };
}
