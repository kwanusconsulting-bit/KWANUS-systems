import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const userId = "demo-user"; // replace with real auth later

    const profile = await prisma.userProfile.findUnique({
        where: { userId }
    });

    return NextResponse.json({
        state: profile?.emotionalState || "NEUTRAL"
    });
}
