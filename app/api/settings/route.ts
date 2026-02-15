import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({});

    const settings = await prisma.userSettings.findUnique({
        where: { userId }
    });

    return NextResponse.json(settings || {});
}
