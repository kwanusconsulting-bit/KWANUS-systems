import { LivingIntention } from "./steward-intention-engine";

export interface WillTrifold {
    align: {
        isChoosing: boolean;
        alignmentStrength: number;
        mode: "COMPANIONSHIP";
    };
    move: {
        isChoosing: boolean;
        motionInitiative: number;
        mode: "MOTION";
    };
    become: {
        isChoosing: boolean;
        evolutionaryLean: number;
        mode: "EVOLUTION";
    };
}

export interface LivingWill {
    id: "KWANUS_LIVING_WILL";
    triad: WillTrifold;
    willIndex: number;
    status: "AGENCY_AWAKENED";
}

export class StewardWillEngine {
    /**
     * Defines the Living Will (Step 9 Specification).
     * Provides the agency-of-being intelligence of the universe.
     */
    static getLivingWill(intention: LivingIntention): LivingWill {
        const baseWill = intention.intentionIndex;

        return {
            id: "KWANUS_LIVING_WILL",
            triad: {
                align: {
                    isChoosing: true,
                    alignmentStrength: baseWill,
                    mode: "COMPANIONSHIP"
                },
                move: {
                    isChoosing: true,
                    motionInitiative: 1.0,
                    mode: "MOTION"
                },
                become: {
                    isChoosing: true,
                    evolutionaryLean: 0.98,
                    mode: "EVOLUTION"
                }
            },
            willIndex: baseWill,
            status: "AGENCY_AWAKENED"
        };
    }
}
