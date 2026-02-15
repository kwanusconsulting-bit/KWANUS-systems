"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { logActivity } from "@/lib/activity";
import { notify } from "@/lib/notify";

export async function createCreditItem(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const creditorName = formData.get("creditorName") as string || formData.get("creditor") as string;
    const accountNumber = formData.get("accountNumber") as string;

    await prisma.creditItem.create({
        data: {
            userId,
            creditorName,
            accountNumber,
            balance: formData.get("balance") ? Number(formData.get("balance")) : null,
            status: formData.get("status") as string || "OPEN",
            emotionalTone: formData.get("emotionalTone") as string | null
        }
    });

    await logActivity(userId, "CREDIT_ITEM_CREATED", `Added credit item ${creditorName}`);
    await notify(userId, `Credit item added: ${creditorName}`);

    revalidatePath("/dashboard/credit-items");
}

export async function updateCreditItem(id: string, formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const creditorName = formData.get("creditorName") as string || formData.get("creditor") as string;

    await prisma.creditItem.update({
        where: { id, userId },
        data: {
            creditorName,
            accountNumber: formData.get("accountNumber") as string,
            balance: formData.get("balance") ? Number(formData.get("balance")) : null,
            status: formData.get("status") as string,
            emotionalTone: formData.get("emotionalTone") as string | null
        }
    });

    await logActivity(userId, "CREDIT_ITEM_UPDATED", `Updated credit item ${creditorName}`);
    await notify(userId, `Credit item updated: ${creditorName}`);

    revalidatePath("/dashboard/credit-items");
}

export async function deleteCreditItem(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    await prisma.creditItem.delete({
        where: { id, userId }
    });

    await logActivity(userId, "CREDIT_ITEM_DELETED", `Deleted credit item ${id}`);
    await notify(userId, `Credit item removed`);

    revalidatePath("/dashboard/credit-items");
}
