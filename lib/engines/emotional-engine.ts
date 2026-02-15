import { prisma } from "@/lib/prisma";

export class EmotionalEngine {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async recordEmotionalState(mode: string, intensity: number, notes?: string) {
        return await prisma.emotionalSnapshot.create({
            data: {
                userId: this.userId,
                mode,
                intensity,
                notes: notes || `Emotional resonance documented in mode: ${mode}`
            }
        });
    }

    /**
     * Records a formal posture shift (Step 3: Emotional Engine Specification)
     */
    async recordPostureShift(posture: string, context: string) {
        const message = `System posture transitioned to ${posture} within ${context}.`;

        return await prisma.emotionalSnapshot.create({
            data: {
                userId: this.userId,
                mode: posture,
                intensity: this.getIntensityFromPosture(posture),
                notes: message
            }
        });
    }

    private getIntensityFromPosture(posture: string): number {
        switch (posture) {
            case "THRIVING": return 0.9;
            case "PROGRESSING": return 0.7;
            case "NEUTRAL": return 0.5;
            case "WORST": return 0.1;
            default: return 0.5;
        }
    }
}

export async function getRecentEmotionalStates(userId: string, limit = 10) {
    return prisma.emotionalSnapshot.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit
    });
}
