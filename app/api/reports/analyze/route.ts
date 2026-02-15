import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseReportText, analyzeItems } from "@/lib/report";

export async function POST(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        const { reportId, rawText } = await req.json();

        if (!reportId || !rawText) {
            return NextResponse.json({ error: "reportId and rawText required" }, { status: 400 });
        }

        const report = await prisma.creditReport.findFirst({
            where: { id: reportId, userId: user.id },
        });

        if (!report) {
            return NextResponse.json({ error: "Report not found" }, { status: 404 });
        }

        const parsedItems = parseReportText(rawText);
        const analyzedItems = analyzeItems(parsedItems);

        await prisma.$transaction(
            analyzedItems.map((item) =>
                prisma.creditItem.create({
                    data: {
                        user: { connect: { id: user.id } },
                        report: { connect: { id: report.id } },
                        creditorName: item.creditorName,
                        accountNumber: item.accountNumber,
                        status: item.status,
                        balance: item.balance,
                        isNegative: item.isNegative,
                    },
                })
            )
        );

        // Record system event
        await prisma.systemEvent.create({
            data: {
                userId: user.id,
                type: "CREDIT_REPORT_ANALYZED",
                details: `Analyzed report ${reportId}. Created ${analyzedItems.length} items.`
            }
        });

        return NextResponse.json({ success: true, count: analyzedItems.length });
    } catch (e: any) {
        console.error("[API] Analyze Error:", e);
        return NextResponse.json({ error: "Analyze failed" }, { status: 500 });
    }
}
