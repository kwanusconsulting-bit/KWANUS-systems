export interface ScoreInput {
    personalScore?: number | null;
    utilization?: number | null;
    inquiries6m?: number | null;
    negativeItems?: number | null;
    openAccounts?: number | null;
}

export type ReadinessBand = "LOW" | "MODERATE" | "STRONG";

export interface ScoreResult {
    readinessScore: number;
    band: ReadinessBand;
    breakdown: {
        creditScore: number;
        utilization: number;
        inquiries: number;
        negativeItems: number;
        openAccounts: number;
    };
}

/**
 * Score funding readiness 0–100 using weighted factors.
 */
export function calculateReadinessScore(input: ScoreInput): ScoreResult {
    // Credit Score (40%) — 850 max, 300 min
    const creditRaw = input.personalScore ?? 580;
    const creditNorm = Math.max(0, Math.min(1, (creditRaw - 300) / (850 - 300)));
    const creditPoints = Math.round(creditNorm * 40);

    // Utilization (20%) — 0% = 20pts, 100% = 0pts
    const utilRaw = input.utilization ?? 0.5;
    const utilPoints = Math.round(Math.max(0, 1 - utilRaw) * 20);

    // Inquiries (15%) — 0 = 15pts, 6+ = 0pts
    const inqRaw = Math.min(input.inquiries6m ?? 0, 6);
    const inqPoints = Math.round(((6 - inqRaw) / 6) * 15);

    // Negative Items (15%) — 0 = 15pts, 5+ = 0pts
    const negRaw = Math.min(input.negativeItems ?? 0, 5);
    const negPoints = Math.round(((5 - negRaw) / 5) * 15);

    // Open Accounts (10%) — 5+ = 10pts, 0 = 0pts
    const accRaw = Math.min(input.openAccounts ?? 0, 10);
    const accPoints = Math.round((accRaw / 10) * 10);

    const readinessScore = creditPoints + utilPoints + inqPoints + negPoints + accPoints;

    let band: ReadinessBand = "LOW";
    if (readinessScore >= 75) band = "STRONG";
    else if (readinessScore >= 50) band = "MODERATE";

    return {
        readinessScore,
        band,
        breakdown: {
            creditScore: creditPoints,
            utilization: utilPoints,
            inquiries: inqPoints,
            negativeItems: negPoints,
            openAccounts: accPoints
        }
    };
}
