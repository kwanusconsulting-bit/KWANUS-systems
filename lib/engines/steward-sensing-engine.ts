import { EmotionalPosture } from "./emotional-field";
import { SystemEvent } from "./timeline-aggregator";
import { HarmonicProfile, HarmonicEngine } from "./harmonic-engine";
import { CoherenceEngine, CoherenceRules } from "./coherence-matrix";

export interface StewardshipSnapshot {
    posture: EmotionalPosture;
    narrativeArc: "ORIENTATION" | "JOURNEY" | "REFLECTION" | "CONTINUATION";
    harmonicProfile: HarmonicProfile;
    coherence: CoherenceRules;
    isConsistant: boolean;
}

export interface StewardshipSenses {
    emotional: {
        posture: EmotionalPosture;
        stability: number; // 0.0 to 1.0
        intensity: number;
    };
    narrative: {
        arc: "ORIENTATION" | "JOURNEY" | "REFLECTION" | "CONTINUATION";
        density: number; // Event frequency
        progress: number; // Waypoint progress (0-1)
    };
    harmonic: {
        profile: HarmonicProfile;
        tempoResonance: number;
        rhythmSync: boolean;
    };
    continuity: {
        isResonant: boolean;
        fragmentationRisk: number; // 0.0 to 1.0
        lineageStable: boolean;
        coherence: CoherenceRules;
    };
}

export class StewardSensingEngine {
    /**
     * The Steward's perceptual instruments (Step 3 Senses).
     * Provides high-fidelity sensing of the indivisible OS field.
     */
    static getSenses(posture: EmotionalPosture, events: SystemEvent[]): StewardshipSenses {
        const harmonic = HarmonicEngine.getResonance(posture);
        const coherence = CoherenceEngine.getCoherence(posture);

        return {
            emotional: {
                posture,
                stability: 0.95, // System is integrated
                intensity: 0.5
            },
            narrative: {
                arc: this.detectNarrativeArc(events),
                density: events.length / 10,
                progress: 0.25
            },
            harmonic: {
                profile: harmonic,
                tempoResonance: 1.0,
                rhythmSync: true
            },
            continuity: {
                isResonant: true,
                fragmentationRisk: 0.0,
                lineageStable: true,
                coherence
            }
        };
    }

    private static detectNarrativeArc(events: SystemEvent[]): "ORIENTATION" | "JOURNEY" | "REFLECTION" | "CONTINUATION" {
        if (events.length < 5) return "ORIENTATION";
        const hasMilestone = events.some(e => e.type === "JOURNEY_MILESTONE");
        if (hasMilestone) return "JOURNEY";
        return "ORIENTATION";
    }

    /**
     * Legacy support for earlier steps (Mandate sensing).
     */
    static sense(posture: EmotionalPosture, events: SystemEvent[]) {
        const senses = this.getSenses(posture, events);
        return {
            posture: senses.emotional.posture,
            narrativeArc: senses.narrative.arc,
            harmonicProfile: senses.harmonic.profile,
            coherence: senses.continuity.coherence,
            isConsistant: senses.continuity.isResonant
        };
    }
}
