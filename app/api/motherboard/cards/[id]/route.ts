import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { approveCard, rejectCard, holdCard } from "@/lib/motherboard/lifecycle";
import { createRequestId, logger } from "@/lib/logger";

const prisma = new PrismaClient();

// GET /api/motherboard/cards/[id]
export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const card = await prisma.decisionCard.findUnique({ where: { id } });
    if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(card);
}

// PATCH /api/motherboard/cards/[id]
// Body: { action: "APPROVE" | "REJECT" | "HOLD" }
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const requestId = createRequestId();
    const { id } = await params;

    try {
        const { action } = await req.json();

        if (!["APPROVE", "REJECT", "HOLD"].includes(action)) {
            return NextResponse.json({ error: "Invalid action. Use APPROVE, REJECT, or HOLD." }, { status: 400 });
        }

        const card = await prisma.decisionCard.findUnique({ where: { id } });
        if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });

        if (card.status !== "PENDING" && card.status !== "HOLD") {
            return NextResponse.json(
                { error: `Card is already ${card.status} — cannot transition.` },
                { status: 409 }
            );
        }

        let updated;
        if (action === "APPROVE") updated = await approveCard(id, requestId);
        else if (action === "REJECT") updated = await rejectCard(id, requestId);
        else updated = await holdCard(id, requestId);

        // Audit log
        await prisma.eventLog.create({
            data: {
                action: `CARD_${action}`,
                resource: "DecisionCard",
                metadata: JSON.stringify({ cardId: id, requestId, previousStatus: card.status })
            }
        });

        logger.info(`Card ${action.toLowerCase()}d`, { requestId, cardId: id });

        return NextResponse.json(updated);
    } catch (error: any) {
        logger.error("Card lifecycle error", { requestId, error: error.message });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
