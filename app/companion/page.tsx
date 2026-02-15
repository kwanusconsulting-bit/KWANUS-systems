"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";

export default function CompanionEngine() {
    const [presence] = useState("Passive Listen");
    const [resonance] = useState(88);

    const modules = [
        { id: "attune", title: "Attunement", icon: "≋", desc: "Emotional Rhythm Sensing" },
        { id: "guide", title: "Guidance", icon: "🏹", desc: "Ceremonial Navigation" },
        { id: "res", title: "Resonance", icon: "◌", desc: "System Coherence Map" },
        { id: "cont", title: "Continuity", icon: "∞", desc: "Lineage Flow Keeper" },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">COMPANION ENGINE</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Presence & Relational Intelligence</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[10px] font-black uppercase opacity-40">Attunement State</div>
                        <div className="text-sm font-black italic uppercase text-emerald-400">{presence}</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 flex items-center justify-center text-xl animate-bounce">
                        ≋
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* THE PRESENCE BOX (CENTER) */}
                <div className="lg:col-span-3 k-glass-panel p-12 relative overflow-hidden min-h-[400px] flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8">
                        <div className="text-[8px] font-black uppercase tracking-[0.5em] opacity-20">Relational Field 0x99</div>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded text-[8px] font-black uppercase tracking-widest text-indigo-400">
                            Listening Active
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase italic max-w-2xl leading-tight">
                            &quot;I feel the <span className="text-indigo-400">Momentum</span> building in your current sequence. Shall we stabilize the <span className="k-accent">Neutral</span> threshold?&quot;
                        </h2>
                    </div>

                    <div className="flex items-end justify-between relative z-10">
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                INITIATE ALIGNMENT
                            </button>
                            <button className="px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
                                HOLD STILLNESS
                            </button>
                        </div>
                        <div className="w-32 space-y-2">
                            <div className="flex justify-between text-[8px] font-black uppercase opacity-40">
                                <span>Resonance</span>
                                <span>{resonance}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${resonance}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* AMBIENT BACKGROUND MOTION */}
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(129,140,248,0.05)_0%,_transparent_50%)] animate-pulse" />
                </div>

                {/* MODULES SIDEBAR */}
                <div className="space-y-4">
                    {modules.map((mod) => (
                        <div key={mod.id} className="k-glass-panel p-6 group hover:k-accent-border transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl opacity-20 group-hover:opacity-100 group-hover:text-indigo-400 transition-all">{mod.icon}</span>
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest leading-none">{mod.title}</div>
                                    <div className="text-[8px] opacity-40 uppercase font-bold tracking-tight">{mod.desc}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CONTINUITY FEED */}
            <section className="k-glass-panel p-8 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] opacity-40">Continuity Stream</h3>
                <div className="space-y-4 pb-4">
                    {[
                        "Emotional harmonic stabilized at Stable-002",
                        "Cosmological synchronization verified",
                        "Steward presence detected in Expansion Phase",
                        "Ritual threshold 'Alignment' approaching"
                    ].map((log, i) => (
                        <div key={i} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">
                            <span className="w-1 h-1 rounded-full bg-indigo-500" />
                            <span>{log}</span>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8">
                Companion Presence Active — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
