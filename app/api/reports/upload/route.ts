import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        // For v1: store as text only (no real storage)
        const arrayBuffer = await file.arrayBuffer();
        const text = Buffer.from(arrayBuffer).toString("utf-8");

        const report = await prisma.creditReport.create({
            data: {
                userId: user.id,
                source: "uploaded_pdf",
                fileUrl: "", // or real storage URL
            },
        });

        return NextResponse.json({ reportId: report.id, rawText: text });
    } catch (e: any) {
        console.error("[API] Upload Error:", e);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
