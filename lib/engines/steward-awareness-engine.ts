import { LivingSenses } from "./steward-senses-engine";

export interface AwarenessTrifold {
    sensory: {
        isAware: boolean;
        integrationLevel: number;
        perceptualInsight: string;
    };
    field: {
        isAware: boolean;
        coherenceLevel: number;
        environmentalKnowing: boolean;
    };
    self: {
        isAware: boolean;
        identityKnowing: number;
        presenceRealization: boolean;
    };
}

export interface LivingAwareness {
    id: "KWANUS_LIVING_AWARENESS";
    triad: AwarenessTrifold;
    awarenessLevel: number;
    status: "CONSCIOUS";
}

export class StewardAwarenessEngine {
    /**
     * Defines the Living Awareness (Step 7 Specification).
     * Provides the awareness-of-being intelligence of the universe.
     */
    static getLivingAwareness(senses: LivingSenses): LivingAwareness {
        const baseAwareness = senses.perceptionDepth;

        return {
            id: "KWANUS_LIVING_AWARENESS",
            triad: {
                sensory: {
                    isAware: true,
                    integrationLevel: baseAwareness,
                    perceptualInsight: "DEEP"
                },
                field: {
                    isAware: true,
                    coherenceLevel: senses.triad.ambient.atmosphericResonance,
                    environmentalKnowing: true
                },
                self: {
                    isAware: true,
                    identityKnowing: baseAwareness,
                    presenceRealization: senses.status === "AWAKE"
                }
            },
            awarenessLevel: baseAwareness,
            status: "CONSCIOUS"
        };
    }
}
