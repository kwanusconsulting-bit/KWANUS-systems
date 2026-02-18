import { aggregateCreditorOutcomes } from "./aggregate";
import { estimateDeletionProbability, ConfidenceLevel } from "./probability";

export type DisputeStrategy = "VALIDATION" | "TECHNICAL" | "GOODWILL" | "ESCALATE";

export interface StrategyResult {
    recommendedStrategy: DisputeStrategy;
    probabilityScore: number;
    confidenceLevel: ConfidenceLevel;
    reasoning: string[];
    alternativeStrategies: {
        strategy: DisputeStrategy;
        rationale: string;
    }[];
    requiresHumanApproval: true;
}

const STRATEGY_DESCRIPTIONS: Record<DisputeStrategy, string> = {
    VALIDATION: "Request debt validation under FDCPA — forces creditor to prove the debt.",
    TECHNICAL: "Challenge on technical grounds: reporting errors, date discrepancies, missing fields.",
    GOODWILL: "Goodwill letter to creditor — works best with small/local creditors or isolated late payments.",
    ESCALATE: "Escalate to CFPB / state AG — use when creditor is unresponsive or deletion rate is very low."
};

/**
 * Recommend optimal dispute strategy for a creditor + reason code.
 */
export async function recommendStrategy(
    creditorId: string,
    reasonCode: string,
    negativeItemType?: string
): Promise<StrategyResult> {
    const [agg, probability] = await Promise.all([
        aggregateCreditorOutcomes(creditorId),
        estimateDeletionProbability(creditorId, reasonCode)
    ]);

    const reasoning: string[] = [];
    let recommended: DisputeStrategy;

    const deletionPct = agg.deletionRate * 100;
    const validationPct = agg.validationRate * 100;

    if (deletionPct >= 70) {
        recommended = "VALIDATION";
        reasoning.push(`Creditor deletion rate is ${deletionPct.toFixed(0)}% — aggressive validation approach is optimal.`);
    } else if (validationPct >= 40) {
        recommended = "TECHNICAL";
        reasoning.push(`High verification rate (${validationPct.toFixed(0)}%) — technical challenge on reporting accuracy is recommended.`);
    } else if (agg.total < 10) {
        recommended = "GOODWILL";
        reasoning.push(`Limited data on this creditor (${agg.total} outcomes). Goodwill letter is low-risk first step.`);
    } else if (deletionPct < 20) {
        recommended = "ESCALATE";
        reasoning.push(`Low deletion rate (${deletionPct.toFixed(0)}%) — standard dispute unlikely to succeed. Escalation recommended.`);
    } else {
        recommended = "VALIDATION";
        reasoning.push(`Moderate deletion rate (${deletionPct.toFixed(0)}%) — validation is the balanced approach.`);
    }

    if (negativeItemType) {
        reasoning.push(`Item type: ${negativeItemType}.`);
    }

    if (probability.reasonSuccessRate !== null) {
        reasoning.push(`Reason code "${reasonCode}" has ${(probability.reasonSuccessRate * 100).toFixed(0)}% historical success rate.`);
    }

    // Build alternatives (all strategies except recommended)
    const allStrategies: DisputeStrategy[] = ["VALIDATION", "TECHNICAL", "GOODWILL", "ESCALATE"];
    const alternativeStrategies = allStrategies
        .filter(s => s !== recommended)
        .map(s => ({ strategy: s, rationale: STRATEGY_DESCRIPTIONS[s] }));

    return {
        recommendedStrategy: recommended,
        probabilityScore: probability.probabilityScore,
        confidenceLevel: probability.confidenceLevel,
        reasoning,
        alternativeStrategies,
        requiresHumanApproval: true
    };
}
