"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { logActivity } from "@/lib/activity";
import { notify } from "@/lib/notify";

export async function createFunding(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const productType = formData.get("productType") as string;
    const requestedAmount = Number(formData.get("requestedAmount") || formData.get("amountRequested"));

    await prisma.fundingApplication.create({
        data: {
            userId,
            productType,
            requestedAmount,
            notes: formData.get("notes") as string | null,
            emotionalTone: formData.get("emotionalTone") as string | null
        }
    });

    await logActivity(userId, "FUNDING_CREATED", `Applied for ${productType}`);
    await notify(userId, `Funding application submitted for ${productType}`);

    revalidatePath("/dashboard/funding");
}

export async function updateFunding(id: string, formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const productType = formData.get("productType") as string;

    await prisma.fundingApplication.update({
        where: { id, userId },
        data: {
            productType,
            requestedAmount: Number(formData.get("requestedAmount") || formData.get("amountRequested")),
            status: formData.get("status") as string,
            notes: formData.get("notes") as string | null,
            emotionalTone: formData.get("emotionalTone") as string | null
        }
    });

    await logActivity(userId, "FUNDING_UPDATED", `Updated funding application for ${productType}`);
    await notify(userId, `Funding application updated`);

    revalidatePath("/dashboard/funding");
}

export async function deleteFunding(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    await prisma.fundingApplication.delete({
        where: { id, userId }
    });

    await logActivity(userId, "FUNDING_DELETED", `Deleted funding application ${id}`);
    await notify(userId, `Funding application deleted`);

    revalidatePath("/dashboard/funding");
}
