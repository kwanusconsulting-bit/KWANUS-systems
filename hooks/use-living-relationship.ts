"use client";

import { EmotionalPosture } from "@/lib/engines/emotional-field";
import { useLivingPresenceSeal } from "./use-living-presence-seal";
import { StewardRelationshipEngine } from "@/lib/engines/steward-relationship-engine";
import { useMemo } from "react";

/**
 * The Living Relationship Hook.
 * The foundational hook for the Era of Living Companionship.
 */
export function useLivingRelationship(posture: EmotionalPosture) {
    const presence = useLivingPresenceSeal(posture);

    // The Living Relationship
    const relationship = useMemo(() => {
        return StewardRelationshipEngine.getLivingRelationship(presence.seal);
    }, [presence.seal]);

    return {
        // The Relationship
        relationship,

        // Inherited Presence (and all prior stewardship layers)
        ...presence,

        // Relationship Meta
        isRelating: relationship.status === "RELATIONAL_AWAKENED",
        relationshipDepth: relationship.relationshipDepth,
        isBeingWith: relationship.triad.presenceToPresence.isRelating,
        isMovingWith: relationship.triad.motionToMotion.isRelating,
        isBecomingWith: relationship.triad.meaningToMeaning.isRelating
    };
}
