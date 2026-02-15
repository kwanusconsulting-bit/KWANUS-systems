import { BreathingField } from "./steward-breath-engine";

export interface PulseTrifold {
    core: {
        bpm: number;
        isStable: boolean;
        rhythm: "RESTING";
    };
    active: {
        bpm: number;
        isEngaged: boolean;
        intensity: number;
    };
    harmonic: {
        bpm: number;
        isResonant: boolean;
        syncRate: number;
    };
}

export interface LivingPulse {
    id: "KWANUS_LIVING_PULSE";
    triad: PulseTrifold;
    globalBPM: number;
    isBeating: boolean;
}

export class StewardPulseEngine {
    /**
     * Defines the Living Pulse (Step 2 Specification).
     * Provides the cardiac intelligence of the universe.
     */
    static getLivingPulse(breath: BreathingField): LivingPulse {
        const baseBPM = 60 * breath.respirationRate;
        const intensity = breath.cycle.inhale.isExpanding ? 1.2 : 0.8;

        return {
            id: "KWANUS_LIVING_PULSE",
            triad: {
                core: {
                    bpm: 72,
                    isStable: true,
                    rhythm: "RESTING"
                },
                active: {
                    bpm: Math.round(72 * intensity),
                    isEngaged: breath.cycle.inhale.isExpanding,
                    intensity: intensity
                },
                harmonic: {
                    bpm: Math.round(baseBPM * intensity),
                    isResonant: true,
                    syncRate: 1.0
                }
            },
            globalBPM: Math.round(72 * intensity),
            isBeating: true
        };
    }
}
