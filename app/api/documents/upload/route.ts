import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, type, url, fundingId, disputeId } = await req.json();

        const doc = await prisma.document.create({
            data: {
                userId,
                title,
                type,
                url,
                fundingId,
                disputeId,
            },
        });

        return NextResponse.json(doc);
    } catch (error) {
        console.error("Manifestation Error:", error);
        return NextResponse.json({ error: "Failed to manifest document" }, { status: 500 });
    }
}
