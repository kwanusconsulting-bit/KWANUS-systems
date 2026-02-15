import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
        const { event } = await req.json();

        const narrative = await prisma.narrativeEvent.create({
            data: {
                userId,
                arc: event.arc,
                message: event.message,
                type: event.type,
            },
        });

        return NextResponse.json(narrative);
    } catch (error) {
        console.error("Narrative Generation Error:", error);
        return NextResponse.json({ error: "Failed to create story beat" }, { status: 500 });
    }
}
