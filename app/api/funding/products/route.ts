export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/currentUser"

export async function GET() {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await prisma.fundingProfile.findFirst({
        where: { userId: user.id },
        include: {
            applications: true,
        },
    })

    if (!profile || profile.score === null) {
        return NextResponse.json([], { status: 200 })
    }

    const products = await prisma.bankProduct.findMany({
        where: {
            minScore: { lte: profile.score },
            maxScore: { gte: profile.score },
        },
        include: { bank: true },
    })

    return NextResponse.json(products)
}
