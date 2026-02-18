import { ReadinessBand } from "./score";

export interface SimulatorInput {
    readinessBand: ReadinessBand;
    readinessScore: number;
    utilization?: number | null;
}

export interface SimulatorResult {
    estimatedCapitalLow: number;
    estimatedCapitalHigh: number;
    stackPlan: string[];
    confidenceScore: number;
    requiresHumanApproval: true;
    disclaimer: string;
}

const BAND_RANGES: Record<ReadinessBand, { low: number; high: number }> = {
    LOW: { low: 0, high: 10_000 },
    MODERATE: { low: 10_000, high: 50_000 },
    STRONG: { low: 50_000, high: 150_000 }
};

const BAND_STACK_PLANS: Record<ReadinessBand, string[]> = {
    LOW: [
        "Secured personal card (limit: $500–$2,000)",
        "Credit-builder loan ($1,000–$2,500)",
        "Authorized user on established account"
    ],
    MODERATE: [
        "Unsecured personal card ($5,000–$15,000)",
        "Business starter card ($5,000–$20,000)",
        "Small business line of credit ($10,000–$25,000)"
    ],
    STRONG: [
        "Premium personal card ($15,000–$30,000)",
        "Business charge card (no preset limit)",
        "Business line of credit ($25,000–$100,000)",
        "SBA Microloan or term loan ($50,000+)"
    ]
};

/**
 * Capital stacking simulator v1. Deterministic, proposal-only.
 */
export function simulateCapitalStack(input: SimulatorInput): SimulatorResult {
    const range = BAND_RANGES[input.readinessBand];
    const stackPlan = BAND_STACK_PLANS[input.readinessBand];

    // Confidence: based on score within band
    let confidenceScore = Math.round((input.readinessScore / 100) * 80);
    // Penalize high utilization
    if (input.utilization && input.utilization > 0.5) {
        confidenceScore = Math.max(10, confidenceScore - 15);
    }

    return {
        estimatedCapitalLow: range.low,
        estimatedCapitalHigh: range.high,
        stackPlan,
        confidenceScore,
        requiresHumanApproval: true,
        disclaimer: "This is an estimate only. Actual approvals depend on lender criteria, current market conditions, and full application review. This is not financial advice."
    };
}
