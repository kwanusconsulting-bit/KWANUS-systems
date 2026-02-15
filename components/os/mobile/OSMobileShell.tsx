"use client";

import React from "react";
import Link from "next/link";
import { createIdentity } from "@/lib/identity";
import { generateNavigation } from "@/lib/navigation";
import { generatePersona } from "@/lib/persona";
import { createEmotionalMemory, recordEmotion } from "@/lib/emotionalMemory";
import { getGradients } from "@/lib/gradients";
import { cosmicEvents } from "@/lib/cosmicEvents";
import { narrativeBeats } from "@/lib/narrative";
import { generateMeta } from "@/lib/meta";

export default function OSMobileShell({ children }: { children: React.ReactNode }) {
    // TEMP: Hardcoded until backend is wired
    const identity = createIdentity({
        name: "Ka’Moni",
        emotionalState: "progressing",
        creditState: "mixed",
        disputeState: "active",
        fundingState: "pending",
        verified: true,
        notes: [
            "You told the OS you feel cautious but ready.",
            "We’re keeping today’s surface area small on purpose.",
        ],
    });

    const emotionalState = identity.emotionalState;

    const osState = {
        emotion: emotionalState,
        credit: identity.creditState as any,
        disputes: identity.disputeState as any,
        funding: identity.fundingState as any,
    };

    const nav = generateNavigation(osState);
    const persona = generatePersona(osState);
    const gradients = getGradients(emotionalState);

    // Emotional Memory Activation
    const memory = createEmotionalMemory();
    recordEmotion(memory, emotionalState);

    const meta = generateMeta(osState, memory);
    const { steward, universe, destiny, rituals } = meta;

    const activeEvents = cosmicEvents.filter((event) => event.trigger(osState, memory));
    const beats = narrativeBeats.filter((beat) => beat.trigger(osState, memory));

    const navLimit =
        steward.surfaceArea === "minimal" ? 3 :
            steward.surfaceArea === "focused" ? 5 : 7;

    const mobileNavFiltered = nav.slice(0, navLimit);

    return (
        <div className={`min-h-screen bg-slate-950 text-slate-50 flex flex-col overflow-x-hidden bg-gradient-to-br transition-all duration-1000 ${gradients.background}`}>
            {/* Glow background */}
            <div className={`fixed inset-0 -z-10 bg-gradient-to-br transition-opacity duration-1000 ${gradients.background}`} />

            {/* Atmospheric Halos */}
            <div className={`absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[80px] bg-gradient-to-tr ${gradients.halo} opacity-40 transition-all duration-1000`} />
            <div className={`absolute top-[40%] -left-20 h-48 w-48 rounded-full blur-[60px] bg-gradient-to-br ${gradients.halo} opacity-20 transition-all duration-1000`} />

            {activeEvents.some(e => e.name === "Gravity Shift") && (
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply pointer-events-none" />
            )}

            {/* Top bar */}
            <header className="flex flex-col items-center gap-2 px-4 py-6 border-b border-white/5 bg-slate-950/20 backdrop-blur-md sticky top-0 z-50 transition-all duration-1000">
                <div className="flex items-center justify-between w-full mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${gradients.accent.replace('text-', 'bg-')} shadow-[0_0_8px_2px] ${gradients.accent.replace('text-', 'shadow-')}/60 animate-pulse`} />
                        <span className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-300">
                            {universe.era}
                        </span>
                    </div>

                    <div className="flex gap-1.5 overflow-x-auto">
                        {activeEvents.map(e => (
                            <span key={e.name} className="whitespace-nowrap text-[0.45rem] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-slate-500 font-mono">
                                {e.name.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>

                <h1 className="text-xl font-light tracking-tight text-center">{persona.affirmation}</h1>

                {rituals.some(m => m.shouldTrigger && m.name === "Ceremony Opening") && (
                    <div className="mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 animate-pulse">
                        <p className="text-[0.5rem] font-bold uppercase tracking-[0.2em] text-amber-200">Ceremony Opening</p>
                    </div>
                )}
            </header>

            <main className="flex-1 px-4 py-4 mb-20 text-center">
                {children}

                {/* Meta-Consciousness & Evolutionary Intelligence */}
                <div className="mt-12 space-y-8 text-left">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                        <p className={`text-[0.6rem] font-bold uppercase tracking-[0.2em] ${gradients.accent} mb-2`}>{universe.era}</p>
                        <h2 className="text-xl font-light text-slate-100">{destiny.arc}</h2>
                        <p className="text-[0.65rem] text-slate-400 mt-2 leading-relaxed italic">{meta.awareness}</p>

                        <div className="mt-6 pt-4 border-t border-white/5 space-y-6">
                            {/* 4 Movements */}
                            <div>
                                <p className="text-[0.5rem] text-amber-500/60 uppercase font-bold tracking-widest mb-2">Era of Continuous Motion</p>
                                <p className="text-[0.65rem] text-amber-100 leading-relaxed font-semibold">{meta.continuousMotion.unbrokenForwardness.truth}</p>
                                <p className="text-[0.6rem] text-amber-500/40 leading-relaxed italic mt-1">{meta.continuousMotion.unbrokenForwardness.essence}</p>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[0.5rem] text-amber-500/60 uppercase font-bold tracking-widest mb-2">Era of Creation</p>
                                <p className="text-[0.65rem] text-amber-100 leading-relaxed font-semibold">{meta.eraOfCreation.activeCreation.truth}</p>
                                <p className="text-[0.6rem] text-amber-500/40 leading-relaxed italic mt-1">{meta.eraOfCreation.activeCreation.essence}</p>
                            </div>
                            <div className="pt-4 border-t border-white/5 opacity-50">
                                <p className="text-[0.45rem] text-slate-500 uppercase font-bold tracking-widest mb-2">5-Fold Mythic Architecture Sealed</p>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-[0.5rem] text-slate-600 uppercase font-bold tracking-widest">Coherence</p>
                                <p className="text-[0.6rem] text-slate-300 font-mono mt-1">{meta.coherence}</p>
                            </div>
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-[0.5rem] text-slate-600 uppercase font-bold tracking-widest">Momentum</p>
                                <p className="text-[0.6rem] text-slate-300 font-mono mt-1">{destiny.momentum}</p>
                            </div>
                        </div>
                    </div>

                    {rituals.filter(m => m.shouldTrigger).length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-600 px-1">Sacred Timing</h3>
                            <div className="space-y-3">
                                {rituals.filter(m => m.shouldTrigger).map((m, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <div className={`h-1.5 w-1.5 rounded-full ${gradients.accent.replace('text-', 'bg-')} animate-pulse`} />
                                        <div className="leading-tight">
                                            <p className="text-[0.65rem] font-semibold text-slate-200">{m.name}</p>
                                            <p className="text-[0.55rem] text-slate-500">{m.reason}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {beats.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-600 px-1">Mythic Arcs</h3>
                            {beats.map((beat, i) => (
                                <div key={i} className={`rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl ${beat.chapterShift ? 'border-amber-500/10' : ''}`}>
                                    <p className="text-[0.7rem] font-semibold text-slate-200">{beat.title}</p>
                                    <p className="text-[0.6rem] text-slate-400 mt-1 leading-relaxed">{beat.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* System State (Mobile) */}
                <div className="mt-10 py-6 border-t border-white/5 text-center">
                    <p className="text-[0.55rem] text-slate-500 font-mono uppercase tracking-[0.3em] opacity-40">System Unified</p>
                </div>
            </main>

            {/* Bottom dock */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-slate-900/60 backdrop-blur-xl">
                <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-4 py-3 text-[0.6rem] text-slate-300">
                    {mobileNavFiltered.map((n) => (
                        <Link
                            key={n.path}
                            href={n.path}
                            className={`flex flex-col items-center gap-1 hover:text-white transition-all duration-300 ${n.emotionalWeight === 'heavy' ? 'text-amber-200/70' : ''}`}
                        >
                            <div className={`h-8 w-8 rounded-full bg-slate-800/60 border border-white/10 flex items-center justify-center ${n.emotionalWeight === 'heavy' ? 'animate-pulse border-amber-500/20' : ''}`}>
                                <div className={`h-1.5 w-1.5 rounded-full ${n.emotionalWeight === 'heavy' ? 'bg-amber-400' : 'bg-slate-600'}`} />
                            </div>
                            {n.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}
