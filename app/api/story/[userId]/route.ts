import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const userId = parts[parts.length - 1];

    if (!userId) {
        return NextResponse.json(
            { ok: false, error: "Missing userId param" },
            { status: 400 }
        );
    }

    return NextResponse.json({
        ok: true,
        userId,
        story: {
            title: "KWANUS Story (stub)",
            summary: "Renamed from narrative to story to bypass Vercel build cache ghost.",
        },
    });
}
