import { prisma } from "@/lib/prisma";

export async function logEvent(params: {
    userId: string;
    type: string;
    details?: Record<string, any>;
}) {
    const { userId, type, details } = params;

    return prisma.systemEvent.create({
        data: {
            userId,
            type,
            details: details ? JSON.stringify(details) : null
        }
    });
}

export async function getRecentEvents(limit = 20) {
    return prisma.systemEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: limit
    });
}
