"use client"

export const dynamic = "force-dynamic";

import { cn } from "@/lib/utils";

export default function FeatureFlagsPage() {
    const flags = [
        { id: "beta_analytics", label: "Beta Analytics Interface", active: true },
        { id: "harmonic_ui", label: "Emotional-Adaptive UI Hooks", active: true },
        { id: "partner_registry", label: "External Partner Sync V2", active: false },
        { id: "ritual_auto", label: "Automated Ritual Stabilization", active: false },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving k-accent-indigo">
            <header className="border-b border-indigo-500/10 pb-8">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic text-indigo-400">FEATURE FLAGS</h1>
                <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40 text-indigo-300">Experimental Rollouts & System Toggles</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flags.map((f) => (
                    <div key={f.id} className="k-glass-panel p-8 flex items-center justify-between border-indigo-500/10">
                        <div className="space-y-1">
                            <div className="text-xs font-black uppercase tracking-widest">{f.label}</div>
                            <div className="text-[8px] font-mono opacity-30">{f.id}</div>
                        </div>
                        <div className={cn(
                            "w-12 h-6 rounded-full relative transition-colors cursor-pointer",
                            f.active ? "bg-indigo-500" : "bg-white/10"
                        )}>
                            <div className={cn(
                                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                                f.active ? "right-1" : "left-1"
                            )} />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
