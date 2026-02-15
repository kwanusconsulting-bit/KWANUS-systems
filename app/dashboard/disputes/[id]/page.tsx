export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import DisputeWorkspace from "@/components/disputes/DisputeWorkspace";

export default async function DisputePage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const dispute = await prisma.dispute.findUnique({
        where: { id },
        include: {
            evidence: true,
            letters: true,
        },
    });

    return <DisputeWorkspace dispute={dispute} />;
}
