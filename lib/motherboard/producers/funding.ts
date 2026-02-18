import { PrismaClient } from "@prisma/client";
import { checkFundingGates } from "../../funding/gates";
import { calculateReadinessScore, ReadinessBand } from "../../funding/score";
import { simulateCapitalStack } from "../../funding/simulator";
import { assertProposalOnly } from "../../motherboard/guards";

const prisma = new PrismaClient();

export interface FundingCardOutput {
    title: string;
    description: string;
    type: "FUNDING";
    priority: number;
    actionLabel?: string;
    proposal: any;
}

export async function generateFundingCards(tenantId: string): Promise<FundingCardOutput[]> {
    const cards: FundingCardOutput[] = [];

    const profile = await prisma.fundingReadiness.findUnique({ where: { tenantId } });

    if (!profile) {
        cards.push({
            title: "Complete Funding Readiness Assessment",
            description: "No funding profile found. Run your readiness assessment to unlock capital simulation.",
            type: "FUNDING",
            priority: 6,
            actionLabel: "Run Assessment",
            proposal: {
                requiresHumanApproval: true,
                action: "COMPLETE_READINESS_ASSESSMENT",
                reasoning: ["No profile data available."]
            }
        });
        return cards;
    }

    const gates = checkFundingGates({
        personalScore: profile.personalScore,
        utilization: profile.utilization,
        inquiries6m: profile.inquiries6m,
        negativeItems: profile.negativeItems
    });

    if (gates.blocked) {
        const proposal = {
            requiresHumanApproval: true,
            action: "RESOLVE_FUNDING_BLOCKERS",
            reasons: gates.reasons,
            improvements: gates.improvements
        };
        assertProposalOnly(proposal);
        cards.push({
            title: "Funding Blocked — Action Required",
            description: `${gates.reasons.join(" | ")}\n\nImprovements: ${gates.improvements.join(" | ")}`,
            type: "FUNDING",
            priority: 10,
            actionLabel: "View Improvements",
            proposal
        });
        return cards;
    }

    const { readinessScore, band } = calculateReadinessScore({
        personalScore: profile.personalScore,
        utilization: profile.utilization,
        inquiries6m: profile.inquiries6m,
        openAccounts: profile.openAccounts,
        negativeItems: profile.negativeItems
    });

    const simulation = simulateCapitalStack({
        readinessBand: band as ReadinessBand,
        readinessScore,
        utilization: profile.utilization
    });

    assertProposalOnly(simulation);

    const bandMessages: Record<string, string> = {
        LOW: "Profile is LOW readiness. Focus on credit repair before applying.",
        MODERATE: "Profile is MODERATE. Capital stacking available — review stack plan.",
        STRONG: "Profile is STRONG. Prepare documentation and begin stacking sequence."
    };

    cards.push({
        title: `Funding Readiness: ${band} (Score: ${readinessScore}/100)`,
        description: `${bandMessages[band]}\n\nEstimated capital: $${simulation.estimatedCapitalLow.toLocaleString()}–$${simulation.estimatedCapitalHigh.toLocaleString()}\n\nStack Plan:\n${simulation.stackPlan.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
        type: "FUNDING",
        priority: band === "STRONG" ? 9 : band === "MODERATE" ? 7 : 5,
        actionLabel: "View Stack Plan",
        proposal: simulation
    });

    if (gates.caution) {
        cards.push({
            title: "Funding Caution Flags Detected",
            description: gates.reasons.join("\n"),
            type: "FUNDING",
            priority: 7,
            actionLabel: "Review Flags",
            proposal: {
                requiresHumanApproval: true,
                action: "REVIEW_CAUTION_FLAGS",
                reasons: gates.reasons,
                improvements: gates.improvements
            }
        });
    }

    return cards;
}
