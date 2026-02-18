import { PrismaClient } from "@prisma/client";
import { generateCFOCards } from "./producers/cfo";
import { generateMarketingCampaign } from "./producers/marketing";
import { scanTextCompliance } from "./producers/compliance";
import { assertProposalOnly } from "./guards";
import { generateFundingCards } from "./producers/funding";

const prisma = new PrismaClient();

export async function runMotherboard(tenantId: string): Promise<number> {
    const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId },
        include: { financeSnapshots: { orderBy: { createdAt: "desc" }, take: 1 } }
    });

    if (!tenant) throw new Error("Tenant not found");

    const financeSnapshot = tenant.financeSnapshots[0] || null;
    let cardCount = 0;

    // Find first user in tenant
    const user = await prisma.user.findFirst({ where: { tenantId } });
    if (!user) {
        console.warn("No users found for tenant", tenantId);
        return 0;
    }

    // 1. CFO Producer
    try {
        const cfoCards = generateCFOCards(financeSnapshot);
        for (const card of cfoCards) {
            assertProposalOnly(card.proposal);
            await prisma.decisionCard.create({
                data: {
                    userId: user.id,
                    title: card.title,
                    description: `${card.description}\n\nPROPOSAL: ${JSON.stringify(card.proposal)}`,
                    type: "CFO",
                    status: "PENDING",
                    priority: card.priority,
                    actionLabel: card.actionLabel,
                }
            });
            await prisma.eventLog.create({
                data: {
                    tenantId,
                    userId: user.id,
                    action: "MOTHERBOARD_CFO_PROPOSAL",
                    resource: "DecisionCard",
                    metadata: JSON.stringify(card.proposal)
                }
            });
            cardCount++;
        }
    } catch (error) {
        console.error("CFO Producer Failed:", error);
    }

    // 2. Marketing Producer
    try {
        const campaign = generateMarketingCampaign({ offer: "Credit Repair Service", audience: "Homebuyers" });
        await prisma.decisionCard.create({
            data: {
                userId: user.id,
                title: "Weekly Marketing Campaign Proposal",
                description: `Generated ${campaign.variants.length} variants for ${campaign.campaignContext.audience}.\n\n${JSON.stringify(campaign, null, 2)}`,
                type: "MARKETING",
                status: "PENDING",
                priority: 5,
                actionLabel: "Review Creatives"
            }
        });
        await prisma.eventLog.create({
            data: {
                tenantId,
                userId: user.id,
                action: "MOTHERBOARD_MARKETING_PROPOSAL",
                resource: "DecisionCard",
                metadata: JSON.stringify(campaign)
            }
        });
        cardCount++;
    } catch (error) {
        console.error("Marketing Producer Failed:", error);
    }

    // 3. Compliance Scan (sample)
    try {
        const sampleText = "We guarantee to raise your score by 100 points in 30 days!";
        const outcome = scanTextCompliance(sampleText);
        if (!outcome.isCompliant) {
            await prisma.decisionCard.create({
                data: {
                    userId: user.id,
                    title: "Compliance Risk Detected (Sample Scan)",
                    description: `Routine scan found issues.\n\nViolations: ${JSON.stringify(outcome.violations)}`,
                    type: "COMPLIANCE",
                    status: "PENDING",
                    priority: 10,
                    actionLabel: "Fix Copy"
                }
            });
            await prisma.eventLog.create({
                data: {
                    tenantId,
                    userId: user.id,
                    action: "MOTHERBOARD_COMPLIANCE_SCAN",
                    resource: "DecisionCard",
                    metadata: JSON.stringify(outcome)
                }
            });
            cardCount++;
        }
    } catch (error) {
        console.error("Compliance Producer Failed:", error);
    }

    // 4. Funding Producer
    try {
        const fundingCards = await generateFundingCards(tenantId);
        for (const card of fundingCards) {
            assertProposalOnly(card.proposal);
            await prisma.decisionCard.create({
                data: {
                    userId: user.id,
                    title: card.title,
                    description: card.description,
                    type: card.type,
                    status: "PENDING",
                    priority: card.priority,
                    actionLabel: card.actionLabel
                }
            });
            await prisma.eventLog.create({
                data: {
                    tenantId,
                    userId: user.id,
                    action: "MOTHERBOARD_FUNDING_PROPOSAL",
                    resource: "DecisionCard",
                    metadata: JSON.stringify(card.proposal)
                }
            });
            cardCount++;
        }
    } catch (error) {
        console.error("Funding Producer Failed:", error);
    }

    return cardCount;
}
