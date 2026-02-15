export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { letterTemplates } from "@/lib/disputes/letter-templates"
import { applyMergeFields } from "@/lib/disputes/merge-fields"

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: disputeId } = await params
    const body = await req.json()

    const templateName = body.template as keyof typeof letterTemplates
    const fields = body.fields || {}

    const template = letterTemplates[templateName]
    if (!template) {
        return NextResponse.json(
            { error: "Invalid template" },
            { status: 400 }
        )
    }

    const content = applyMergeFields(template, fields)

    const letter = await prisma.letter.create({
        data: {
            disputeId,
            type: templateName.toUpperCase() as any, // Cast to any to avoid enum issues if strictly typed differently
            content,
        },
    })

    return NextResponse.json(letter)
}
