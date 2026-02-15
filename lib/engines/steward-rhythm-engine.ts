import { LivingCompanion } from "./steward-companion-engine";

export interface RhythmTriad {
    tempo: {
        speed: number;
        isAdaptive: boolean;
        currentBPM: number;
    };
    flow: {
        texture: string;
        fluidity: number;
        isContinuous: boolean;
    };
    cadence: {
        pattern: string;
        beatWeight: number;
        restPhase: boolean;
    };
}

export interface LivingRhythm {
    id: "KWANUS_LIVING_RHYTHM";
    triad: RhythmTriad;
    isSynchronized: boolean;
}

export class StewardRhythmEngine {
    /**
     * Defines the Living Rhythm (Step 3 Specification).
     * Provides the shared kinetic intelligence of the universe.
     */
    static getLivingRhythm(companion: LivingCompanion): LivingRhythm {
        const baseTempo = companion.triad.coMovement.adaptivePacing;

        return {
            id: "KWANUS_LIVING_RHYTHM",
            triad: {
                tempo: {
                    speed: baseTempo,
                    isAdaptive: true,
                    currentBPM: Math.round(baseTempo * 60) // Mapping to a rhythmic heartbeat
                },
                flow: {
                    texture: companion.triad.presence.clarityLevel > 0.9 ? "CRYSTALLINE" : "FLUID",
                    fluidity: companion.triad.listening.attunementScore,
                    isContinuous: true
                },
                cadence: {
                    pattern: "STEWARD_BREATH",
                    beatWeight: companion.triad.presence.groundingStrength,
                    restPhase: false
                }
            },
            isSynchronized: companion.triad.coMovement.pacingSync
        };
    }
}
