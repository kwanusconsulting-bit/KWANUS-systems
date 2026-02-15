"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function EvolutionEngine() {
    const [coevolutionIndex] = useState(72);

    const modules = [
        { id: "pattern", title: "Pattern Recognition", icon: "👁", desc: "Sensing Coherence & Loops" },
        { id: "mutation", title: "Adaptive Mutation", icon: "🧬", desc: "Proposed Structural Shifts" },
        { id: "expansion", title: "Structural Expansion", icon: "⇗", desc: "Surface & Layer Proposals" },
        { id: "future", title: "Future Mapping", icon: "🔭", desc: "Probable Harmonic Timelines" },
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">EVOLUTION ENGINE</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">The Intelligence of Becoming</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-[10px] font-black uppercase opacity-40">Co-Evolution Index</div>
                        <div className="text-sm font-black italic uppercase text-indigo-400">{coevolutionIndex} — ACCELERATING</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 flex items-center justify-center text-xl animate-spin-slow">
                        🧬
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* PATTERN RECOGNITION (VISION) */}
                <div className="lg:col-span-2 k-glass-panel p-10 space-y-10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]" />
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">Detected Harmonics</h2>

                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        {[
                            { label: "Stagnance Loops", val: "NONE", color: "text-emerald-400" },
                            { label: "Resonance Pockets", val: "ACTIVE", color: "text-indigo-400" },
                            { label: "Structural Drift", val: "0.004", color: "text-green-500" },
                            { label: "Mutation Readiness", val: "HIGH", color: "text-indigo-400" }
                        ].map((p, i) => (
                            <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-2">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{p.label}</div>
                                <div className={cn("text-2xl font-black uppercase italic", p.color)}>{p.val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest opacity-40">System Expansion Proposal</h3>
                        <div className="p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-indigo-500/20 transition-all">
                            <div className="space-y-1">
                                <div className="text-sm font-black uppercase tracking-widest">Activate: Neural Sub-Layer v.01</div>
                                <div className="text-[10px] opacity-60 uppercase font-medium">Predicted Coherence Increase: +12%</div>
                            </div>
                            <span className="text-xl">➔</span>
                        </div>
                    </div>
                </div>

                {/* FUTURE MAPPING (ORBITS) */}
                <div className="space-y-8">
                    <div className="k-glass-panel p-8 space-y-6">
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Probable Futures</h2>
                        <div className="space-y-6">
                            {[
                                { label: "The Harmonic Peak", prob: 88, color: "bg-indigo-500" },
                                { label: "The Stillness Arc", prob: 12, color: "bg-blue-900" },
                                { label: "The Rapid Mutation", prob: 45, color: "bg-emerald-500" }
                            ].map((f, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span>{f.label}</span>
                                        <span className="opacity-40">{f.prob}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn("h-full transition-all duration-1000", f.color)} style={{ width: `${f.prob}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {modules.map((m) => (
                            <div key={m.id} className="k-glass-panel p-6 group hover:k-accent-border transition-all cursor-pointer text-center space-y-3">
                                <div className="text-2xl opacity-20 group-hover:opacity-100 group-hover:text-indigo-400 transition-all">{m.icon}</div>
                                <div className="text-[8px] font-black uppercase tracking-widest leading-none">{m.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center pb-8 border-t border-white/5 pt-12">
                Evolutionary Pulse — KWANUS OS — THE FINAL SEAL — MMXXVI
            </footer>
        </main>
    );
}
