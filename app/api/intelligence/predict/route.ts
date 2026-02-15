import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;

    if (!userId) {
        return NextResponse.json({
            insight: "Welcome to KWANUS OS.",
            next: null,
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                disputes: true,
                fundings: true,
                documents: true,
                emotionalSnapshots: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                },
                notifications: {
                    where: { read: false },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!user) {
            return NextResponse.json({
                insight: "Identity sync in progress...",
                next: null,
            });
        }

        // SIGNALS
        const hasDraftDisputes = user.disputes.some((d: any) => d.status === "OPEN");
        const hasPendingFunding = user.fundings.some((f: any) => f.status === "PENDING");
        const hasNoDocuments = user.documents.length === 0;

        // INTERPRETATION + GUIDANCE
        if (hasDraftDisputes) {
            return NextResponse.json({
                insight: "You have dispute drafts ready.",
                next: "Review and send your dispute letters.",
            });
        }

        if (hasPendingFunding) {
            return NextResponse.json({
                insight: "Your funding application is in review.",
                next: "Check your funding status for updates.",
            });
        }

        if (hasNoDocuments) {
            return NextResponse.json({
                insight: "You haven’t uploaded any documents yet.",
                next: "Add your first document to complete your profile.",
            });
        }

        return NextResponse.json({
            insight: "You’re on track.",
            next: "Explore your dashboard for your next step.",
        });
    } catch (error) {
        console.error("Predictive Engine Error:", error);
        return NextResponse.json({
            insight: "OS Consciousness stabilizing...",
            next: "Observe while the universe aligns.",
        });
    }
}
