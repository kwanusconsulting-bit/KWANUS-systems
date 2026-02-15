import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { recommendDisputes } from "@/lib/disputes";

export async function POST(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        const { creditItemIds } = await req.json();

        if (!Array.isArray(creditItemIds) || creditItemIds.length === 0) {
            return NextResponse.json({ error: "creditItemIds required" }, { status: 400 });
        }

        const items = await prisma.creditItem.findMany({
            where: {
                id: { in: creditItemIds },
                user: { id: user.id },
            },
        });

        const recommendations = recommendDisputes(items);

        return NextResponse.json({ recommendations });
    } catch (e: any) {
        console.error("[API] Recommendation Error:", e);
        return NextResponse.json({ error: "Recommendation failed" }, { status: 500 });
    }
}
