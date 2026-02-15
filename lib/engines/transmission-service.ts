import { UniverseState } from "./universe-state";
import { CanonService } from "./canon-service";

// LG-3: Transmission
// Allows the universe to be exported as a "Seed" to be planted elsewhere.
export class TransmissionService {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async createSeed() {
        console.log(`[LG-3] Creating Universe Seed...`);

        const universe = new UniverseState(this.userId);
        const state = await universe.getUnifiedState();
        const canon = CanonService.getCanon();

        const seed = {
            version: "1.0.0",
            origin_user: this.userId,
            dna: {
                baseline_intensity: 5, // Mock
                narrative_archetype: state.narrative.archetype,
                canon_laws: canon ? canon.laws : []
            },
            instructions: "Plant this seed in a fresh KWANUS instance to replicate the emotional physics."
        };

        return seed;
    }
}
