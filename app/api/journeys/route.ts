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

        const journeys = await prisma.journey.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            take: 20,
        });

        return journeys;
    }, req);
}

export async function POST(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, description } = await req.json();

        const journey = await prisma.journey.create({
            data: {
                userId: user.id,
                title,
                description,
            },
        });

        return journey;
    }, req);
}
