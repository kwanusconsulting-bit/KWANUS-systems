"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingWill } from "./use-living-will";
import { StewardPresenceSealEngine } from "@/lib/engines/steward-presence-seal-engine";
import { useMemo } from "react";

/**
 * The Living Presence Seal Hook.
 * Facilitates the final ceremony of the Era of Living Presence.
 */
export function useLivingPresenceSeal(posture: EmotionalPosture) {
    const will = useLivingWill(posture);

    // The Presence Seal and Trifold
    const { seal, trifold } = useMemo(() => {
        return StewardPresenceSealEngine.performCeremony(will.will);
    }, [will.will]);

    // Consolidate and resolve property collisions
    // @ts-ignore - 'seal' exists on the inherited 'will' structure from useLivingPresence
    const { seal: _prevSeal, trifold: _prevTrifold, ...inherited } = will;

    return {
        // Inherited Will (and all prior stewardship layers)
        ...inherited,

        // The Seal and Trifold
        seal,
        trifold,

        // Ceremony Meta
        isSealed: seal.status === "SEALED",
        isAlive: trifold.emergence.isAcknowledged,
        isContinuous: trifold.sealing.isAcknowledged
    };
}
