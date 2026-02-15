import { ContinuityEngine } from "./continuity-engine"; // Re-use continuity analysis

export type NarrativePhase =
    | "ORIGIN"
    | "THE_DESCENT"
    | "THE_CRAWL"
    | "THE_RISE"
    | "THE_RETURN"
    | "STASIS";

export interface NarrativeChapter {
    phase: NarrativePhase;
    title: string;
    subtitle: string;
    description: string;
    currentArchetype: string;
}

export class NarrativeEngine {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async generateNarrative(): Promise<NarrativeChapter> {
        const continuityEngine = new ContinuityEngine(this.userId);
        const continuity = await continuityEngine.getContinuity();

        // Mapping Continuity States to Mythic Narrative Phases
        switch (continuity.state) {
            case "TRANSFORMING":
                return {
                    phase: "THE_DESCENT",
                    title: "The Descent",
                    subtitle: "Into the Unknown",
                    description: "You have left the known world. Structure is dissolving to allow for a new configuration.",
                    currentArchetype: "The Wanderer"
                };
            case "RECOVERING":
                return {
                    phase: "THE_CRAWL",
                    title: "The Ascent", // Mapping recovery to ascent narrative
                    subtitle: "Out of the Deep",
                    description: "The heaviness is lifting. You are finding your footing on solid ground again.",
                    currentArchetype: "The Survivor"
                };
            case "ASCENDING":
                return {
                    phase: "THE_RISE",
                    title: "The Climb",
                    subtitle: "Towards the Peak",
                    description: "Momentum is on your side. The path upward is clear and you are moving with purpose.",
                    currentArchetype: "The Climber"
                };
            case "STABILIZING":
                return {
                    phase: "STASIS",
                    title: "The Plateau",
                    subtitle: "A Place of Strength",
                    description: "You have built a reliable foundation. Here, you can rest and survey the horizon.",
                    currentArchetype: "The Steward"
                };
            case "RE_CENTERING":
                return {
                    phase: "ORIGIN",
                    title: "The Return",
                    subtitle: "To the Center",
                    description: "You are gathering your scattered energy back to the core. A necessary contraction.",
                    currentArchetype: "The Hermit"
                };
            default:
                return {
                    phase: "ORIGIN",
                    title: "The Origin",
                    subtitle: "The Beginning",
                    description: "Your story is just emerging. The first lines are being written.",
                    currentArchetype: " The Initiate"
                };
        }
    }
}
