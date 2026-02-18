export interface CFOCardOutput {
    title: string;
    description: string;
    type: "INFO" | "ACTION" | "URGENT";
    priority: number;
    actionLabel?: string;
    proposal: {
        requiresHumanApproval: true;
        action: string;
        recommendation: Record<string, unknown>;
        reasoning: string[];
    };
}

interface FinanceSnapshotInput {
    revenue: number;
    expenses: number;
    period: string;
}

export function generateCFOCards(snapshot?: FinanceSnapshotInput | null): CFOCardOutput[] {
    const cards: CFOCardOutput[] = [];

    if (!snapshot) {
        cards.push({
            title: "Establish Tax Reserve",
            description: "No financial data linked yet. Recommend setting aside 25% of all net income for taxes immediately.",
            type: "INFO",
            priority: 5,
            actionLabel: "Connect Finance",
            proposal: {
                requiresHumanApproval: true,
                action: "SETUP_RESERVE",
                recommendation: { reservePercent: 25 },
                reasoning: ["Standard safe harbor for freelance/LLC taxes.", "Prevents year-end liquidity crisis."]
            }
        });
        return cards;
    }

    if (snapshot.revenue > 0) {
        cards.push({
            title: "Reserve 25% of Income",
            description: `Based on revenue of $${(snapshot.revenue / 100).toFixed(2)}, move $${((snapshot.revenue * 0.25) / 100).toFixed(2)} to your tax account.`,
            type: "ACTION",
            priority: 8,
            actionLabel: "Log Transfer",
            proposal: {
                requiresHumanApproval: true,
                action: "RESERVE_TAX",
                recommendation: { reservePercent: 25, amountCents: Math.floor(snapshot.revenue * 0.25) },
                reasoning: ["Revenue detected.", "Tax liability accrues immediately upon receipt."]
            }
        });
    }

    if (snapshot.revenue > 0 && snapshot.expenses > 0) {
        if ((snapshot.expenses / snapshot.revenue) > 0.70) {
            cards.push({
                title: "High Expense Ratio Detected",
                description: `Expenses are ${(snapshot.expenses / snapshot.revenue * 100).toFixed(1)}% of revenue. Review vendor costs immediately.`,
                type: "URGENT",
                priority: 9,
                actionLabel: "Review Vendors",
                proposal: {
                    requiresHumanApproval: true,
                    action: "REVIEW_COSTS",
                    recommendation: { targetReductionPercent: 15 },
                    reasoning: ["Margins compressed below healthy levels (30%)."]
                }
            });
        }
    }

    return cards;
}
