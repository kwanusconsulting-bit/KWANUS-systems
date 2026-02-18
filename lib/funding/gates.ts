export interface GateInput {
    personalScore?: number | null;
    utilization?: number | null;
    inquiries6m?: number | null;
    negativeItems?: number | null;
}

export interface GateResult {
    blocked: boolean;
    caution: boolean;
    reasons: string[];
    improvements: string[];
}

/**
 * Hard-rule funding gate. Deterministic — no ML.
 */
export function checkFundingGates(input: GateInput): GateResult {
    const reasons: string[] = [];
    const improvements: string[] = [];
    let blocked = false;
    let caution = false;

    const { personalScore, utilization, inquiries6m, negativeItems } = input;

    // BLOCK rules
    if (personalScore !== null && personalScore !== undefined && personalScore < 620) {
        blocked = true;
        reasons.push(`Personal score ${personalScore} is below minimum threshold of 620.`);
        improvements.push("Work to bring personal score above 620 before applying.");
    }
    if (utilization !== null && utilization !== undefined && utilization > 0.70) {
        blocked = true;
        reasons.push(`Credit utilization at ${(utilization * 100).toFixed(1)}% exceeds 70% hard limit.`);
        improvements.push("Pay down balances to bring utilization below 50%.");
    }
    if (inquiries6m !== null && inquiries6m !== undefined && inquiries6m > 5) {
        blocked = true;
        reasons.push(`${inquiries6m} hard inquiries in last 6 months exceeds limit of 5.`);
        improvements.push("Wait 6 months before applying to allow inquiries to age off.");
    }
    if (negativeItems !== null && negativeItems !== undefined && negativeItems > 3) {
        blocked = true;
        reasons.push(`${negativeItems} negative items exceed the limit of 3.`);
        improvements.push("Dispute and resolve negative items before applying.");
    }

    // CAUTION rules (only if not already blocked)
    if (!blocked) {
        if (utilization !== null && utilization !== undefined && utilization > 0.50) {
            caution = true;
            reasons.push(`Utilization at ${(utilization * 100).toFixed(1)}% is elevated (>50%). Lenders may flag this.`);
            improvements.push("Reduce utilization below 30% for best approval odds.");
        }
        if (inquiries6m !== null && inquiries6m !== undefined && inquiries6m > 3) {
            caution = true;
            reasons.push(`${inquiries6m} inquiries in 6 months is elevated. Some lenders limit at 4.`);
            improvements.push("Limit new applications for 90 days.");
        }
    }

    return { blocked, caution, reasons, improvements };
}
