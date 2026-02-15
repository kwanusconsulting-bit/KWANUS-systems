export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/currentUser"
import { sendEmail } from "@/lib/email/send"
import { EmailTemplates } from "@/lib/email/templates"

export async function POST(req: Request) {
    const body = await req.json()
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const application = await prisma.fundingApplication.create({
        data: {
            userId: user.id,
            profileId: body.profileId,
            productId: body.productId,
            productType: body.productType || "OTHER",
            status: "PENDING",
            fundingType: body.fundingType || "PERSONAL",
            requestedAmount: parseFloat(body.requestedAmount || "0"),
        },
    })

    // Notify User
    await sendEmail({
        to: user.email,
        ...EmailTemplates.fundingApplicationSubmitted(),
    })

    // Notify Admin
    await sendEmail({
        to: "admin@kwanus.com",
        ...EmailTemplates.adminAlert(`New funding application from ${user.id}`),
    })

    return NextResponse.json(application)
}
