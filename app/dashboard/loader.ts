import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function loadDashboardData() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const [items, disputes, funding, profile] = await Promise.all([
        prisma.creditItem.count({ where: { userId } }),
        prisma.dispute.count({ where: { userId } }),
        prisma.fundingApplication.count({ where: { userId } }),
        prisma.userProfile.findUnique({ where: { userId } })
    ]);

    return {
        items,
        disputes,
        funding,
        emotionalState: profile?.emotionalState || "NEUTRAL"
    };
}
