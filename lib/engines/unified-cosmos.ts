import { UniverseState } from "./universe-state";
import { CanonService } from "./canon-service";
import { CoherenceValidator } from "./coherence-validator";

// CP-2: Final Integration
// The "One Object" that represents the entire system.
export class UnifiedCosmos {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async getCosmos() {
        const universe = new UniverseState(this.userId);
        const state = await universe.getUnifiedState();

        // Run CP-1 Validation
        const coherence = CoherenceValidator.validate(state);

        return {
            data: state,
            meta: {
                canon: CanonService.getCanon(),
                coherence,
                steward: this.userId
            }
        };
    }
}
