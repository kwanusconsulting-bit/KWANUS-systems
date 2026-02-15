import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ notifications: [], unread: 0 });

    const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 20
    });

    const unread = notifications.filter((n) => !n.read).length;

    return NextResponse.json({ notifications, unread });
}
