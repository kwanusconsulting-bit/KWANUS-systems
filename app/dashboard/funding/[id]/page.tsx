export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import FundingWorkspace from "@/components/funding/FundingWorkspace";

export default async function EditFundingPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const app = await prisma.fundingApplication.findUnique({
        where: { id },
        include: {
            documents: true,
        },
    });

    return <FundingWorkspace app={app} />;
}
