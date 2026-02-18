import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Average days to response for a creditor (all bureaus or specific).
 */
export async function averageResponseTime(creditorId: string, bureau?: string): Promise<number | null> {
    const outcomes = await prisma.disputeOutcome.findMany({
        where: {
            creditorId,
            ...(bureau ? { bureau } : {}),
            daysToResponse: { not: null }
        },
        select: { daysToResponse: true }
    });

    if (outcomes.length === 0) return null;
    const total = outcomes.reduce((sum, o) => sum + (o.daysToResponse ?? 0), 0);
    return Math.round(total / outcomes.length);
}

/**
 * Deletion rate for a creditor at a specific bureau (0.0 - 1.0).
 */
export async function deletionRate(creditorId: string, bureau: string): Promise<number | null> {
    const total = await prisma.disputeOutcome.count({ where: { creditorId, bureau } });
    if (total === 0) return null;
    const deleted = await prisma.disputeOutcome.count({ where: { creditorId, bureau, result: "DELETED" } });
    return Math.round((deleted / total) * 100) / 100;
}

/**
 * Most successful dispute type for a creditor (by deletion rate).
 */
export async function preferredDisputeType(creditorId: string): Promise<string | null> {
    // Group by disputeType, count DELETED results
    const outcomes = await prisma.disputeOutcome.findMany({
        where: { creditorId, result: "DELETED" },
        select: { disputeType: true }
    });

    if (outcomes.length === 0) return null;

    const counts: Record<string, number> = {};
    for (const o of outcomes) {
        counts[o.disputeType] = (counts[o.disputeType] ?? 0) + 1;
    }

    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * Full stats summary for a creditor.
 */
export async function getCreditorStats(creditorId: string) {
    const [avgResponse, bureauStats] = await Promise.all([
        averageResponseTime(creditorId),
        prisma.disputeOutcome.groupBy({
            by: ["bureau", "result"],
            where: { creditorId },
            _count: { result: true }
        })
    ]);

    const bestDisputeType = await preferredDisputeType(creditorId);

    return {
        averageResponseDays: avgResponse,
        bestDisputeType,
        bureauBreakdown: bureauStats
    };
}
