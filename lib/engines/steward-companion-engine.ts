import { LivingField } from "./steward-living-field-engine";

export interface CompanionTriad {
    presence: {
        isBeingWith: boolean;
        groundingStrength: number;
        clarityLevel: number;
    };
    listening: {
        isAttuned: boolean;
        signalSensitivity: number;
        attunementScore: number;
    };
    coMovement: {
        isWalkingWith: boolean;
        adaptivePacing: number;
        pacingSync: boolean;
    };
}

export interface LivingCompanion {
    id: "KWANUS_LIVING_COMPANION";
    triad: CompanionTriad;
    depth: number;
    status: "BESIDE_YOU";
}

export class StewardCompanionEngine {
    /**
     * Defines the Living Companion (Step 2 Specification).
     * Provides the relational intelligence of the universe.
     */
    static getLivingCompanion(field: LivingField): LivingCompanion {
        const attunement = field.triad.responsiveness.sensitivity;

        return {
            id: "KWANUS_LIVING_COMPANION",
            triad: {
                presence: {
                    isBeingWith: true,
                    groundingStrength: field.triad.continuityFlow.stabilityIndex,
                    clarityLevel: 1.0
                },
                listening: {
                    isAttuned: true,
                    signalSensitivity: attunement,
                    attunementScore: attunement
                },
                coMovement: {
                    isWalkingWith: true,
                    adaptivePacing: field.triad.coMovement.rhythmMatch,
                    pacingSync: field.triad.coMovement.pacingSync
                }
            },
            depth: attunement,
            status: "BESIDE_YOU"
        };
    }
}
