"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { logActivity } from "@/lib/activity";
import { notify } from "@/lib/notify";
import { redirect } from "next/navigation";

export async function createDispute(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const creditorName = formData.get("creditorName") as string || formData.get("creditor") as string;
    const accountNumber = formData.get("accountNumber") as string;

    await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
            id: userId,
            email: `${userId}@kwanus.com`,
            name: "Steward"
        }
    });

    await prisma.dispute.create({
        data: {
            userId,
            bureau: formData.get("bureau") as string || "OTHER",
            creditorName,
            accountNumber,
            reason: formData.get("reason") as string,
            emotionalTone: formData.get("emotionalTone") as string | null
        }
    });

    await logActivity(userId, "DISPUTE_CREATED", `Created dispute for ${creditorName}`);
    await notify(userId, `New dispute created for ${creditorName}`);

    revalidatePath("/dashboard/disputes");
}

export async function updateDispute(id: string, formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const creditorName = formData.get("creditorName") as string || formData.get("creditor") as string;

    await prisma.dispute.update({
        where: { id, userId },
        data: {
            bureau: formData.get("bureau") as string,
            creditorName,
            accountNumber: formData.get("accountNumber") as string,
            reason: formData.get("reason") as string,
            status: (formData.get("status") as any) || "OPEN",
            emotionalTone: formData.get("emotionalTone") as string | null
        }
    });

    await logActivity(userId, "DISPUTE_UPDATED", `Updated dispute for ${creditorName}`);
    await notify(userId, `Dispute updated for ${creditorName}`);

    revalidatePath("/dashboard/disputes");
}

export async function deleteDispute(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    await prisma.dispute.delete({
        where: { id, userId }
    });

    await logActivity(userId, "DISPUTE_DELETED", `Deleted dispute ${id}`);
    await notify(userId, `Dispute deleted`);

    revalidatePath("/dashboard/disputes");
    redirect("/dashboard/disputes");
}
