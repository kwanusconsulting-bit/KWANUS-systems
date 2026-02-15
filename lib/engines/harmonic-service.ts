import { Season } from "./season-detector";
import { NarrativePhase } from "./narrative-engine";

export class HarmonicService {

    // RC-2: Harmonic Continuity
    // Aligns the Narrative Phase with the Detected Season to ensure thematic consistency.
    // e.g. If it's a "Season of Rest", the Narrative shouldn't be "The Climb".
    static align(season: Season, currentNarrativePhase: NarrativePhase) {

        if (season === "SEASON_OF_REST" && currentNarrativePhase === "THE_RISE") {
            // Harmonic Dissonance detected.
            // Suggest correction.
            return {
                isAligned: false,
                suggestedPhase: "STASIS",
                reason: "The season is one of Rest, but narrative is Rising. Aligning to Stasis for harmony."
            };
        }

        if (season === "SEASON_OF_BUILDING" && currentNarrativePhase === "STASIS") {
            return {
                isAligned: false,
                suggestedPhase: "THE_RISE",
                reason: "The season demands Building, but narrative is Stasis. Aligning to The Rise."
            };
        }

        return { isAligned: true };
    }
}
