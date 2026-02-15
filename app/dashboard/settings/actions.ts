"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { notify } from "@/lib/notify";

export async function saveSettings(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const themeOverride = formData.get("themeOverride") as string || "SYSTEM";
    const notificationsEnabled = formData.get("notificationsEnabled") === "on";
    const emotionalEngineEnabled = formData.get("emotionalEngineEnabled") === "on";

    await prisma.userSettings.upsert({
        where: { userId },
        update: {
            themeOverride,
            notificationsEnabled,
            emotionalEngineEnabled
        },
        create: {
            userId,
            themeOverride,
            notificationsEnabled,
            emotionalEngineEnabled
        }
    });

    await logActivity(userId, "PROFILE_UPDATED", `Updated system settings (Theme: ${themeOverride})`);
    await notify(userId, "System settings updated successfully");

    revalidatePath("/dashboard/settings");
}
