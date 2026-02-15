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
            <DocumentsGrid documents={documents} />
        </div>
    );
}
