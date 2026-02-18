import { NextResponse } from "next/server";

type RouteContext = {
    params: Promise<{ userId: string }>;
};

export async function GET(_req: Request, context: RouteContext) {
    const { userId } = await context.params;

    // TODO: Replace with real implementation.
    // Keep this minimal so build passes. You can expand later.
    return NextResponse.json({
        ok: true,
        userId,
        narrative: {
            title: "KWANUS Narrative (stub)",
            summary: "Route is wired correctly for Next.js 15. Replace this response with real narrative generation."
        }
    });
}
