import { UniverseState } from "./universe-state";

export class ConstellationService {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    // IE-3: Constellation Intelligence
    // Aggregates states from multiple universes to find the "Constellation State".
    // e.g. "Work Universe" is Stormy, but "Creative Universe" is Radiant -> Constellation is "Balanced Tension".
    async getConstellationState() {
        // In a real app, we'd fetch actual universe IDs from DB.
        // Mocking 2 universes for IE-2 demo.
        const universeA = new UniverseState(this.userId, "WORK_PRIME");
        const universeB = new UniverseState(this.userId, "CREATIVE_PRIME");

        const [stateA, stateB] = await Promise.all([
            universeA.getUnifiedState(),
            universeB.getUnifiedState()
        ]);

        const resonance = (stateA.climate.type === stateB.climate.type) ? "HARMONIC" : "DISSONANT";

        return {
            type: "CONSTELLATION",
            universes: ["WORK_PRIME", "CREATIVE_PRIME"],
            meta_climate: resonance === "HARMONIC" ? stateA.climate.type : "COMPLEX",
            resonance
        };
    }
}
