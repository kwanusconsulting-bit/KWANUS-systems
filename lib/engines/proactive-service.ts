import { prisma } from "@/lib/prisma";

export class ProactiveService {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    // AU-3: Self-Direction
    // Checks if the universe needs to Nudge the user.
    async checkForNudges(currentClimate: string) {
        // 1. Check for Stagnation
        const lastRitual = await prisma.systemEvent.findFirst({
            where: {
                userId: this.userId,
                type: 'RITUAL_COMPLETION'
            },
            orderBy: { createdAt: 'desc' }
        });

        const now = new Date();
        const daysSinceLastRitual = lastRitual ? (now.getTime() - lastRitual.createdAt.getTime()) / (1000 * 3600 * 24) : 999;

        // If in "Stillness" (low energy) and hasn't moved in 7 days -> PROACTIVE NUDGE
        if (currentClimate === "STILLNESS" && daysSinceLastRitual > 7) {
            return {
                shouldNudge: true,
                type: "STAGNATION_BREAKER",
                message: " The air has been still for some time. Shall we stir the waters?"
            };
        }

        return { shouldNudge: false };
    }
}
