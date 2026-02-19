import { NextResponse } from "next/server";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;

    return NextResponse.json({
        ok: true,
        userId,
        narrative: {
            title: "KWANUS Narrative (stub)",
            summary: "Route handler is Next.js 15 build-safe."
        }
    });
}
