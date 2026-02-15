import { prisma } from "@/lib/prisma";
import { HarmonicEngine } from "./harmonic-engine";

export type EventNode = "CREDIT" | "DISPUTE" | "FUNDING" | "EMOTIONAL" | "JOURNEY";

export interface SystemEvent {
    id: string;
    type: string;
    node: EventNode;
    title: string;
    message?: string;
    date: Date;
    metadata?: Record<string, any>;
    emotionalContext?: {
        mode: string;
        intensity: number;
    };
}

export class TimelineAggregator {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async getUnifiedTimeline(): Promise<SystemEvent[]> {
        const p = prisma as any;
        const [
            creditReports,
            disputes,
            fundingApplications,
            emotionalSnapshots,
            journeys,
            systemEvents
        ] = await Promise.all([
            p.creditReport.findMany({
                where: { userId: this.userId },
                orderBy: { createdAt: "desc" },
                take: 50
            }),
            p.dispute.findMany({
                where: { userId: this.userId },
                include: { rounds: true, creditItem: true },
                orderBy: { createdAt: "desc" },
                take: 50
            }),
            p.fundingApplication.findMany({
                where: { userId: this.userId },
                orderBy: { createdAt: "desc" },
                take: 50
            }),
            p.emotionalSnapshot.findMany({
                where: { userId: this.userId },
                orderBy: { createdAt: "desc" },
                take: 50
            }),
            p.journey.findMany({
                where: { userId: this.userId },
                orderBy: { createdAt: "desc" },
                take: 50
            }),
            (p.systemEvent || p.systemEvents || { findMany: () => Promise.resolve([]) }).findMany({
                where: { userId: this.userId },
                orderBy: { createdAt: "desc" },
                take: 50
            })
        ]);

        const events: SystemEvent[] = [];

        // 1. Credit Events
        creditReports.forEach((report: any) => {
            events.push({
                id: `credit-report-${report.id}`,
                type: "CREDIT_REPORT_UPLOADED",
                node: "CREDIT",
                title: "Credit Landscape Documented",
                message: report.source ? `A new credit report from ${report.source} has been integrated.` : "A new credit report has been integrated.",
                date: report.createdAt || report.uploadedAt || new Date()
            });
        });

        // 2. Dispute Events
        (disputes as any[]).forEach(dispute => {
            const itemLabel = dispute.creditItem
                ? `${dispute.creditItem.creditorName}`
                : "items";

            events.push({
                id: `dispute-init-${dispute.id}`,
                type: "DISPUTE_INITIATED",
                node: "DISPUTE",
                title: "Dispute Arc Commenced",
                message: `Verification process started for ${itemLabel}.`,
                date: dispute.createdAt || new Date(),
                metadata: { disputeId: dispute.id }
            });

            if (dispute.rounds) {
                dispute.rounds.forEach((round: any) => {
                    events.push({
                        id: `dispute-round-${round.id}`,
                        type: "DISPUTE_ROUND_STARTED",
                        node: "DISPUTE",
                        title: `Round ${round.roundNumber} in Motion`,
                        message: `Bureau communication sequence initiated for Round ${round.roundNumber}.`,
                        date: round.createdAt || new Date(),
                        metadata: { disputeId: dispute.id, roundNumber: round.roundNumber }
                    });
                });
            }
        });

        // 3. Funding Events
        fundingApplications.forEach((app: any) => {
            events.push({
                id: `funding-app-${app.id}`,
                type: "FUNDING_APPLICATION_SUBMITTED",
                node: "FUNDING",
                title: "Funding Intent Manifested",
                message: `Application for ${app.productType || 'funding'} of amount ${app.requestedAmount || 0} submitted.`,
                date: app.createdAt || new Date(),
                metadata: { appId: app.id, status: app.status }
            });
        });

        // 4. Emotional Events
        emotionalSnapshots.forEach((snap: any) => {
            const isPosture = ["WORST", "NEUTRAL", "PROGRESSING", "THRIVING"].includes(snap.mode);
            const title = isPosture
                ? `Postural Shift: ${snap.mode}`
                : "Emotional Resonance Documented";

            events.push({
                id: `emo-snap-${snap.id}`,
                type: "EMOTIONAL_RESONANCE",
                node: "EMOTIONAL",
                title: title,
                message: snap.notes || `State: ${snap.mode}`,
                date: snap.createdAt || new Date(),
                emotionalContext: {
                    mode: snap.mode,
                    intensity: snap.intensity
                }
            });
        });

        // 5. Journey Events
        journeys.forEach((j: any) => {
            events.push({
                id: `journey-${j.id}`,
                type: "JOURNEY_MILESTONE",
                node: "JOURNEY",
                title: j.title || "Milestone",
                message: j.description || undefined,
                date: j.createdAt || new Date()
            });
        });

        // 6. System Events
        systemEvents.forEach((sEvent: any) => {
            events.push({
                id: `system-event-${sEvent.id}`,
                type: sEvent.type || "SYSTEM_EVENT",
                node: "JOURNEY",
                title: "System Notification",
                message: sEvent.details || undefined,
                date: sEvent.createdAt || new Date()
            });
        });

        // Sort by date descending
        const sortedEvents = events.sort((a, b) => b.date.getTime() - a.date.getTime());

        // Enforce Narrative Harmony
        return sortedEvents.map(event => {
            if (event.node === "EMOTIONAL" && event.emotionalContext) {
                const posture = event.emotionalContext.mode as any;
                const state = ["WORST", "NEUTRAL", "PROGRESSING", "THRIVING"].includes(posture) ? posture : "NEUTRAL";
                const resonance = HarmonicEngine.getResonance(state);
                return {
                    ...event,
                    metadata: {
                        ...(event.metadata || {}),
                        narrativeBeat: resonance.narrativeBeat
                    }
                };
            }
            return event;
        });
    }
}
