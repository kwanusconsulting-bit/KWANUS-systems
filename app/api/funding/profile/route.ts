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
    })

    return NextResponse.json(profile)
}

export async function POST() {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await prisma.fundingProfile.create({
        data: {
            userId: user.id,
            score: null,
        },
    })

    return NextResponse.json(profile)
}
