import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        const events = await prisma.narrativeEvent.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error("Narrative Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 });
    }
}
