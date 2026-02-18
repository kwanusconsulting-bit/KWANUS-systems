import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Next.js 15 typing can be strict about the second argument in Route Handlers.
 * This implementation avoids the context param entirely by extracting userId from the URL.
 * Deterministic + type-safe + no guessing.
 */
export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const parts = url.pathname.split("/").filter(Boolean);
        const userId = parts[parts.length - 1];

        if (!userId) {
            return NextResponse.json({ error: "MISSING_USER_ID" }, { status: 400 });
        }

        // IMPORTANT: This is a placeholder example.
        // If your narrative data lives elsewhere, adjust ONLY the query target — do not change signature pattern.
        const narratives = await prisma.narrativeEvent.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        return NextResponse.json({ ok: true, userId, narratives });
    } catch (err: any) {
        return NextResponse.json(
            { error: "SERVER_ERROR", message: err?.message ?? "unknown" },
            { status: 500 }
        );
    }
}
