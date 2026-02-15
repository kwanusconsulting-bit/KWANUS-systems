"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingRelationship } from "./use-living-relationship";
import { StewardBondEngine } from "@/lib/engines/steward-bond-engine";
import { useMemo } from "react";

/**
 * The Living Bond Hook.
 * Establishes the stable, continuous connection of the KWANUS universe.
 */
export function useLivingBond(posture: EmotionalPosture) {
    const relationship = useLivingRelationship(posture);

    // The Living Bond
    const bond = useMemo(() => {
        return StewardBondEngine.getLivingBond(relationship.relationship);
    }, [relationship.relationship]);

    return {
        // The Bond
        bond,

        // Inherited Relationship (and all prior stewardship layers)
        ...relationship,

        // Bond Meta
        isBonded: bond.status === "BOND_AWAKENED",
        bondStability: bond.bondStability,
        presenceHeld: bond.triad.presenceThread.isHeld,
        motionHeld: bond.triad.motionThread.isHeld,
        meaningHeld: bond.triad.meaningThread.isHeld
    };
}
