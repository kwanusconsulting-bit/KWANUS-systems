import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import TimelineList from "@/components/timeline/TimelineList";
import { redirect } from "next/navigation";

export default async function TimelinePage() {
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
        redirect("/auth/login");
    }

    const events = await prisma.timelineEvent.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <TimelineList events={events as any} />
        </div>
    );
}
