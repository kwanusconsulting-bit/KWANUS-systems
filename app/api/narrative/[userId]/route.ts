import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Derive userId from the URL path instead of using typed route context.
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  // Example path: /api/narrative/123 → ["api", "narrative", "123"]
  const userId = parts[parts.length - 1];

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId param" },
      { status: 400 }
    );
  }

  try {
    const events = await prisma.narrativeEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Narrative Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch story" },
      { status: 500 }
    );
  }
}
