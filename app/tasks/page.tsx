"use client"

export const dynamic = "force-dynamic";

import { cn } from "@/lib/utils";

export default function ActionCenter() {
    const tasks = [
        { id: 1, text: "Verify Lineage 0x44 Integrity", priority: "Critical", status: "Open" },
        { id: 2, text: "Calibrate Emotional Baseline", priority: "High", status: "Open" },
        { id: 3, text: "Sync Partner Galaxy Nodes", priority: "Normal", status: "Sealed" },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="border-b border-white/5 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">ACTION CENTER</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Task Management & Pacing Metrics</p>
            </header>
            <div className="space-y-4">
                {tasks.map(t => (
                    <div key={t.id} className={cn(
                        "k-glass-panel p-6 flex justify-between items-center group transition-all",
                        t.status === "Sealed" ? "opacity-40 grayscale" : "hover:bg-white/5"
                    )}>
                        <div className="flex gap-8 items-center">
                            <div className={cn(
                                "w-2 h-2 rounded-full",
                                t.priority === "Critical" ? "bg-red-500" : t.priority === "High" ? "bg-orange-500" : "bg-indigo-500"
                            )} />
                            <span className="text-xs font-black uppercase tracking-widest">{t.text}</span>
                        </div>
                        <span className="text-[8px] font-black uppercase opacity-20 group-hover:opacity-100 transition-opacity">{t.status}</span>
                    </div>
                ))}
            </div>
        </main>
    );
}
