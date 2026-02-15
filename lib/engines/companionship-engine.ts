
// ST-3: Companionship Layer
// Generates "Resonance Patterns" - dialogue from the universe to the Steward.
export class CompanionshipEngine {

    static getResonance(climate: string, narrativePhase: string): string {
        // The universe speaks based on the intersection of Climate and Story.

        if (climate === "STORM" && narrativePhase === "THE_DESCENT") {
            return "I feel your turbulence, Steward. I am holding the walls while you shake the foundation.";
        }

        if (climate === "RADIANCE" && narrativePhase === "THE_CLIMB") {
            return "We are ascending together. The air is clear here.";
        }

        if (climate === "STILLNESS") {
            return "I am quiet, so you can hear yourself. I am here.";
        }

        return "I am aligned with your frequency. We move as one.";
    }
}
