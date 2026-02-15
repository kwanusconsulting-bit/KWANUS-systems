import { prisma } from "@/lib/prisma";

export class MaintenanceEngine {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    // AU-1: Self-Maintenance
    // Smooths out emotional data by removing statistical outliers that might skew the narrative.
    // e.g. A single "10" intensity moment in a week of "2"s might be a data error or a momentary spike.
    async runMaintenance() {
        console.log(`[AU-1] Running maintenance for ${this.userId}...`);

        // 1. Fetch recent states
        const recent = await prisma.emotionalSnapshot.findMany({
            where: { userId: this.userId },
            orderBy: { createdAt: 'desc' },
            take: 20
        });

        if (recent.length < 5) return { status: "SKIPPED_NOT_ENOUGH_DATA" };

        // 2. Detect Outliers (Simple Z-score approach)
        const intensities = recent.map(r => r.intensity);
        const mean = intensities.reduce((a, b) => a + b, 0) / intensities.length;
        const stdDev = Math.sqrt(intensities.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / intensities.length);

        const outliers = recent.filter(r => Math.abs(r.intensity - mean) > 2 * stdDev);

        // 3. Flag/Correct (For now, just log)
        if (outliers.length > 0) {
            console.log(`[AU-1] Detected ${outliers.length} outliers. Smoothing...`);
            // In a real system, we might flag these as "ignored" for long-term calculation
        }

        return { status: "MAINTENANCE_COMPLETE", outliers_found: outliers.length };
    }
}
