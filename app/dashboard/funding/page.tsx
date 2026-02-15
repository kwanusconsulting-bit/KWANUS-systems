export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import FundingList from "@/components/funding/FundingList";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function FundingPage() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const applications = await prisma.fundingApplication.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-6">
            <PageHeader
                ritualTitle="EXPANSION RITUAL"
                title="Funding"
                subtitle="Navigate your path to systemic growth and liquidity"
            />
            <FundingList apps={applications} />
        </div>
    );
}
