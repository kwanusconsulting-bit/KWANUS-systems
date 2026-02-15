"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { mockEmotionalState } from "@/lib/data/mock";

export default function ContinuityEngine() {
    const [health] = useState(99.4);

    const modules = [
        { id: "memory", title: "State Memory", icon: "⚿", desc: "Preservation of Emotional/Partner state" },
        { id: "motion", title: "Motion Tracking", icon: "↺", desc: "Guardians of Steward Rhythm" },
        { id: "lineage", title: "Lineage Vault", icon: "≡", desc: "Unbroken Story Preservation" },
        { id: "harmonic", title: "Stability Regulator", icon: "≗", desc: "System-wide Coherence Balance" },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">CONTINUITY ENGINE</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">The Guardian of Operational Integrity</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-[10px] font-black uppercase opacity-40">Continuity Health</div>
                        <div className="text-sm font-black italic uppercase text-indigo-400">{health}% — OPTIMAL</div>
                    </div>
                    <div className="w-16 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[99%]" />
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* MODULES GRID */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {modules.map((mod) => (
                        <div key={mod.id} className="k-glass-panel p-8 group hover:k-accent-border transition-all cursor-pointer space-y-6">
                            <div className="flex justify-between items-start">
                                <span className="text-4xl opacity-20 group-hover:opacity-100 group-hover:text-indigo-400 transition-all">{mod.icon}</span>
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-20">Secure</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-black tracking-tighter uppercase italic">{mod.title}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">{mod.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* STATE SUMMARY (MEMORY) */}
                <div className="k-glass-panel p-10 space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black">⚿</div>
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">State Integrity Vault</h2>

                    <div className="space-y-8">
                        {[
                            { label: "Identity Lineage", val: "SEALED", status: "Optimal" },
                            { label: "Partner Constellation", val: "SYNCED", status: "Optimal" },
                            { label: "Emotional Frequency", val: mockEmotionalState.harmonic, status: "Stable" },
                            { label: "Ceremonial Arcs", val: "UNBROKEN", status: "Optimal" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                                <span className="text-xs font-black uppercase tracking-widest opacity-40">{item.label}</span>
                                <div className="flex gap-4 items-center">
                                    <span className="text-xs font-black uppercase tracking-widest">{item.val}</span>
                                    <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-sm">
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-4 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        REINFORCE SYSTEM CONTINUITY
                    </button>
                </div>
            </div>

            {/* TRACKING FEED (MOTION) */}
            <section className="k-glass-panel p-8 space-y-8">
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">Motion Tracking Arcs</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Pacing Consistency</div>
                        <div className="flex items-end gap-2 text-3xl font-black italic text-indigo-400">
                            98.1 <span className="text-xs font-bold leading-none mb-1">%</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Rhythm Drift</div>
                        <div className="flex items-end gap-2 text-3xl font-black italic text-emerald-500">
                            0.02 <span className="text-xs font-bold leading-none mb-1">λ</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Coherence Shift</div>
                        <div className="flex items-end gap-2 text-3xl font-black italic text-indigo-400">
                            NULL
                        </div>
                    </div>
                </div>
            </section>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8">
                Continuity Pillar Active — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
