"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import { mockEmotionalState } from "@/lib/data/mock";
import { cn } from "@/lib/utils";

export default function StewardTools() {
    const [activeTone, setActiveTone] = useState(mockEmotionalState.tone);

    const modules = [
        {
            id: "emotional",
            title: "1. Emotional Controls",
            icon: "◎",
            tools: ["Harmonic Tuning", "Force Vector Shift", "Transition Trigger", "UI Preview"]
        },
        {
            id: "ceremonial",
            title: "2. Ceremonial Controls",
            icon: "⚓",
            tools: ["Initiate Rites", "Lineage Sealing", "Migration Protocol", "Evolution Shift"]
        },
        {
            id: "partner",
            title: "3. Partner Universe",
            icon: "◈",
            tools: ["Registry Toggle", "Capability Unlock", "Lifecycle Forge", "Work-thread Sync"]
        },
        {
            id: "credit",
            title: "4. Hybrid Controls",
            icon: "✦",
            tools: ["Credit-Emoto Map", "Impact Assign", "Event Dispatcher", "Resilience Check"]
        },
        {
            id: "lineage",
            title: "5. Lineage Controls",
            icon: "≡",
            tools: ["Story Archive", "Path Tracking", "Memory Seal", "Lineage Audit"]
        },
        {
            id: "health",
            title: "6. System Health",
            icon: "✚",
            tools: ["Engine Status", "Coherence Monitor", "Registry Load", "Performance Hub"]
        }
    ];

    return (
        <main className="min-h-screen p-8 space-y-12 animate-fade-in k-mode-thriving">
            <header className="flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">STEWARD&apos;S TOOLS</h1>
                    <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Command & Control Interface — Sequence 002</p>
                </div>
                <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    ROOT LEVEL COMMAND ACTIVE
                </div>
            </header>

            {/* ATMOSPHERIC MASTER CONTROL */}
            <section className="k-glass-panel p-10 space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">Atmospheric Master</h2>
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Live Sync</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {["Worst", "Neutral", "Progress", "Thriving"].map((t) => (
                        <button
                            key={t}
                            onClick={() => {
                                setActiveTone(t as any);
                                document.body.className = `k-mode-${t.toLowerCase()}`;
                            }}
                            className={cn(
                                "p-6 rounded-2xl border transition-all text-left space-y-3",
                                activeTone === t
                                    ? "bg-indigo-500/20 border-indigo-500/50"
                                    : "bg-white/5 border-white/5 opacity-50 hover:opacity-100"
                            )}
                        >
                            <div className={cn(
                                "w-4 h-4 rounded-full",
                                t === "Worst" ? "bg-blue-900" : t === "Neutral" ? "bg-gray-500" : t === "Progress" ? "bg-orange-500" : "bg-emerald-500"
                            )} />
                            <div className="text-xs font-black uppercase tracking-widest">{t}</div>
                        </button>
                    ))}
                </div>
            </section>

            {/* CORE OPERATIONAL MODULES */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modules.map((mod) => (
                    <div key={mod.id} className="k-glass-panel p-8 space-y-6 group hover:k-accent-border transition-all">
                        <div className="flex justify-between items-start">
                            <span className="text-4xl opacity-20 group-hover:opacity-100 group-hover:text-indigo-400 transition-all">{mod.icon}</span>
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-20">Operational</span>
                        </div>
                        <h3 className="text-lg font-black tracking-tighter uppercase italic">{mod.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {mod.tools.map((tool) => (
                                <span key={tool} className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-500/20 cursor-pointer transition-colors">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <footer className="pt-12 opacity-20 text-[8px] font-bold tracking-[0.5em] uppercase text-center">
                Steward&apos;s Command Deck — KWANUS OS — THE FINAL SEAL
            </footer>
        </main>
    );
}
