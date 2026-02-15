import { prisma } from "@/lib/prisma";

export type RitualType =
    | "BREATH_WORK"
    | "ACKNOWLEDGMENT"
    | "RELEASE"
    | "INTENTION_SETTING"
    | "STABILITY_CHECK"
    | "MOMENTUM_MARKER";

export interface Ritual {
    id: string;
    type: RitualType;
    title: string;
    description: string;
    steps: string[];
    durationSeconds: number;
    tone: "CALMING" | "GROUNDING" | "UPLIFTING" | "ELEVATING";
}

export class RitualEngine {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async generateRituals(): Promise<Ritual[]> {
        const snapshots = await prisma.emotionalSnapshot.findMany({
            where: { userId: this.userId },
            orderBy: { createdAt: "desc" },
            take: 1,
        });

        const recentIntensity = snapshots[0]?.intensity || 5;
        const rituals: Ritual[] = [];

        // 1. High Intensity Rituals (Grounding)
        if (recentIntensity >= 8) {
            rituals.push({
                id: "grounding-ritual",
                type: "BREATH_WORK",
                title: "Grounding Ritual",
                description: "Soften the intensity with a grounding moment.",
                steps: [
                    "Take a slow breath in.",
                    "Exhale gently.",
                    "Place your hand on your chest and feel the weight settle."
                ],
                durationSeconds: 60,
                tone: "GROUNDING"
            });
        }

        // 2. Moderate Intensity Rituals (Centering)
        if (recentIntensity >= 5 && recentIntensity < 8) {
            rituals.push({
                id: "centering-ritual",
                type: "RELEASE",
                title: "Centering Ritual",
                description: "Re‑center your emotional field.",
                steps: [
                    "Close your eyes for a moment.",
                    "Notice one thing you can feel.",
                    "Let your attention return to your center."
                ],
                durationSeconds: 45,
                tone: "CALMING"
            });
        }

        // 3. Low Intensity / Momentum (Steady)
        if (recentIntensity < 5) {
            rituals.push({
                id: "momentum-ritual",
                type: "INTENTION_SETTING",
                title: "Momentum Ritual",
                description: "Acknowledge your steadiness.",
                steps: [
                    "Notice the ease in your breath.",
                    "Recognize your current stability.",
                    "Carry this steadiness into your next step."
                ],
                durationSeconds: 30,
                tone: "ELEVATING"
            });
        }

        // 4. Universal/Arrival Ritual (Always available as fallback or starter)
        if (rituals.length === 0) {
            rituals.push({
                id: "arrival-ritual",
                type: "BREATH_WORK",
                title: "Arrival Ritual",
                description: "Acknowledge your presence in the universe.",
                steps: [
                    "Place your attention on your breath.",
                    "Notice the space around you.",
                    "Let yourself arrive fully."
                ],
                durationSeconds: 30,
                tone: "CALMING"
            });
        }

        // 5. Credit Rituals
        const creditProfile = await prisma.creditProfile.findFirst({
            where: { userId: this.userId },
            orderBy: { updatedAt: "desc" }
        });

        if (creditProfile) {
            if (creditProfile.score >= 700) {
                rituals.push({
                    id: "credit-stability",
                    type: "STABILITY_CHECK",
                    title: "Stability Ritual",
                    description: "Honor your financial steadiness.",
                    steps: [
                        "Recognize your consistency.",
                        "Acknowledge your progress.",
                        "Affirm your continued stability."
                    ],
                    durationSeconds: 45,
                    tone: "GROUNDING"
                });
            } else if (creditProfile.score >= 650) {
                rituals.push({
                    id: "credit-strengthening",
                    type: "STABILITY_CHECK",
                    title: "Strengthening Ritual",
                    description: "Support your financial resilience.",
                    steps: [
                        "Notice one positive habit you’ve maintained.",
                        "Acknowledge its impact.",
                        "Commit to one small continuation."
                    ],
                    durationSeconds: 45,
                    tone: "UPLIFTING"
                });
            } else {
                rituals.push({
                    id: "credit-recovery",
                    type: "STABILITY_CHECK",
                    title: "Recovery Ritual",
                    description: "Support your upward movement.",
                    steps: [
                        "Recognize your effort.",
                        "Acknowledge the arc you’re in.",
                        "Affirm your capacity to rise."
                    ],
                    durationSeconds: 45,
                    tone: "ELEVATING"
                });
            }
        } else {
            rituals.push({
                id: "credit-foundation",
                type: "STABILITY_CHECK",
                title: "Foundation Ritual",
                description: "Set the tone for your financial universe.",
                steps: [
                    "Acknowledge that you are beginning.",
                    "Recognize the power of small steps.",
                    "Set an intention for stability."
                ],
                durationSeconds: 45,
                tone: "GROUNDING"
            });
        }

        // 6. Journey Rituals
        const journeyEvents = await prisma.journey.findMany({
            where: { userId: this.userId },
            orderBy: { createdAt: "desc" },
            take: 1
        });

        if (journeyEvents.length > 0) {
            const recent = journeyEvents[0];
            rituals.push({
                id: "journey-continuation",
                type: "MOMENTUM_MARKER",
                title: "Continuation Ritual",
                description: `Honor your recent step: "${recent.title}".`,
                steps: [
                    "Notice the movement you’ve made.",
                    "Acknowledge the momentum.",
                    "Let this step carry you forward."
                ],
                durationSeconds: 30,
                tone: "ELEVATING"
            });
        } else {
            rituals.push({
                id: "journey-beginning",
                type: "MOMENTUM_MARKER",
                title: "Beginning Ritual",
                description: "Mark the start of your journey.",
                steps: [
                    "Acknowledge this moment.",
                    "Recognize the path ahead.",
                    "Set a gentle intention."
                ],
                durationSeconds: 30,
                tone: "UPLIFTING"
            });
        }

        return rituals;
    }
}
