export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: disputeId } = await params

    const dispute = await prisma.dispute.findUnique({
        where: { id: disputeId },
        include: {
            rounds: {
                orderBy: { roundNumber: "asc" },
            },
            letters: {
                orderBy: { createdAt: "asc" },
            },
        },
    })

    if (!dispute) {
        return NextResponse.json({ error: "Dispute not found" }, { status: 404 })
    }

    // Combine and sort events
    const timeline = [
        {
            id: `dispute-${dispute.id}`,
            type: "dispute_created",
            date: dispute.createdAt,
            label: "Dispute Created",
        },
        ...dispute.rounds.map((round) => ({
            id: `round-${round.id}`,
            type: "round",
            date: round.createdAt,
            label: `Round ${round.roundNumber} Started`,
            roundNumber: round.roundNumber,
            status: round.status,
        })),
        ...dispute.letters.map((letter) => ({
            id: `letter-${letter.id}`,
            type: "letter",
            date: letter.createdAt,
            label: `${letter.type} Letter Generated`,
            content: letter.content,
        })),
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return NextResponse.json(timeline)
}
