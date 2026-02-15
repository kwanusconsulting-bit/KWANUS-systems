export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already has data
    const existingProfile = await prisma.creditProfile.findFirst({
        where: { userId: user.id },
    });

    if (existingProfile) {
        return NextResponse.json({ message: "User already initialized" });
    }

    // Create user record in Prisma if it doesn't exist
    const metadata = (user as any).user_metadata;
    await prisma.user.upsert({
        where: { id: user.id },
        create: {
            id: user.id,
            email: user.email!,
            name: metadata?.name || null,
        },
        update: {
            email: user.email!,
            name: metadata?.name || null,
        },
    });

    // Create default credit profile
    await prisma.creditProfile.create({
        data: {
            userId: user.id,
            score: 720, // Default starting score
        },
    });

    // Create default emotional snapshot
    await prisma.emotionalSnapshot.create({
        data: {
            userId: user.id,
            mode: "neutral",
            intensity: 0.5,
            notes: "Initial entry into the universe",
        },
    });

    // Create default journey entry
    await prisma.journey.create({
        data: {
            userId: user.id,
            title: "Entered the Universe",
            description: "The beginning of your KWANUS journey",
        },
    });

    return NextResponse.json({ message: "User initialized successfully" });
}
