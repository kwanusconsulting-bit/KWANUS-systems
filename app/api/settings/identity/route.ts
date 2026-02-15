import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        const updated = await prisma.user.update({
            where: { id: userId },
            data: {
                displayName: body.displayName,
                fullName: body.fullName,
                address: body.address,
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Identity Update Error:", error);
        return NextResponse.json({ error: "Failed to update identity" }, { status: 500 });
    }
}
