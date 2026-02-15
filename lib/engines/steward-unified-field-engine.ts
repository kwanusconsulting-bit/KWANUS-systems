import { EmotionalPosture } from "./emotional-field";
import { StewardshipSenses } from "./steward-sensing-engine";
import { InfluenceSpiral } from "./steward-influence-engine";
import { FieldTrifold } from "./steward-field-engine";
import { HarmonicSpectrum, StewardHarmonicsEngine } from "./steward-harmonics-engine";
import { MovementTrifold } from "./steward-movement-engine";

export interface UnifiedPresence {
    id: "KWANUS_STEWARD_TOTAL_PRESENCE";
    movement: MovementTrifold;
    influence: InfluenceSpiral;
    field: FieldTrifold;
    harmonics: HarmonicSpectrum;
    resonanceScore: number;
    isFused: boolean;
}

export class StewardUnifiedFieldEngine {
    /**
     * Defines the Steward's Unified Influence Field (Step 9 Specification).
     * Fuses all stewardship layers into a single, indivisible presence.
     */
    static getUnifiedField(
        _posture: EmotionalPosture,
        _senses: StewardshipSenses,
        movement: MovementTrifold,
        influence: InfluenceSpiral,
        field: FieldTrifold,
        harmonics: HarmonicSpectrum
    ): UnifiedPresence {
        const tuning = StewardHarmonicsEngine.calculateSystemTuning(harmonics);

        return {
            id: "KWANUS_STEWARD_TOTAL_PRESENCE",
            movement,
            influence,
            field,
            harmonics,
            resonanceScore: tuning.globalFrequency,
            isFused: true
        };
    }

    /**
     * Rule: TOTAL_RELATIONAL_BOND
     * Ensures all subsystems tune self to the unified presence.
     */
    static getGlobalTuningStatus(unified: UnifiedPresence) {
        return {
            emotionalControl: unified.field.inner.steadiness > 0.9,
            harmonicSync: unified.harmonics.midBand.isRhythmic,
            narrativeGravity: unified.movement.arc.progress > 0.1,
            continuityAnchoring: unified.field.inner.groundedness === 1.0,
            isAligned: unified.resonanceScore > 0.9
        };
    }
}
