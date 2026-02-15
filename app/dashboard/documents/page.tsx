export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import DocumentsGrid from "@/components/documents/DocumentsGrid";
import { PageHeader } from "@/components/ui";

export default async function DocumentsPage() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const documents = await prisma.document.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <PageHeader
                ritualTitle="CEREMONIAL ARCHIVE"
                title="Documents"
                subtitle="Your secure vault of historical and active lineage"
            />
            <DocumentsGrid documents={documents} />
        </div>
    );
}
