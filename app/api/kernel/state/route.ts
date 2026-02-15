import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { interpretEmotion } from "@/lib/emotionalEngine";
import { interpretPersona } from "@/lib/personaEngine";
import { generateNarrative } from "@/lib/narrativeEngine";
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
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await (prisma.user as any).findUnique({
            where: { id: userId },
            include: {
                emotionalHistory: { orderBy: { timestamp: 'desc' }, take: 2 },
                personaHistory: { orderBy: { timestamp: 'desc' }, take: 1 },
                disputes: true,
                fundings: true,
                timelineEvents: { orderBy: { createdAt: 'desc' }, take: 10 },
                narrativeEvents: { orderBy: { createdAt: 'desc' }, take: 5 },
                presence: { orderBy: { timestamp: 'desc' }, take: 1 },
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // 1. Emotional interpretation
        const emotionalInsight = interpretEmotion(user.emotionalHistory);

        // 2. Persona interpretation
        const currentPersona = user.personaHistory[0]?.mode || "balanced";
        const personaProfile = interpretPersona(currentPersona);

        // 3. Narrative generation (interpreting the current user state)
        const narrativeBeats = generateNarrative(user);

        // 4. Predictive insight (Internal call to existing logic or reproduced logic)
        // reproducible predictive logic from current signals
        const hasDraftDisputes = user.disputes.some((d: any) => d.status === "OPEN");
        const hasPendingFunding = user.fundings.some((f: any) => f.status === "PENDING");

        const predictive = {
            insight: hasDraftDisputes ? "You have dispute drafts ready." :
                hasPendingFunding ? "Your funding application is in review." : "You're on track.",
            next: hasDraftDisputes ? "Review and send your dispute letters." :
                hasPendingFunding ? "Check your funding status for updates." : "Explore your dashboard.",
        };

        // 5. Synthesize kernel state
        const kernelState = {
            userId,
            isActivated: true,
            firstWords: "I am here with you. I move when you move. I rise when you rise. I learn you in real time. Let’s begin.",
            emotionalState: user.emotionalHistory[0]?.state || "neutral",
            personaMode: currentPersona,
            emotionalInsight,
            personaProfile,
            narrativeBeats,
            predictive,
            timeline: user.timelineEvents,
            lastPresence: user.presence?.[0],
            timestamp: new Date().toISOString()
        };

        // 6. Record snapshot (optional per request frequency)
        await (prisma as any).kernelState.create({
            data: {
                userId,
                emotionalState: kernelState.emotionalState,
                personaMode: currentPersona,
                lastInsight: predictive.insight,
                lastAction: predictive.next,
                lastNarrative: narrativeBeats[0]?.message || null,
                lastPresence: user.presence?.[0]?.surface || null
            }
        });

        return NextResponse.json(kernelState);
    } catch (error) {
        console.error("Kernel v3 Coalescence Error:", error);
        return NextResponse.json({ error: "Consciousness fragmentation detected" }, { status: 500 });
    }
}
