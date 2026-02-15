export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import SettingsCenter from "@/components/settings/SettingsCenter";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function SettingsPage() {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId) throw new Error("Not authenticated");

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            settings: true,
        },
    });

    // Merge shared identity data
    const mergedUser = {
        ...user,
        email: clerkUser?.emailAddresses[0]?.emailAddress,
        name: clerkUser?.firstName ? `${clerkUser.firstName} ${clerkUser.lastName}` : user?.name,
        imageUrl: clerkUser?.imageUrl,
    };

    return (
        <div className="space-y-6">
            <PageHeader
                ritualTitle="IDENTITY CHAMBER"
                title="Settings"
                subtitle="Calibrate your presence and align your system identity"
            />
            <SettingsCenter user={mergedUser} />
        </div>
    );
}
