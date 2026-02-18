import { aggregateCreditorOutcomes } from "./aggregate";

export type ConfidenceLevel = "LOW" | "MEDIUM" | "HIGH";

export interface ProbabilityResult {
    probabilityScore: number;   // 0–100
    confidenceLevel: ConfidenceLevel;
    sampleSize: number;
    creditorDeletionRate: number;
    reasonSuccessRate: number | null;
}

/**
 * Estimate deletion probability for a dispute.
 * Weights: creditor deletion rate 60%, reason code success rate 40%.
 */
export async function estimateDeletionProbability(
    creditorId: string,
    reasonCode: string
): Promise<ProbabilityResult> {
    const agg = await aggregateCreditorOutcomes(creditorId);

    const creditorWeight = 0.60;
    const reasonWeight = 0.40;

    // Creditor-level deletion rate (0.0–1.0)
    const creditorScore = agg.deletionRate * 100 * creditorWeight;

    // Reason-code performance
    const reasonData = agg.reasonPerformance.find(r => r.reasonCode === reasonCode);
    const reasonSuccessRate = reasonData ? reasonData.successRate : null;

    // If no reason data, fall back to creditor rate for the reason portion
    const reasonScore = (reasonSuccessRate !== null ? reasonSuccessRate : agg.deletionRate) * 100 * reasonWeight;

    const probabilityScore = Math.min(100, Math.round(creditorScore + reasonScore));

    // Confidence based on sample size
    let confidenceLevel: ConfidenceLevel = "LOW";
    if (agg.total >= 50) confidenceLevel = "HIGH";
    else if (agg.total >= 10) confidenceLevel = "MEDIUM";

    return {
        probabilityScore,
        confidenceLevel,
        sampleSize: agg.total,
        creditorDeletionRate: agg.deletionRate,
        reasonSuccessRate
    };
}
