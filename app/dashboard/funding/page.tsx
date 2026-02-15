export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import FundingList from "@/components/funding/FundingList";

export default async function FundingPage() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const applications = await prisma.fundingApplication.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });

    return <FundingList apps={applications} />;
}
