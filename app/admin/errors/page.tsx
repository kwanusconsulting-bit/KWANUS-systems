"use client"

export const dynamic = "force-dynamic";

import { cn } from "@/lib/utils";

export default function ErrorTrackingPage() {
    const errors = [
        { id: "L-404", type: "Warning", msg: "Partner Node 0x4 unstable", surface: "/partners" },
        { id: "E-500", type: "Critical", msg: "State Resonance Failure", surface: "/cosmology" },
        { id: "S-102", type: "Info", msg: "Adaptive UI latency > 100ms", surface: "/preferences" },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving k-accent-indigo">
            <header className="border-b border-indigo-500/10 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic text-indigo-400">DIAGNOSTICS</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40 text-indigo-300">Error Tracking & System Health Logs</p>
            </header>

            <div className="space-y-4">
                {errors.map((e) => (
                    <div key={e.id} className="k-glass-panel p-6 border-indigo-500/10 flex items-center justify-between group">
                        <div className="flex gap-8 items-center">
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded",
                                e.type === "Critical" ? "bg-red-500/20 text-red-400" : e.type === "Warning" ? "bg-orange-500/20 text-orange-400" : "bg-indigo-500/20 text-indigo-400"
                            )}>{e.type}</span>
                            <div>
                                <div className="text-xs font-black uppercase tracking-widest">{e.msg}</div>
                                <div className="text-[8px] font-mono opacity-20 mt-1">{e.id} — Surface: {e.surface}</div>
                            </div>
                        </div>
                        <button className="text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">Trace Motion</button>
                    </div>
                ))}
            </div>
        </main>
    );
}
