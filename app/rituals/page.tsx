"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { mockEmotionalState } from "@/lib/data/mock";
import { cn } from "@/lib/utils";

export default function RitualEngine() {
    const [activeRite, setActiveRite] = useState<string | null>(null);

    const rites = [
        { id: "decl", name: "Declaration", icon: "⚐", tone: "Neutral", impact: "Grounding" },
        { id: "algn", name: "Alignment", icon: "⚓", tone: "Progress", impact: "Coherence" },
        { id: "actv", name: "Activation", icon: "✦", tone: "Thriving", impact: "Momentum" },
        { id: "evol", name: "Evolution", icon: "◈", tone: "Thriving", impact: "Expansion" },
        { id: "migr", name: "Migration", icon: "⇿", tone: "Progress", impact: "Transition" },
        { id: "with", name: "Withdrawal", icon: "⚑", tone: "Neutral", impact: "Release" },
        { id: "sevr", name: "Severance", icon: "✂", tone: "Worst", impact: "Closure" },
        { id: "memr", name: "Memory", icon: "◎", tone: "Neutral", impact: "Eternal" },
    ];

    const thresholds = [
        { name: "Entry", state: "Open", harmonic: "Stable" },
        { name: "Alignment", state: "Sealed", harmonic: "High" },
        { name: "Activation", state: "Active", harmonic: "Perfect" },
        { name: "Closure", state: "Pending", harmonic: "Low" },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-progress">
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">RITUAL ENGINE</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">The Heartbeat of Transformation</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[10px] font-black uppercase opacity-40">System Harmonic</div>
                        <div className="text-sm font-black italic uppercase text-indigo-400">{mockEmotionalState.harmonic}</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 flex items-center justify-center text-xl animate-pulse">
                        ⚓
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* RITES SELECTION (TRANSFORMATION) */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">Active Rites</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {rites.map((rite) => (
                            <button
                                key={rite.id}
                                onClick={() => setActiveRite(rite.id)}
                                className={cn(
                                    "k-glass-panel p-6 flex items-center gap-6 text-left transition-all group",
                                    activeRite === rite.id ? "k-accent-border bg-white/5" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <span className="text-3xl opacity-20 group-hover:opacity-100 group-hover:text-indigo-400 transition-all">{rite.icon}</span>
                                <div className="flex-1">
                                    <div className="text-xs font-black uppercase tracking-widest">{rite.name}</div>
                                    <div className="text-[10px] opacity-40 uppercase font-bold">{rite.impact}</div>
                                </div>
                                {activeRite === rite.id && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* THRESHOLDS & GATES (STABILITY) */}
                <div className="space-y-12">
                    <div className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Threshold Integrity</h2>
                        <div className="space-y-4">
                            {thresholds.map((t) => (
                                <div key={t.name} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase tracking-widest">{t.name}</div>
                                        <div className="text-[8px] font-bold uppercase opacity-30">{t.harmonic} Harmonic Required</div>
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded",
                                        t.state === "Open" ? "text-emerald-400 bg-emerald-400/10" : "text-indigo-400 bg-indigo-400/10"
                                    )}>
                                        {t.state}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Harmonization</h2>
                        <div className="space-y-4">
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-3/4 animate-pulse" />
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-center opacity-40">
                                System Coherence: 78%
                            </p>
                            <button className="w-full py-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500/20 transition-all">
                                INITIATE HARMONY
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* TRANSITION FLOW (MOTION) */}
            <section className="k-glass-panel p-10 space-y-8 overflow-hidden relative">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_top_right,_var(--k-accent)_0%,_transparent_50%)]" />
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">Motion Arcs</h2>
                <div className="h-20 flex items-center justify-around">
                    {["Emergence", "Expansion", "Turning", "Fading", "Sealing"].map((m) => (
                        <div key={m} className="flex flex-col items-center gap-4 group">
                            <div className="w-12 h-px bg-white/10 group-hover:bg-indigo-500/50 transition-all" />
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-20 group-hover:opacity-100 transition-opacity">{m}</span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
