export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/currentUser"
import { sendEmail } from "@/lib/email/send"
import { EmailTemplates } from "@/lib/email/templates"

export async function POST() {
    // Simple placeholder logic
    const score = Math.floor(Math.random() * 40) + 60 // 60–100
    const user = await getCurrentUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.fundingProfile.updateMany({
        where: { userId: user.id },
        data: {
            score: Math.round(score),
            updatedAt: new Date()
        },
    })

    // Notify User
    await sendEmail({
        to: user.email,
        ...EmailTemplates.fundingScoreReady(score),
    })

    return NextResponse.json({ score })
}
