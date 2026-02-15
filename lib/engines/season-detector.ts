import { prisma } from "@/lib/prisma";

export type Season = "SEASON_OF_BUILDING" | "SEASON_OF_REST" | "SEASON_OF_CHANGING" | "SEASON_OF_WAITING";

export class SeasonDetector {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    // RC-1: Temporal Resonance
    // Analyzes long-term (90-day) patterns to determine the current "Season".
    async detectSeason(): Promise<Season> {
        // MVP: Analyze last 30 entries (proxy for long term)
        const history = await prisma.emotionalSnapshot.findMany({
            where: { userId: this.userId },
            orderBy: { createdAt: 'desc' },
            take: 30
        });

        if (history.length < 10) return "SEASON_OF_BUILDING"; // Default

        const avgIntensity = history.reduce((a, b) => a + b.intensity, 0) / history.length;

        // Logic:
        // High Intensity > 7 = BUILDING (Energy output)
        // Low Intensity < 4 = REST (Energy conservation)
        // Mid Intensity = CHANGING (Flux)

        if (avgIntensity >= 0.7) return "SEASON_OF_BUILDING";
        if (avgIntensity <= 0.4) return "SEASON_OF_REST";

        return "SEASON_OF_CHANGING";
    }
}
