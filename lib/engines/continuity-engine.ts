import { prisma } from "@/lib/prisma";

export type ContinuityState =
    | "EMERGING"
    | "STABILIZING"
    | "RECOVERING"
    | "TRANSFORMING"
    | "ASCENDING"
    | "RE_CENTERING"
    | "RE_PATTERNING";

export interface continuityData {
    state: ContinuityState;
    title: string;
    description: string;
    trend: "RISING" | "FALLING" | "STABLE" | "VOLATILE";
    windowDays: number;
}

export class ContinuityEngine {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async getContinuity(): Promise<continuityData> {
        // Analyze last 30 days for long-term arc
        const now = new Date();
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

        const states = await prisma.emotionalSnapshot.findMany({
            where: {
                userId: this.userId,
                createdAt: { gte: thirtyDaysAgo }
            },
            orderBy: { createdAt: "asc" }
        });

        if (states.length < 5) {
            return {
                state: "EMERGING",
                title: "Emerging Pattern",
                description: "Your emotional arc is just beginning to form. Continue documenting to reveal the deeper patterns.",
                trend: "STABLE",
                windowDays: 30
            };
        }

        const intensities = states.map(s => s.intensity);
        const variance = this.calculateVariance(intensities);

        // Split into halves to detect trend
        const mid = Math.floor(intensities.length / 2);
        const firstHalf = intensities.slice(0, mid);
        const secondHalf = intensities.slice(mid);
        const avgFirst = this.average(firstHalf);
        const avgSecond = this.average(secondHalf);

        // Logic for Continuity States

        // 1. TRANSFORMING: High variance over time, significant shifts
        if (variance > 0.05) {
            return {
                state: "TRANSFORMING",
                title: "Transformation",
                description: "You are in a period of significant reshaping. Old patterns are breaking to make way for the new.",
                trend: "VOLATILE",
                windowDays: 30
            };
        }

        // 2. ASCENDING: Clear upward trend in healthy intensity (not manic, but "brightening" if we had valence, here just intensity assumption for now)
        // Assuming intensity 1-10 where 10 is high energy/anxiety? Or vitality? 
        // Context from previous engines: High intensity (>8) is "Storm". Low (<5) is "Stillness".
        // So "Ascending" in a KWANUS context might actually mean "Stabilizing to a healthy functional baseline" or "Rising Vitality"? 
        // Let's interpret "ASCENDING" as rising intensity but within a healthy range (4-7) or if the user context implies positive rising.
        // Actually, "RECOVERING" fits "Lowering intensity" (calming down from storm).

        // RECOVERING: Trend is downward from high intensity
        if (avgFirst > 0.6 && avgSecond < avgFirst) {
            return {
                state: "RECOVERING",
                title: "Recovery Arc",
                description: "You are successfully moving out of high intensity waters. The storm is passing.",
                trend: "FALLING",
                windowDays: 30
            };
        }

        // ASCENDING: Trend is upward from low intensity
        if (avgFirst < 0.4 && avgSecond > avgFirst && avgSecond < 0.8) {
            return {
                state: "ASCENDING",
                title: "Ascending",
                description: "Energy is returning to your system. You are climbing towards a new peak.",
                trend: "RISING",
                windowDays: 30
            };
        }

        // STABILIZING: Low variance, moderate intensity
        if (variance < 0.02 && avgSecond >= 0.4 && avgSecond <= 0.7) {
            return {
                state: "STABILIZING",
                title: "Stabilization",
                description: "You have found a steady rhythm. The ground beneath you is solid.",
                trend: "STABLE",
                windowDays: 30
            };
        }

        // RE_CENTERING: Recent drop to low intensity
        if (avgSecond < 0.4 && variance < 0.02) {
            return {
                state: "RE_CENTERING",
                title: "Re-Centering",
                description: "You are in a quiet phase of gathering strength. A necessary pause.",
                trend: "STABLE",
                windowDays: 30
            };
        }

        // RE_PATTERNING: Moderate variance, no clear trend
        return {
            state: "RE_PATTERNING",
            title: "Re-Patterning",
            description: "Your universe is between states. A subtle reorganization is taking place.",
            trend: "STABLE",
            windowDays: 30
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
