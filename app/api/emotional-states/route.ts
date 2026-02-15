export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { safeApi } from "@/lib/safe-api";

export async function GET(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const states = await prisma.emotionalSnapshot.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            take: 20,
        });

        return states;
    }, req);
}

export async function POST(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { mode, intensity, notes } = await req.json();

        const state = await prisma.emotionalSnapshot.create({
            data: {
                userId: user.id,
                mode: mode || "neutral",
                intensity: parseFloat(intensity),
                notes
            },
        });

        return state;
    }, req);
}
