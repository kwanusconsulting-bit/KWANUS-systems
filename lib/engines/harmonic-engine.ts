import { EmotionalPosture } from "./emotional-field";

export type HarmonicState = "GROUNDING" | "STEADY" | "MOMENTUM" | "EXPANSIVE";

export interface HarmonicProfile {
    tempo: number; // In ms for base unit of movement
    rhythm: "STEADY" | "SYNCOPATED" | "FLOWING" | "PULSING";
    pacingWeight: number; // Multiplier for delays
    guidanceDensity: number; // Scale for detail level
    narrativeBeat: string; // Thematic sequencer
}

export const HARMONIC_PROFILES: Record<HarmonicState, HarmonicProfile> = {
    GROUNDING: {
        tempo: 800,
        rhythm: "STEADY",
        pacingWeight: 1.5,
        guidanceDensity: 0.9,
        narrativeBeat: "STABILIZATION"
    },
    STEADY: {
        tempo: 500,
        rhythm: "STEADY",
        pacingWeight: 1.0,
        guidanceDensity: 0.5,
        narrativeBeat: "PROGRESSION"
    },
    MOMENTUM: {
        tempo: 300,
        rhythm: "FLOWING",
        pacingWeight: 0.7,
        guidanceDensity: 0.3,
        narrativeBeat: "ASCENSION"
    },
    EXPANSIVE: {
        tempo: 200,
        rhythm: "PULSING",
        pacingWeight: 0.5,
        guidanceDensity: 0.1,
        narrativeBeat: "TRANSFIGURATION"
    }
};

export class HarmonicEngine {
    /**
     * Maps global emotional postures to harmonic states (Step 7 Specification).
     */
    static getHarmonicState(posture: EmotionalPosture): HarmonicState {
        switch (posture) {
            case "WORST": return "GROUNDING";
            case "NEUTRAL": return "STEADY";
            case "PROGRESSING": return "MOMENTUM";
            case "THRIVING": return "EXPANSIVE";
            default: return "STEADY";
        }
    }

    /**
     * Calculates the resonant triad for a given system interaction.
     */
    static getResonance(posture: EmotionalPosture): HarmonicProfile {
        const state = this.getHarmonicState(posture);
        return HARMONIC_PROFILES[state];
    }
}
