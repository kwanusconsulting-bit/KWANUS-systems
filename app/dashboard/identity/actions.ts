"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { EmotionalState } from "@prisma/client";

export async function saveProfile(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const emotionalNote = formData.get("emotionalNote") as string | null;
    const story = formData.get("story") as string | null;
    const emotionalStateInput = (formData.get("emotionalState") as string) || "NEUTRAL";

    // Type-safe Enum cast
    const emotionalState = (Object.values(EmotionalState).includes(emotionalStateInput as any)
        ? emotionalStateInput
        : "NEUTRAL") as EmotionalState;

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress || `${userId}@kwanus.ai`;

    // Ensure user exists
    await prisma.user.upsert({
        where: { id: userId },
        update: {
            name: user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Steward"
        },
        create: {
            id: userId,
            email,
            name: user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Steward"
        }
    });

    await prisma.userProfile.upsert({
        where: { userId },
        update: {
            emotionalNote,
            story,
            emotionalState,
        },
        create: {
            userId,
            emotionalNote,
            story,
            emotionalState,
        }
    });

    revalidatePath("/dashboard/identity");
}
