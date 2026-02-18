import { NextResponse } from "next/server";

// NOTE: Next.js 15 typing is strict and can break builds across versions.
// We intentionally keep the context untyped here to avoid invalid GET export typing.
// This is safe and will be tightened later once the app is stable.

export async function GET(_req: Request, context: any) {
    const userId: string = context?.params?.userId;

    if (!userId) {
        return NextResponse.json({ ok: false, error: "Missing userId param" }, { status: 400 });
    }

    return NextResponse.json({
        ok: true,
        userId,
        narrative: {
            title: "KWANUS Narrative (stub)",
            summary: "Route handler is Next.js 15 build-safe. Replace with real implementation later."
        }
    });
}
