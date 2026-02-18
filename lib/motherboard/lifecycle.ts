import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const EXPIRY_HOURS = 72;

export type CardAction = "APPROVE" | "REJECT" | "HOLD";

/**
 * Approve a DecisionCard — marks it APPROVED and stamps approvedAt.
 */
export async function approveCard(cardId: string, requestId?: string) {
    return prisma.decisionCard.update({
        where: { id: cardId },
        data: {
            status: "APPROVED",
            approvedAt: new Date(),
            requestId: requestId ?? null
        }
    });
}

/**
 * Reject a DecisionCard — marks it REJECTED and stamps rejectedAt.
 */
export async function rejectCard(cardId: string, requestId?: string) {
    return prisma.decisionCard.update({
        where: { id: cardId },
        data: {
            status: "REJECTED",
            rejectedAt: new Date(),
            requestId: requestId ?? null
        }
    });
}

/**
 * Hold a DecisionCard — pauses it for later review.
 */
export async function holdCard(cardId: string, requestId?: string) {
    return prisma.decisionCard.update({
        where: { id: cardId },
        data: {
            status: "HOLD",
            heldAt: new Date(),
            requestId: requestId ?? null
        }
    });
}

/**
 * Expire all PENDING cards older than EXPIRY_HOURS for a tenant's users.
 * Returns count of expired cards.
 */
export async function expireStaleCards(tenantId: string): Promise<number> {
    const cutoff = new Date(Date.now() - EXPIRY_HOURS * 60 * 60 * 1000);

    // Get all users in tenant
    const users = await prisma.user.findMany({
        where: { tenantId },
        select: { id: true }
    });
    const userIds = users.map(u => u.id);

    const result = await prisma.decisionCard.updateMany({
        where: {
            userId: { in: userIds },
            status: "PENDING",
            createdAt: { lt: cutoff }
        },
        data: { status: "EXPIRED" }
    });

    return result.count;
}

/**
 * Set expiresAt on a newly created card (72h from now).
 */
export function cardExpiresAt(): Date {
    return new Date(Date.now() + EXPIRY_HOURS * 60 * 60 * 1000);
}
