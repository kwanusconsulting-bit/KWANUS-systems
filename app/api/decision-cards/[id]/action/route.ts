import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { action } = body; // e.g., "DISMISS", "COMPLETE"

    // Verify ownership
    const card = await prisma.decisionCard.findUnique({
        where: { id },
        include: { user: true },
    });

    if (!card) {
        return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    if (card.user.clerkUserId !== userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let status = "PENDING";
    if (action === "DISMISS") status = "DISMISSED";
    if (action === "COMPLETE") status = "ACTIONED";

    const updatedCard = await prisma.decisionCard.update({
        where: { id },
        data: { status },
    });

    return NextResponse.json(updatedCard);
}
