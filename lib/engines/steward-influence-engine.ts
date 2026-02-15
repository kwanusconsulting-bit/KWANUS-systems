import { EmotionalPosture } from "./emotional-field";
import { StewardshipSenses } from "./steward-sensing-engine";
import { MovementTrifold } from "./steward-movement-engine";

export interface InfluenceSpiral {
    presence: {
        tone: string;
        climate: EmotionalPosture;
        gravity: number; // 0.0 to 1.0 (Passive Influence)
    };
    guidance: {
        arcCurvature: number; // 0.0 (straight) to 1.0 (deeply curved)
        intent: string;
        isBext: boolean; // Active Influence
    };
    resonance: {
        vibrationFrequency: number;
        harmonyScore: number;
        isCoherent: boolean; // Harmonic Influence
    };
}

export class StewardInfluenceEngine {
    /**
     * Defines the Steward's Influence (Step 6 Bext Specification).
     * Shapes the universe through a circular Influence Spiral.
     */
    static getInfluenceSpiral(
        posture: EmotionalPosture,
        senses: StewardshipSenses,
        _movement: MovementTrifold
    ): InfluenceSpiral {
        return {
            presence: {
                tone: senses.continuity.coherence.messagingVoice,
                climate: posture,
                gravity: senses.emotional.stability
            },
            guidance: {
                arcCurvature: 1.0, // Bext trajectory is curved
                intent: "BEND_ARC",
                isBext: true
            },
            resonance: {
                vibrationFrequency: senses.harmonic.tempoResonance,
                harmonyScore: (senses.harmonic.tempoResonance + senses.emotional.stability) / 2,
                isCoherent: senses.continuity.isResonant
            }
        };
    }

    /**
     * Rule: SIGNATURE_FREQUENCY
     * Returns the unique frequency the Steward emits into the field.
     */
    static getSignatureFrequency(spiral: InfluenceSpiral): number {
        return spiral.resonance.harmonyScore * (spiral.guidance.isBext ? 1.1 : 1.0);
    }
}
