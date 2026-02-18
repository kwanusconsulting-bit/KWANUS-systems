import { getCreditorIntel } from "../credit/intel/engine";
import { averageResponseTime, preferredDisputeType } from "../credit/intel/stats";

export interface AutoRouteResult {
    mailingAddress: string | null;
    suggestedDisputeType: string | null;
    knownResponseTimeDays: number | null;
    confidenceScore: number; // 0-100
    source: "INTEL" | "FALLBACK";
}

const FALLBACK_ADDRESSES: Record<string, string> = {
    EX: "Experian, P.O. Box 4500, Allen, TX 75013",
    EQ: "Equifax Information Services LLC, P.O. Box 740256, Atlanta, GA 30374",
    TU: "TransUnion LLC, Consumer Dispute Center, P.O. Box 2000, Chester, PA 19016"
};

/**
 * Auto-route a dispute using creditor intelligence.
 * Falls back to generic bureau addresses if no intel found.
 */
export async function autoRouteDispute(
    creditorName: string,
    bureau: string
): Promise<AutoRouteResult> {
    const intel = await getCreditorIntel(creditorName);

    if (!intel) {
        return {
            mailingAddress: FALLBACK_ADDRESSES[bureau] ?? null,
            suggestedDisputeType: "FACTUAL_DISPUTE",
            knownResponseTimeDays: null,
            confidenceScore: 10,
            source: "FALLBACK"
        };
    }

    // Get bureau-specific address
    const address = intel.addresses.find(a => a.bureau === bureau && a.active);

    // Get bureau-specific rule
    const rule = intel.bureauRules.find(r => r.bureau === bureau);

    // Stats
    const [avgDays, bestType] = await Promise.all([
        averageResponseTime(intel.id, bureau),
        preferredDisputeType(intel.id)
    ]);

    // Confidence: base 20 if found, +20 for address, +20 for rule, +20 for avgDays, +20 for bestType
    let confidence = 20;
    if (address) confidence += 20;
    if (rule) confidence += 20;
    if (avgDays !== null) confidence += 20;
    if (bestType) confidence += 20;

    return {
        mailingAddress: address?.address ?? FALLBACK_ADDRESSES[bureau] ?? null,
        suggestedDisputeType: rule?.preferredDisputeType ?? bestType ?? "FACTUAL_DISPUTE",
        knownResponseTimeDays: avgDays,
        confidenceScore: confidence,
        source: "INTEL"
    };
}
