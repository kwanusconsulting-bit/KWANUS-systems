import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ReasonPerformance {
    reasonCode: string;
    total: number;
    deletions: number;
    successRate: number;
}

export interface CreditorAggregate {
    creditorId: string;
    total: number;
    deletions: number;
    verifications: number;
    updates: number;
    deletionRate: number;
    validationRate: number;
    avgResolutionDays: number | null;
    reasonPerformance: ReasonPerformance[];
}

/**
 * Aggregate all dispute outcomes for a specific creditor.
 */
export async function aggregateCreditorOutcomes(creditorId: string): Promise<CreditorAggregate> {
    const outcomes = await prisma.disputeOutcome.findMany({
        where: { creditorId }
    });

    const total = outcomes.length;
    const deletions = outcomes.filter(o => o.result === "DELETED").length;
    const verifications = outcomes.filter(o => o.result === "VERIFIED").length;
    const updates = outcomes.filter(o => o.result === "UPDATED").length;

    const withDays = outcomes.filter(o => o.daysToResponse !== null);
    const avgResolutionDays = withDays.length > 0
        ? Math.round(withDays.reduce((sum, o) => sum + (o.daysToResponse ?? 0), 0) / withDays.length)
        : null;

    // Group by disputeType (used as reasonCode in v0)
    const reasonMap: Record<string, { total: number; deletions: number }> = {};
    for (const o of outcomes) {
        const key = o.disputeType;
        if (!reasonMap[key]) reasonMap[key] = { total: 0, deletions: 0 };
        reasonMap[key].total++;
        if (o.result === "DELETED") reasonMap[key].deletions++;
    }

    const reasonPerformance: ReasonPerformance[] = Object.entries(reasonMap).map(([reasonCode, stats]) => ({
        reasonCode,
        total: stats.total,
        deletions: stats.deletions,
        successRate: stats.total > 0 ? Math.round((stats.deletions / stats.total) * 100) / 100 : 0
    }));

    return {
        creditorId,
        total,
        deletions,
        verifications,
        updates,
        deletionRate: total > 0 ? Math.round((deletions / total) * 100) / 100 : 0,
        validationRate: total > 0 ? Math.round((verifications / total) * 100) / 100 : 0,
        avgResolutionDays,
        reasonPerformance
    };
}

/**
 * Aggregate all creditors — returns a map of creditorId → aggregate.
 */
export async function aggregateAllCreditors(): Promise<Record<string, CreditorAggregate>> {
    const creditors = await prisma.creditor.findMany({ select: { id: true } });
    const result: Record<string, CreditorAggregate> = {};
    for (const c of creditors) {
        result[c.id] = await aggregateCreditorOutcomes(c.id);
    }
    return result;
}
