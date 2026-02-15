import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();

    // Create a supabase client for the server
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
        return NextResponse.json({ message: "Welcome to KWANUS OS. I am observing." });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                disputes: {
                    orderBy: { createdAt: 'desc' },
                    take: 5
                },
                fundingApplications: {
                    orderBy: { createdAt: 'desc' },
                    take: 5
                },
                notifications: {
                    where: { read: false },
                    orderBy: { createdAt: 'desc' },
                    take: 1
                },
            },
        });

        if (!user) {
            return NextResponse.json({ message: "Identity sync in progress..." });
        }

        // Simple intelligence logic (expandable)
        if (user.disputes.some((d) => d.stage === "drafting")) {
            return NextResponse.json({
                message: "You have dispute drafts ready. The next step is sending them.",
            });
        }

        if (user.fundingApplications.some((f) => f.status === "pending")) {
            return NextResponse.json({
                message: "Your funding application is in review. Patience is momentum.",
            });
        }

        if (user.notifications.length > 0) {
            const latest = user.notifications[0];
            return NextResponse.json({
                message: latest.title,
            });
        }

        return NextResponse.json({
            message: "You’re on track. Let’s keep moving.",
        });
    } catch (error) {
        console.error("Intelligence Engine Error:", error);
        return NextResponse.json({ message: "OS Consciousness stabilizing..." });
    }
}
