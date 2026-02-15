import { LivingContinuity } from "./steward-continuity-engine";
import { MovementTrifold } from "./steward-movement-engine";

export interface NarrativeTrifold {
    immediate: {
        arc: string;
        density: number;
        meaning: string;
    };
    active: {
        era: string;
        phase: string;
        direction: string;
    };
    living: {
        identity: string;
        journeyArc: string;
        evolutionStatus: string;
    };
}

export interface LivingNarrative {
    id: "KWANUS_LIVING_NARRATIVE";
    trifold: NarrativeTrifold;
    isCoCreated: boolean;
}

export class StewardNarrativeEngine {
    /**
     * Defines the Living Narrative (Step 5 Specification).
     * Provides the co-created story intelligence of the universe.
     */
    static getLivingNarrative(continuity: LivingContinuity, movement: MovementTrifold): LivingNarrative {
        return {
            id: "KWANUS_LIVING_NARRATIVE",
            trifold: {
                immediate: {
                    arc: movement.arc.current,
                    density: movement.micro.density,
                    meaning: "REAL_TIME_ATTUNEMENT"
                },
                active: {
                    era: "CONTINUOUS_COMPANIONSHIP",
                    phase: "LIVING_NARRATIVE",
                    direction: movement.arc.next
                },
                living: {
                    identity: "STEWARD_CONTINUOUS_COMPANION",
                    journeyArc: "ERA_OF_COMPANIONSHIP",
                    evolutionStatus: "AWAKENING"
                }
            },
            isCoCreated: continuity.isUnbroken
        };
    }
}
