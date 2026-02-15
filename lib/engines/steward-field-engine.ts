import { EmotionalPosture } from "./emotional-field";
import { StewardshipSenses } from "./steward-sensing-engine";
import { InfluenceSpiral } from "./steward-influence-engine";

export interface FieldTrifold {
    inner: {
        clarity: number;
        groundedness: number;
        steadiness: number;
    };
    relational: {
        pacing: number;
        rhythm: number;
        flow: number;
    };
    environmental: {
        tone: string;
        density: number;
        climate: EmotionalPosture;
    };
}

export class StewardFieldEngine {
    /**
     * Defines the Steward's Field (Step 7 Specification).
     * Establishes the ambient intelligence that permeates the universe.
     */
    static getFieldTrifold(
        posture: EmotionalPosture,
        senses: StewardshipSenses,
        influence: InfluenceSpiral
    ): FieldTrifold {
        return {
            inner: {
                clarity: senses.emotional.stability,
                groundedness: 1.0,
                steadiness: senses.continuity.lineageStable ? 1.0 : 0.8
            },
            relational: {
                pacing: senses.harmonic.profile.pacingWeight,
                rhythm: senses.harmonic.tempoResonance,
                flow: senses.narrative.progress
            },
            environmental: {
                tone: influence.presence.tone,
                density: senses.emotional.intensity,
                climate: posture
            }
        };
    }

    /**
     * Rule: ENERGETIC_BACKBONE
     * Returns the stability score of the field.
     */
    static getFieldStability(trifold: FieldTrifold): number {
        return (trifold.inner.steadiness + trifold.relational.rhythm + trifold.inner.groundedness) / 3;
    }
}
