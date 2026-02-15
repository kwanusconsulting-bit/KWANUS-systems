import { ClimateEngine } from "./climate-engine";
import { ContinuityEngine } from "./continuity-engine";
import { NarrativeEngine } from "./narrative-engine";
import { AutonomyEngine } from "./autonomy-engine";
import { CompanionshipEngine } from "./companionship-engine"; // ST-3
import { ProactiveService } from "./proactive-service"; // AU-3
import { MaintenanceEngine } from "./maintenance-engine"; // AU-1
import { SeasonDetector } from "./season-detector"; // RC-1
import { MemoryEngine } from "./memory-engine"; // RC-3
import { SealingService } from "./sealing-service"; // CP-4

// IS-3: Simple In-Memory Cache (for MVP)
// In production, use Redis. here we use a simple static map with timestamps.
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache
const universeCache = new Map<string, { data: any, timestamp: number }>();

export class UniverseState {
    private userId: string;
    private universeId: string; // IE-2

    constructor(userId: string, universeId: string = "DEFAULT_PRIME") {
        this.userId = userId;
        this.universeId = universeId;
    }

    // IS-1 & IS-4: Harmonization & Consistency
    async getUnifiedState() {
        // IS-3: Check Cache (Scoped to Universe)
        const cacheKey = `universe:${this.userId}:${this.universeId}`;
        const cached = universeCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            return cached.data;
        }

        // 1. Initialize Engines
        const climateEngine = new ClimateEngine(this.userId);
        const continuityEngine = new ContinuityEngine(this.userId);
        const narrativeEngine = new NarrativeEngine(this.userId);
        const autonomyEngine = new AutonomyEngine(this.userId);

        // 2. Parallel Execution
        let [climate, continuity, narrative, thresholds] = await Promise.all([
            climateEngine.getClimate(),
            continuityEngine.getContinuity(),
            narrativeEngine.generateNarrative(),
            autonomyEngine.getAdaptiveThresholds()
        ]);

        // IS-2: Safety & Stability Overrides
        // If system detects "Overwhelm" (e.g. Storm + Descent + High Volatility), forced grounding
        if (climate.type === "STORM" && continuity.state === "TRANSFORMING") {
            // Force safety override on Narrative/Advice
            climate.description = "The universe detects high turbulence. Holding space for stabilization.";
            narrative.title = "The Anchor";
            narrative.description = "A necessary pause to secure the foundation before moving forward.";
        }

        // IS-1: Harmonization (Conflict Resolution)
        // Ensure Narrative matches Climate
        if (climate.type === "RADIANCE" && narrative.phase === "THE_DESCENT") {
            // Rare conflicting state: Radiance (High positive) vs Descent (Transforming/Low)
            // Trust the Climate (Real-time) over Narrative (Lagging arc) for immediate UI
            narrative.title = "The Breakthrough"; // Harmonize narrative to match current radiance
        }

        // ST-3: Companionship Resonance
        // unique voice line for the dashboard footer or "status"
        const resonance = CompanionshipEngine.getResonance(climate.type, narrative.phase);

        // AU-3: Proactive Nudge Check
        const proactiveService = new ProactiveService(this.userId);
        const nudge = await proactiveService.checkForNudges(climate.type); // Returns { shouldNudge, message }

        // AU-1: Trigger Maintenance (Fire and Forget)
        // We don't await this because we don't want to slow down the dashboard response
        const maintenance = new MaintenanceEngine(this.userId);
        maintenance.runMaintenance().catch(err => console.error("Maintenance failed", err));

        // RC-1: Detect Season
        const seasonDetector = new SeasonDetector(this.userId);
        const season = await seasonDetector.detectSeason();

        // RC-3: Check/Archive Memory (Fire and Forget)
        const memoryEngine = new MemoryEngine(this.userId);
        memoryEngine.archiveBreakthroughs(climate.type, continuity.state).catch(e => console.error("Memory error", e));

        // CP-4: Check Seal
        const seal = SealingService.getStatus();

        const universeData = {
            frequency: "432hz",
            timestamp: new Date(),
            climate,
            continuity: { ...continuity, season },
            narrative,
            resonance,
            nudge: nudge.shouldNudge ? nudge : null,
            system: {
                thresholds,
                status: seal.isSealed ? "ETERNAL" : "OPTIMAL", // CP-4 Effect
                sync_id: crypto.randomUUID(),
                is_safe: true,
                is_cached: false
            },
            // CP-3: Final Attunement (Steward Signature)
            signature: {
                steward: this.userId,
                attunement: "RESONANT",
                sealed: seal.isSealed
            }
        };

        // IS-3: Set Cache
        universeCache.set(cacheKey, { data: { ...universeData, system: { ...universeData.system, is_cached: true } }, timestamp: Date.now() });

        return universeData;
    }
}
