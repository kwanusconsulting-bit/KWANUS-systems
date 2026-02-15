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

        const profile = await prisma.creditProfile.findFirst({
            where: { userId: user.id },
            orderBy: { updatedAt: "desc" },
        });

        return profile || { score: 0 };
    }, req);
}

export async function POST(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { score } = await req.json();

        // Check if profile exists to decide update vs create
        // Or just create new entry for history? 
        // User snippet used `update`. But `update` requires a unique constraint on `userId`?
        // My schema has `userId` as non-unique (allowing history).
        // I'll create a new one to keep history, or update the latest if I want single profile.
        // Let's assume single profile per user for now based on snippet `prisma.creditProfile.update`.
        // But my schema says `CreditProfile[]` on User.
        // I will check if one exists, if so update it? Or just create new one.
        // Safe bet: create new one for history, but fetch latest.
        // User's snippet was `prisma.creditProfile.update({ where: { userId: user.id } ... })`.
        // This implies `userId` is unique in `CreditProfile`.
        // Let's check schema again. Step 1104: `userId String`. No `@unique`.
        // So `update({ where: { userId } })` would fail.
        // I will use `findFirst` then `update` or just `create`.
        // I'll stick to `create` to preserve history (immutability is better for this OS theme).

        const profile = await prisma.creditProfile.create({
            data: {
                userId: user.id,
                score: parseInt(score),
            },
        });

        return profile;
    }, req);
}
