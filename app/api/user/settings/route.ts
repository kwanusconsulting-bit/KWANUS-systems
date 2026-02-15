export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(req: Request) {
    try {
        const user = await getCurrentUser();
        const { name, email, preferences } = await req.json();

        console.log(`[API] Updating settings for user ${user.id}`);

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                email,
            }
        });

        if (preferences) {
            await prisma.systemEvent.create({
                data: {
                    userId: user.id,
                    type: "SETTINGS_UPDATED",
                    details: JSON.stringify(preferences)
                }
            });
        }

        return NextResponse.json({
            success: true,
            user: updatedUser,
            message: "Settings updated successfully."
        });
    } catch (error) {
        console.error("[API] Settings Error:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
