import { prisma } from "@/lib/prisma";

export type GuidanceType =
    | "EMOTIONAL_CHECKIN"
    | "CREDIT_ACTION"
    | "JOURNEY_STEP"
    | "REST_SUGGESTION";

export interface Guidance {
    id: string;
    type: GuidanceType;
    title: string;
    action: string;
    tone: "GENTLE" | "DIRECT" | "REFLECTIVE" | "INVITING";
    createdAt: Date;
}

export class GuidanceEngine {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async generateGuidance(): Promise<Guidance[]> {
        const [emotionalGuidance, creditGuidance] = await Promise.all([
            this.analyzeEmotionalNeeds(),
            this.analyzeCreditNeeds(),
        ]);

        const guidance: Guidance[] = [];
        if (emotionalGuidance) guidance.push(emotionalGuidance);
        // Prioritize emotional guidance always, but maybe show credit guidance if emotional state is stable?
        // For now, let's push both if they exist, UI can decide what to show or show a carousel.
        if (creditGuidance) guidance.push(creditGuidance);

        // If both are empty, generic check-in
        if (guidance.length === 0) {
            guidance.push({
                id: "generic-checkin",
                type: "EMOTIONAL_CHECKIN",
                title: "A Quiet Moment",
                action: "This is a quiet emotional moment. A gentle check‑in may help you settle into the day.",
                tone: "INVITING",
                createdAt: new Date()
            });
        }

        return guidance;
    }

    private async analyzeEmotionalNeeds(): Promise<Guidance | null> {
        const states = await prisma.emotionalSnapshot.findMany({
            where: { userId: this.userId },
            orderBy: { createdAt: "desc" },
            take: 5,
        });

        if (states.length === 0) {
            return {
                id: "first-checkin",
                type: "EMOTIONAL_CHECKIN",
                title: "Begin the Cycle",
                action: "Your emotional universe is waiting. Log your first state to begin the flow.",
                tone: "INVITING",
                createdAt: new Date()
            };
        }

        const recent = states[0];
        const recentDate = new Date(recent.createdAt);
        const now = new Date();
        // Use getTime for safe math
        const hoursSinceLast = (now.getTime() - recentDate.getTime()) / (1000 * 60 * 60);

        if (hoursSinceLast > 24) {
            return {
                id: "reconnection",
                type: "EMOTIONAL_CHECKIN",
                title: "Reconnect with Self",
                action: "It has been some time since you last checked in. How does the universe feel today?",
                tone: "INVITING",
                createdAt: new Date()
            };
        }

        // High intensity guidance
        if (recent.intensity >= 0.8) {
            return {
                id: "high-intensity-care",
                type: "REST_SUGGESTION",
                title: "Grounding Pause",
                action: "Your emotional intensity is high. A grounding pause or a moment of stillness may support you right now.",
                tone: "GENTLE",
                createdAt: new Date()
            };
        }

        // Moderate/Heavy intensity
        if (recent.intensity >= 0.5) {
            return {
                id: "moderate-intensity-care",
                type: "REST_SUGGESTION",
                title: "A Soft Breath",
                action: "You’re carrying some emotional weight. A soft breath or a small act of care could help you rebalance.",
                tone: "GENTLE",
                createdAt: new Date()
            };
        }

        // Steady state
        if (recent.intensity < 0.5) {
            return {
                id: "steady-state",
                type: "REST_SUGGESTION",
                title: "Steady Rhythm",
                action: "Your emotional state appears steady. This may be a good moment to continue your current rhythm.",
                tone: "REFLECTIVE",
                createdAt: new Date()
            };
        }

        return null;
    }

    private async analyzeCreditNeeds(): Promise<Guidance | null> {
        const profiles = await prisma.creditProfile.findMany({
            where: { userId: this.userId },
            orderBy: { updatedAt: "desc" },
            take: 1,
        });

        // If no profile, we assume initialization happened, so this is rare.
        if (profiles.length === 0) {
            return {
                id: "credit-init",
                type: "CREDIT_ACTION",
                title: "Foundation Check",
                action: "Your credit profile is initializing. A small stabilizing action may help set your foundation.",
                tone: "DIRECT",
                createdAt: new Date()
            };
        }

        const profile = profiles[0];
        const daysSinceLastUpdate = (new Date().getTime() - new Date(profile.updatedAt).getTime()) / (1000 * 60 * 60 * 24);

        // If credit hasn't been updated in 30 days
        if (daysSinceLastUpdate > 30) {
            return {
                id: "credit-stale",
                type: "CREDIT_ACTION",
                title: "Review the Landscape",
                action: "Your credit profile may have shifted. A standardized check could reveal new momentum.",
                tone: "DIRECT",
                createdAt: new Date()
            };
        }

        // Strong profile
        if (profile.score >= 700) {
            return {
                id: "credit-strong",
                type: "CREDIT_ACTION",
                title: "Strong Stability",
                action: "Your credit profile is strong. Maintaining your current habits will continue to support your stability.",
                tone: "DIRECT",
                createdAt: new Date()
            };
        }

        // Steady profile
        if (profile.score >= 650) {
            return {
                id: "credit-steady",
                type: "CREDIT_ACTION",
                title: "Steady Progress",
                action: "Your credit profile is steady. A small positive action could help you move toward greater resilience.",
                tone: "DIRECT",
                createdAt: new Date()
            };
        }

        // Recovery profile
        return {
            id: "credit-recovery",
            type: "CREDIT_ACTION",
            title: "Recovery Arc",
            action: "Your credit profile is in a recovery arc. Gentle, consistent steps will support your upward movement.",
            tone: "GENTLE",
            createdAt: new Date()
        };
    }
}
