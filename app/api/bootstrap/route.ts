import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
        include: {
            tenant: true,
            decisionCards: {
                where: { status: "PENDING" },
                orderBy: { priority: "desc" },
            },
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            tenant: user.tenant,
        },
        decisionCards: user.decisionCards,
        config: {
            environment: process.env.NODE_ENV,
            version: "1.0.0-kernel",
        },
    });
}
