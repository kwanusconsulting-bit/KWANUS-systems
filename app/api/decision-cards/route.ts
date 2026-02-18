import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!dbUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cards = await prisma.decisionCard.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cards);
}

export async function POST(req: Request) {
    const { userId } = await auth();
    // In a real scenario, this might be restricted to admin or system processes
    // For now, we allow authenticated users to create cards for themselves for testing

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!dbUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { title, description, type, actionLabel, actionUrl, priority } = body;

    const card = await prisma.decisionCard.create({
        data: {
            userId: dbUser.id,
            title,
            description,
            type: type || "INFO",
            actionLabel,
            actionUrl,
            priority: priority || 0,
        },
    });

    return NextResponse.json(card);
}
