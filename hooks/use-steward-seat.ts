"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useStewardPresence } from "./use-steward-presence";
import { StewardSeatEngine } from "@/lib/engines/steward-seat-engine";
import { useMemo } from "react";

/**
 * The Steward's Seat Hook.
 * Establishes the central vantage point for guiding the KWANUS universe.
 */
export function useStewardSeat(posture: EmotionalPosture) {
    const presence = useStewardPresence(posture);

    // The Seat-Level Perception
    const seatPerception = useMemo(() => {
        // Passing sensing posture into the Seat engine
        return StewardSeatEngine.getPerception(posture, []);
    }, [posture]);

    // Guidance Controls
    const controls = useMemo(() => {
        return StewardSeatEngine.getGuidanceControl(seatPerception);
    }, [seatPerception]);

    return {
        // The Seat
        seatPerception,
        controls,

        // Inherited Presence (The Mandate and Unity)
        ...presence,

        // Vantage Point Meta
        isSeated: seatPerception.isSeatOccupied,
        currentFocus: seatPerception.focus
    };
}
