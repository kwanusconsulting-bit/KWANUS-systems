export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import NotificationsCenter from "@/components/notifications/NotificationsCenter";

export default async function NotificationsPage() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return <NotificationsCenter notifications={notifications} />;
}
