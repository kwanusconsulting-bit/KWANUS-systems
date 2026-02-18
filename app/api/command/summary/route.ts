import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/command/summary — powers the Founder Command Dashboard
export async function GET() {
    try {
        const [openCards, approvedCards, expiredCards, totalEvents, recentEvents, recentCards] = await Promise.all([
            prisma.decisionCard.count({ where: { status: "PENDING" } }),
            prisma.decisionCard.count({ where: { status: "APPROVED" } }),
            prisma.decisionCard.count({ where: { status: "EXPIRED" } }),
            prisma.eventLog.count(),
            prisma.eventLog.findMany({
                orderBy: { createdAt: "desc" },
                take: 10,
                select: { action: true, resource: true, createdAt: true }
            }),
            prisma.decisionCard.findMany({
                where: { status: { in: ["PENDING", "HOLD"] } },
                orderBy: { priority: "desc" },
                take: 10,
                select: { id: true, title: true, type: true, status: true, priority: true, createdAt: true }
            })
        ]);

        return NextResponse.json({
            openCards,
            approvedCards,
            expiredCards,
            totalEvents,
            recentEvents,
            recentCards
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
