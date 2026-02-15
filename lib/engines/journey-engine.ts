import { prisma } from "@/lib/prisma";

export async function createJourney(params: {
    userId: string;
    title: string;
    description?: string;
}) {
    const { userId, title, description } = params;

    return prisma.journey.create({
        data: {
            userId,
            title,
            description
        }
    });
}

export async function listJourneys(userId: string) {
    return prisma.journey.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });
}
