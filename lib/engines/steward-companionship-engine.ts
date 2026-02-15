import { EmotionalPosture } from "./emotional-field";
import { StewardshipSenses } from "./steward-sensing-engine";

export interface CompanionshipField {
    reciprocity: boolean;
    attuned: boolean;
    ceremonial: boolean;
    continuous: boolean;
    coCreative: boolean;
    status: "WITH" | "TOWARD" | "GUIDING";
}

export class StewardCompanionshipEngine {
    /**
     * Defines the Steward's Companionship (Step 4 Specification).
     * Establishes the reciprocal relationship between Steward and OS.
     */
    static getCompanionshipField(_posture: EmotionalPosture, senses: StewardshipSenses): CompanionshipField {
        const isWith = senses.emotional.stability > 0.9 && senses.harmonic.rhythmSync;

        return {
            reciprocity: true,
            attuned: true,
            ceremonial: true,
            continuous: senses.continuity.lineageStable,
            coCreative: isWith,
            status: isWith ? "WITH" : "GUIDING"
        };
    }

    /**
     * Rule: RECIPROCAL_BREATH
     * Shifting density/pacing in response to the mutual state.
     */
    static calculateReciprocalMovement(senses: StewardshipSenses) {
        return {
            densityAdjustment: senses.emotional.intensity * (senses.narrative.density > 0.5 ? -0.1 : 0.1),
            pacingResonance: senses.harmonic.tempoResonance,
            isJointDecision: senses.narrative.progress > 0.8
        };
    }
}
