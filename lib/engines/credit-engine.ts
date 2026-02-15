import { prisma } from "@/lib/prisma";

export async function getOrCreateCreditProfile(userId: string) {
    const existing = await prisma.creditProfile.findFirst({
        where: { userId }
    });

    if (existing) return existing;

    return prisma.creditProfile.create({
        data: {
            userId,
            score: 650
        }
    });
}

export async function updateCreditScore(userId: string, delta: number) {
    const profile = await getOrCreateCreditProfile(userId);

    const nextScore = Math.max(300, Math.min(850, profile.score + delta));

    return prisma.creditProfile.update({
        where: { id: profile.id },
        data: { score: nextScore }
    });
}
