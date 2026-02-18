import { PrismaClient } from "@prisma/client";
import { aggregateAllCreditors } from "../../ml/aggregate";
import { estimateDeletionProbability } from "../../ml/probability";
import { assertProposalOnly } from "../guards";

const prisma = new PrismaClient();

export interface MLCardOutput {
    title: string;
    description: string;
    type: "ML";
    priority: number;
    actionLabel?: string;
    proposal: any;
}

/**
 * Generate ML-driven DecisionCards for the Motherboard.
 * Scans all creditors with outcome data and surfaces intelligence.
 */
export async function generateMLCards(_tenantId: string): Promise<MLCardOutput[]> {
    const cards: MLCardOutput[] = [];

    // Get all creditors with outcomes
    const creditors = await prisma.creditor.findMany({
        include: { outcomes: { take: 1 } }
    });

    const creditorsWithData = creditors.filter(c => c.outcomes.length > 0);

    if (creditorsWithData.length === 0) {
        cards.push({
            title: "ML Engine: No Dispute Data Yet",
            description: "Record dispute outcomes via /api/disputes/record-outcome to enable ML-driven strategy recommendations.",
            type: "ML",
            priority: 3,
            actionLabel: "Record Outcome",
            proposal: {
                requiresHumanApproval: true,
                action: "RECORD_DISPUTE_OUTCOMES",
                reasoning: ["No outcome data available for ML analysis."]
            }
        });
        return cards;
    }

    // Aggregate all creditors
    const allAggregates = await aggregateAllCreditors();

    for (const creditor of creditorsWithData) {
        const agg = allAggregates[creditor.id];
        if (!agg || agg.total < 3) continue; // Need at least 3 outcomes for meaningful signal

        const deletionPct = Math.round(agg.deletionRate * 100);

        // Find best reason code
        const bestReason = agg.reasonPerformance.sort((a, b) => b.successRate - a.successRate)[0];
        const reasonCode = bestReason?.reasonCode ?? "FACTUAL_DISPUTE";

        const probability = await estimateDeletionProbability(creditor.id, reasonCode);

        const proposal = {
            requiresHumanApproval: true,
            action: "REVIEW_ML_DISPUTE_INTELLIGENCE",
            creditorId: creditor.id,
            creditorName: creditor.name,
            probabilityScore: probability.probabilityScore,
            confidenceLevel: probability.confidenceLevel,
            recommendedReasonCode: reasonCode,
            deletionRate: agg.deletionRate,
            sampleSize: agg.total
        };

        assertProposalOnly(proposal);

        // High-value signal: high deletion rate
        if (deletionPct >= 60) {
            cards.push({
                title: `ML: ${creditor.name} — ${deletionPct}% Deletion Rate (${probability.confidenceLevel} Confidence)`,
                description: `Based on ${agg.total} outcomes, this creditor deletes at ${deletionPct}%.\nBest strategy: ${reasonCode}\nProbability score: ${probability.probabilityScore}/100`,
                type: "ML",
                priority: 9,
                actionLabel: "Apply Strategy",
                proposal
            });
        }

        // Low deletion rate warning
        if (deletionPct < 20 && agg.total >= 10) {
            cards.push({
                title: `ML: ${creditor.name} — Low Deletion Rate (${deletionPct}%)`,
                description: `${agg.total} disputes recorded. Only ${deletionPct}% result in deletion.\nConsider escalating to CFPB or switching strategy.`,
                type: "ML",
                priority: 8,
                actionLabel: "Escalate Strategy",
                proposal
            });
        }

        // Dropping success rate signal (validations high)
        if (agg.validationRate > 0.5 && agg.total >= 5) {
            cards.push({
                title: `ML: ${creditor.name} — High Verification Rate (${Math.round(agg.validationRate * 100)}%)`,
                description: `Creditor is verifying ${Math.round(agg.validationRate * 100)}% of disputes. Switch to technical challenge approach.`,
                type: "ML",
                priority: 7,
                actionLabel: "Switch to Technical",
                proposal
            });
        }
    }

    return cards;
}
