// lib/disputes/engine.ts
// Full backend logic for the KWANUS Dispute Engine
// Strict TypeScript • Prisma 7 • Emotionally Adaptive • Continuity-Safe

import { prisma } from "@/lib/prisma";
import {
    DisputeStatus,
    RoundStatus,
    EmotionalState,
    TimelineEventType,
    BureauStatus,
} from "@prisma/client";

// -----------------------------
// EMOTIONAL-ADAPTIVE PACING
// -----------------------------

export function getAdaptivePacing(state: EmotionalState) {
    switch (state) {
        case "WORST":
            return { transitions: "slow", density: "low", guidance: "high" };
        case "NEUTRAL":
            return { transitions: "steady", density: "medium", guidance: "medium" };
        case "PROGRESSING":
            return { transitions: "fast", density: "high", guidance: "low" };
        case "THRIVING":
            return { transitions: "dynamic", density: "layered", guidance: "minimal" };
        default:
            return { transitions: "steady", density: "medium", guidance: "medium" };
    }
}

// -----------------------------
// CREATE DISPUTE
// -----------------------------

export async function createDispute(userId: string, data: { bureau: string; creditorName: string; reason: string; emotionalTone?: string }) {
    const dispute = await prisma.dispute.create({
        data: {
            userId,
            bureau: data.bureau,
            creditorName: data.creditorName,
            reason: data.reason,
            status: DisputeStatus.OPEN,
            emotionalTone: data.emotionalTone || EmotionalState.NEUTRAL,
        },
    });
    await addTimelineEvent(dispute.id, TimelineEventType.STATUS_CHANGED, "Dispute created");

    return dispute;
}

// -----------------------------
// CREATE ROUND
// -----------------------------

export async function createRound(disputeId: string) {
    const roundCount = await prisma.disputeRound.count({
        where: { disputeId },
    });

    const round = await prisma.disputeRound.create({
        data: {
            disputeId,
            roundNumber: roundCount + 1,
            status: RoundStatus.DRAFT,
        },
    });

    await addTimelineEvent(disputeId, TimelineEventType.ROUND_CREATED, `Round ${round.roundNumber} created`);

    return round;
}

// -----------------------------
// SUBMIT ROUND
// -----------------------------

export async function submitRound(roundId: string) {
    const round = await prisma.disputeRound.update({
        where: { id: roundId },
        data: {
            status: RoundStatus.SUBMITTED,
            submittedAt: new Date(),
        },
        include: { dispute: true },
    });

    await addTimelineEvent(round.disputeId, TimelineEventType.ROUND_SUBMITTED, `Round ${round.roundNumber} submitted`);

    // Update dispute status
    await prisma.dispute.update({
        where: { id: round.disputeId },
        data: { status: DisputeStatus.IN_PROGRESS },
    });

    return round;
}

// -----------------------------
// ADD EVIDENCE
// -----------------------------

export async function addEvidence(params: {
    disputeId?: string;
    roundId?: string;
    itemId?: string;
    url: string;
    type: string;
}) {
    const evidence = await prisma.evidence.create({
        data: {
            disputeId: params.disputeId,
            roundId: params.roundId,
            itemId: params.itemId,
            url: params.url,
            type: params.type as any,
        },
    });

    if (params.disputeId) {
        await addTimelineEvent(params.disputeId, TimelineEventType.EVIDENCE_ADDED, "Evidence added");
    }

    return evidence;
}

// -----------------------------
// PARSE BUREAU RESPONSE
// -----------------------------

export async function addBureauResponse(params: {
    roundId: string;
    bureau: string;
    status: BureauStatus;
    message?: string;
}) {
    const response = await prisma.bureauResponse.create({
        data: {
            roundId: params.roundId,
            bureau: params.bureau as any,
            status: params.status,
            message: params.message,
        },
        include: { round: true },
    });

    await addTimelineEvent(
        response.round.disputeId,
        TimelineEventType.BUREAU_RESPONSE,
        `${params.bureau} responded`
    );

    return response;
}

// -----------------------------
// TIMELINE EVENTS
// -----------------------------

export async function addTimelineEvent(
    disputeId: string,
    type: TimelineEventType,
    message: string
) {
    return prisma.timelineEvent.create({
        data: {
            disputeId,
            type,
            message,
        },
    });
}

// -----------------------------
// LIST USER DISPUTES
// -----------------------------

export async function listUserDisputes(userId: string) {
    return prisma.dispute.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
            creditItem: true,
        },
    });
}

// -----------------------------
// GET DISPUTE WITH FULL CONTEXT
// -----------------------------

export async function getDispute(disputeId: string) {
    return prisma.dispute.findUnique({
        where: { id: disputeId },
        include: {
            rounds: {
                include: {
                    bureauResponses: true,
                    evidence: true,
                },
            },
            creditItem: {
                include: { evidence: true },
            },
            evidence: true,
            timeline: true,
        },
    });
}
