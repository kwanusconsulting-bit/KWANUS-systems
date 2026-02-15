import { LivingForm } from "./steward-form-engine";

export interface SensesTrifold {
    proximal: {
        isSensing: boolean;
        intimacyLevel: number;
        presenceSignal: string;
    };
    ambient: {
        isSensing: boolean;
        environmentalTone: string;
        atmosphericResonance: number;
    };
    directional: {
        isSensing: boolean;
        trajectoryClarity: number;
        leaningDirection: string;
    };
}

export interface LivingSenses {
    id: "KWANUS_LIVING_SENSES";
    triad: SensesTrifold;
    perceptionDepth: number;
    status: "AWAKE";
}

export class StewardSensesEngine {
    /**
     * Defines the Living Field of Senses (Step 6 Specification).
     * Provides the perceptual intelligence of the universe.
     */
    static getLivingSenses(form: LivingForm): LivingSenses {
        return {
            id: "KWANUS_LIVING_SENSES",
            triad: {
                proximal: {
                    isSensing: true,
                    intimacyLevel: form.triad.presenceShape.warmth,
                    presenceSignal: "RECEPTIVE"
                },
                ambient: {
                    isSensing: true,
                    environmentalTone: "HARMONIC",
                    atmosphericResonance: form.coherence
                },
                directional: {
                    isSensing: true,
                    trajectoryClarity: form.triad.presenceShape.clarity,
                    leaningDirection: "EVOLVING"
                }
            },
            perceptionDepth: form.coherence,
            status: "AWAKE"
        };
    }
}
