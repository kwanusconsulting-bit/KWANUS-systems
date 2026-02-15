import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ results: [] });

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    if (!q.trim()) return NextResponse.json({ results: [] });

    const [items, disputes, funding, profiles, activities] = await Promise.all([
        prisma.creditItem.findMany({
            where: {
                userId,
                OR: [
                    { creditorName: { contains: q } },
                    { accountNumber: { contains: q } }
                ]
            },
            take: 5
        }),

        prisma.dispute.findMany({
            where: {
                userId,
                OR: [
                    { creditorName: { contains: q } },
                    { reason: { contains: q } }
                ]
            },
            take: 5
        }),

        prisma.fundingApplication.findMany({
            where: {
                userId,
                OR: [
                    { productType: { contains: q } },
                    { notes: { contains: q } }
                ]
            },
            take: 5
        }),

        prisma.userProfile.findMany({
            where: {
                userId,
                OR: [
                    { emotionalNote: { contains: q } },
                    { story: { contains: q } }
                ]
            },
            take: 2
        }),

        prisma.activity.findMany({
            where: {
                userId,
                message: { contains: q }
            },
            take: 5,
            orderBy: { createdAt: "desc" }
        })
    ]);

    return NextResponse.json({
        results: [
            ...items.map((i: any) => ({ type: "item", id: i.id, title: i.creditorName, subtitle: `Credit Item • ${i.accountNumber}` })),
            ...disputes.map((d: any) => ({ type: "dispute", id: d.id, title: d.creditorName, subtitle: `Dispute • ${d.reason}` })),
            ...funding.map((f: any) => ({ type: "funding", id: f.id, title: f.productType, subtitle: `Funding Request • $${f.amountRequested.toLocaleString()}` })),
            ...profiles.map((p: any) => ({ type: "profile", id: p.id, title: "Identity Profile", subtitle: p.emotionalNote || "Steward Context" })),
            ...activities.map((a: any) => ({ type: "activity", id: a.id, title: a.message, subtitle: "Timeline Event" }))
        ]
    });
}
