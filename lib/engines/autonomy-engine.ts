import { prisma } from "@/lib/prisma";

export class AutonomyEngine {
    private userId: string;

    // Default thresholds for the system
    private static defaults = {
        highIntensityThreshold: 0.8,
        lowIntensityThreshold: 0.4,
        volatilityThreshold: 0.04
    };

    constructor(userId: string) {
        this.userId = userId;
    }

    // AU-2: Self-Evolution
    // Calculates adaptive thresholds based on real user history.
    async getAdaptiveThresholds() {
        // 1. Fetch history
        const history = await prisma.emotionalSnapshot.findMany({
            where: { userId: this.userId },
            orderBy: { createdAt: 'desc' },
            take: 30
        });

        if (history.length < 10) return AutonomyEngine.defaults;

        // 2. Calculate User Baseline
        const intensities = history.map(h => h.intensity);
        const mean = intensities.reduce((a, b) => a + b, 0) / intensities.length;
        const stdDev = Math.sqrt(intensities.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / intensities.length);

        // 3. Evolve Thresholds
        return {
            highIntensityThreshold: Math.min(1.0, mean + stdDev), // Cap at 1.0
            lowIntensityThreshold: Math.max(0.1, mean - stdDev),   // Floor at 0.1
            volatilityThreshold: AutonomyEngine.defaults.volatilityThreshold
        };
    }
}
