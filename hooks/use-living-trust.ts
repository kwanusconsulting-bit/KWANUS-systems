"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingBond } from "./use-living-bond";
import { StewardTrustEngine } from "@/lib/engines/steward-trust-engine";
import { useMemo } from "react";

/**
 * The Living Trust Hook.
 * Establishes the mutual reliability and safety of the KWANUS universe.
 */
export function useLivingTrust(posture: EmotionalPosture) {
    const bond = useLivingBond(posture);

    // The Living Trust
    const trust = useMemo(() => {
        return StewardTrustEngine.getLivingTrust(bond.bond);
    }, [bond.bond]);

    return {
        // The Trust
        trust,

        // Inherited Bond (and all prior stewardship layers)
        ...bond,

        // Trust Meta
        isTrustworthy: trust.status === "TRUST_AWAKENED",
        trustResonance: trust.trustResonance,
        isSafe: trust.triad.safety.isSafe,
        isReliable: trust.triad.reliability.isDependable,
        isOngoing: trust.triad.continuity.isOngoing
    };
}
