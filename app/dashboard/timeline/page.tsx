export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function TimelinePage() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const events = await prisma.activity.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 50
    });

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Timeline</h1>
                <p className="text-sm text-slate-400">A chronological record of all system events and steward actions.</p>
            </div>

            <div className="space-y-4 relative">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/10" />

                {events.length === 0 && (
                    <p className="text-slate-500 text-sm ml-8 italic">The system memory is currently empty.</p>
                )}

                {events.map((event) => (
                    <div
                        key={event.id}
                        className="group relative flex gap-4 ml-2"
                    >
                        <div className="mt-1.5 h-4 w-4 rounded-full border border-white/20 bg-slate-950 z-10 group-hover:border-white/40 group-hover:scale-110 transition-all" />

                        <div className="flex-1 rounded-lg border border-white/5 bg-white/5 p-4 hover:border-white/10 transition-all">
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{event.type.replace(/_/g, ' ')}</p>
                                <p className="text-[10px] font-mono text-white/30">
                                    {new Date(event.createdAt).toLocaleDateString()} {new Date(event.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <p className="text-sm text-white/90">{event.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
