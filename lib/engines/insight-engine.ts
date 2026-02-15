import { prisma } from "@/lib/prisma";

export type InsightType =
    | "EMOTIONAL_TREND"
    | "CREDIT_TREND"
    | "JOURNEY_MILESTONE"
    | "RECOVERY_SIGNAL"
    | "VOLATILITY_WARNING"
    | "STABILITY_SIGNAL";

export interface Insight {
    id: string;
    type: InsightType;
    title: string;
    message: string;
    tone: "GENTLE" | "CELEBRATORY" | "REFLECTIVE" | "URGENT";
    createdAt: Date;
}

export class InsightEngine {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async generateInsights(): Promise<Insight[]> {
        const [emotionalTrend, creditTrend] = await Promise.all([
            this.analyzeEmotionalPatterns(),
            this.analyzeCreditPatterns(),
        ]);

        const insights: Insight[] = [];
        if (emotionalTrend) insights.push(emotionalTrend);
        if (creditTrend) insights.push(creditTrend);

        return insights;
    }

    private async analyzeEmotionalPatterns(): Promise<Insight | null> {
        const states = await prisma.emotionalSnapshot.findMany({
            where: { userId: this.userId },
            orderBy: { createdAt: "desc" },
            take: 10, // Increased window for volatility/stability
        });

        if (states.length < 3) return null;

        // 1. Analyze Volatility (Variance)
        const intensities = states.map(s => s.intensity);
        const variance = this.calculateVariance(intensities);

        // High volatility check (variance > 0.04 means swings like 0.2 -> 0.8 -> 0.3)
        if (variance > 0.04) {
            return {
                id: "emo-volatility",
                type: "VOLATILITY_WARNING",
                title: "Turbulent Waters",
                message: "The universe notices rapid shifts in your emotional currents. Steadiness will return; for now, simply observe the waves.",
                tone: "GENTLE", // Gentle warning
                createdAt: new Date(),
            };
        }

        // 2. Analyze Rising Intensity (Recent > Previous)
        const recentAvg = this.average(intensities.slice(0, 3));
        const previousAvg = states.length >= 6 ? this.average(intensities.slice(3, 6)) : recentAvg;

        if (recentAvg > previousAvg + 0.15) {
            return {
                id: "emo-rising",
                type: "EMOTIONAL_TREND",
                title: "Rising Intensity",
                message: "Your emotional landscape is heightening. The universe suggests a moment of stillness to breathe before proceeding.",
                tone: "GENTLE",
                createdAt: new Date(),
            };
        }

        // 3. Analyze Recovrey (Intensity dropping after being high)
        // If previous was high (>0.7) and current is lower (<0.6)
        if (previousAvg > 0.7 && recentAvg < 0.6) {
            return {
                id: "emo-recovery",
                type: "RECOVERY_SIGNAL",
                title: "The Tide Recedes",
                message: "You have moved through the storm into calmer waters. Acknowledge this return to balance.",
                tone: "REFLECTIVE",
                createdAt: new Date(),
            };
        }

        // 4. Analyze Stability (Consistent low variance)
        if (variance < 0.01 && states.length >= 5) {
            return {
                id: "emo-stability",
                type: "STABILITY_SIGNAL",
                title: "Steady Horizon",
                message: "Your emotional state has found a rhythm of stability. This is a strong foundation for growth.",
                tone: "REFLECTIVE",
                createdAt: new Date(),
            };
        }

        // 5. Normal calming check
        if (recentAvg < previousAvg - 0.15) {
            return {
                id: "emo-calming",
                type: "EMOTIONAL_TREND",
                title: "Calming Waters",
                message: "A sense of peace is returning to your horizon. This is a moment to breathe and notice the shape of your inner weather.",
                tone: "REFLECTIVE",
                createdAt: new Date(),
            };
        }

        return null;
    }

    private async analyzeCreditPatterns(): Promise<Insight | null> {
        const profiles = await prisma.creditProfile.findMany({
            where: { userId: this.userId },
            orderBy: { updatedAt: "desc" },
            take: 5,
        });

        if (profiles.length < 2) return null;

        const currentCheck = profiles[0].score;
        const previousCheck = profiles[1].score;

        // Upward trend
        if (currentCheck > previousCheck) {
            return {
                id: "credit-gain",
                type: "CREDIT_TREND",
                title: "Upward Trajectory",
                message: `Your credit path has ascended by ${currentCheck - previousCheck} points. The system recognizes this shift in your landscape.`,
                tone: "CELEBRATORY",
                createdAt: new Date(),
            };
        }

        // Downward trend - gentle handling
        if (currentCheck < previousCheck) {
            return {
                id: "credit-dip",
                type: "CREDIT_TREND",
                title: "A Temporary Dip",
                message: "Every path has valleys. This shift is but a moment; your trajectory remains yours to shape.",
                tone: "GENTLE",
                createdAt: new Date(),
            };
        }

        // Stability (no change over 3 checks)
        if (profiles.length >= 3 && profiles[0].score === profiles[1].score && profiles[1].score === profiles[2].score) {
            return {
                id: "credit-stability",
                type: "STABILITY_SIGNAL",
                title: "Foundation of Stone",
                message: "Your credit profile is holding steady. The system recognizes the steadiness of your financial landscape.",
                tone: "REFLECTIVE",
                createdAt: new Date(),
            };
        }

        return null;
    }

    // Helper method for quiet universe
    public static getQuietInsight(): Insight {
        return {
            id: "quiet-universe",
            type: "STABILITY_SIGNAL",
            title: "The Universe is Quiet",
            message: "No major patterns are emerging. Breathe into this stillness.",
            tone: "REFLECTIVE",
            createdAt: new Date()
        };
    }

    private average(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    }

    private calculateVariance(numbers: number[]): number {
        const avg = this.average(numbers);
        const squareDiffs = numbers.map(n => Math.pow(n - avg, 2));
        return this.average(squareDiffs);
    }
}
