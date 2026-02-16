import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const userId = formData.get("userId") as string;

        if (!file || !userId) {
            return NextResponse.json({ error: "Missing file or user ID" }, { status: 400 });
        }

        // 1. Simulating File Storage (In production, upload to S3/Blob)
        // const fileUrl = await uploadToStorage(file); 
        const fileUrl = `https://storage.kwanus.com/uploads/${file.name}`; // Mock URL

        // 2. Simulating OCR / Data Extraction
        // const extractedData = await extractDataFromPDF(file);
        const extractedData = {
            creditor: "Chase Bank",
            accountNumber: "****1234",
            balance: "$4,500.00",
            status: "Collection",
            confidence: 0.99
        };

        // 3. Save to Database
        const document = await prisma.document.create({
            data: {
                userId,
                title: file.name,
                type: file.type.includes("pdf") ? "application/pdf" : "image/jpeg",
                url: fileUrl,
            },
        });

        // 4. Create Credit Item from Extraction
        await prisma.creditItem.create({
            data: {
                userId,
                creditorName: extractedData.creditor,
                accountNumber: extractedData.accountNumber,
                balance: parseFloat(extractedData.balance.replace(/[^0-9.]/g, "")),
                status: extractedData.status,
                isNegative: true,
                reportId: document.id // Linking mock
            }
        });

        return NextResponse.json({
            success: true,
            document,
            extractedData
        });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
