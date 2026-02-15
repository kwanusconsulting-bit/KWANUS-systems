export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    try {
        const user = await getCurrentUser();

        const latestReport = await prisma.creditReport.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            include: {
                items: {
                    orderBy: { createdAt: "desc" }
                }
            },
        });

        if (!latestReport) {
            return NextResponse.json({ report: null, message: "No reports found." });
        }

        return NextResponse.json({
            success: true,
            report: latestReport,
            itemCount: latestReport.items.length
        });
    } catch (error) {
        console.error("[API] Get Latest Report Error:", error);
        return NextResponse.json({ error: "Failed to fetch latest report" }, { status: 500 });
    }
}
