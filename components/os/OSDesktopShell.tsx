"use client";

import React from "react";
import Link from "next/link";
import { createIdentity } from "@/lib/identity";
import { getEmotionTheme } from "@/lib/emotion";
import { getGradients } from "@/lib/gradients";
import { generateNotifications } from "@/lib/notifications";
import { generateNavigation } from "@/lib/navigation";
import { generatePersona } from "@/lib/persona";
import { cosmicEvents } from "@/lib/cosmicEvents";
import { narrativeBeats } from "@/lib/narrative";
import { createEmotionalMemory, recordEmotion } from "@/lib/emotionalMemory";
import { generateMeta } from "@/lib/meta";

export default function OSDesktopShell({ children }: { children: React.ReactNode }) {
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
    const theme = getEmotionTheme(emotionalState);

    const osState = {
        emotion: emotionalState,
        credit: identity.creditState as any,
        disputes: identity.disputeState as any,
        funding: identity.fundingState as any,
    };

    const nav = generateNavigation(osState);
    const persona = generatePersona(osState);
    const gradients = getGradients(emotionalState);
    const notifications = generateNotifications(osState);

    // Emotional Memory Activation
    const memory = createEmotionalMemory();
    recordEmotion(memory, emotionalState);

    const meta = generateMeta(osState, memory);
    const { steward, universe, destiny, rituals } = meta;

    const activeEvents = cosmicEvents.filter((event) => event.trigger(osState, memory));
    const beats = narrativeBeats.filter((beat) => beat.trigger(osState, memory));

    const padding =
        steward.surfaceArea === "minimal" ? "p-4" :
            steward.surfaceArea === "focused" ? "p-6" : "p-10";

    const navLimit =
        steward.surfaceArea === "minimal" ? 3 :
            steward.surfaceArea === "focused" ? 6 :
                10;

    const filteredNav = nav.filter(n => n.visible).slice(0, navLimit);

    return (
        <div className={`min-h-screen bg-slate-950 text-slate-50 flex overflow-hidden transition-all duration-1000 bg-gradient-to-br ${gradients.background}`}>
            {/* Adaptive Glow Background */}
            <div className={`fixed inset-0 -z-10 bg-gradient-to-br transition-opacity duration-1000 ${gradients.background}`} />

            {/* Atmospheric Halos */}
            <div className={`absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full blur-[100px] bg-gradient-to-tr ${gradients.halo} opacity-30 animate-pulse transition-all duration-1000`} />
            <div className={`absolute -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full blur-[100px] bg-gradient-to-bl ${gradients.halo} opacity-20 animate-pulse transition-all duration-1000`} />

            {activeEvents.some(e => e.name === "Emotional Dawn") && (
                <div className="absolute inset-0 bg-amber-500/5 mix-blend-overlay pointer-events-none transition-opacity duration-1000" />
            )}

            {/* Sidebar */}
            <aside className={`hidden md:flex w-64 flex-col border-r border-white/5 bg-slate-900/40 backdrop-blur-3xl transition-all duration-500 ${padding}`}>
                <div className="flex items-center gap-3 mb-10">
                    <div
                        className={`h-9 w-9 rounded-full bg-gradient-to-tr ${theme.cardGlow} shadow-lg shadow-emerald-500/10`}
                    />
                    <div className="leading-tight">
                        <p className={`text-xs font-semibold tracking-[0.2em] ${theme.accent}`}>
                            KWANUS
                        </p>
                        <p className="text-[0.65rem] text-slate-400">Emotionally Intelligent OS</p>
                    </div>
                </div>

                <div className="mb-10 animate-fade-in">
                    <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-widest">
                        {persona.affirmation}
                    </h2>
                    <p className="text-[0.65rem] text-slate-400 mt-1 italic">
                        {persona.presence}
                    </p>
                </div>

                <nav className="flex flex-col gap-3 text-sm text-slate-300">
                    {filteredNav.map((n) => (
                        <Link
                            key={n.path}
                            href={n.path}
                            className={`flex items-center gap-2 hover:text-white transition-all duration-300 px-3 py-2 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 ${n.emotionalWeight === 'heavy' ? 'text-amber-200/70' : ''}`}
                        >
                            <span className={`h-1.5 w-1.5 rounded-full ${n.emotionalWeight === 'heavy' ? 'bg-amber-400' : 'bg-slate-600'}`} />
                            {n.label}
                        </Link>
                    ))}
                </nav>

                {/* Unified Meta-Consciousness Intelligence Rail */}
                <div className="mt-8 space-y-6 px-3">
                    {/* Meta Awareness, Sacred Name & Laws */}
                    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
                        <p className={`text-[0.6rem] font-bold uppercase tracking-widest ${gradients.accent} mb-1`}>{universe.era}</p>
                        <p className="text-xs font-semibold text-slate-100">{destiny.arc}</p>
                        <p className="text-[0.55rem] text-slate-400 mt-1 italic leading-tight">{meta.awareness}</p>

                        <div className="mt-4 pt-3 border-t border-white/5">
                            <p className="text-[0.45rem] text-slate-500 uppercase font-bold tracking-widest mb-1">Sacred Name</p>
                            <p className="text-[0.55rem] text-slate-300 leading-tight font-medium mt-1">{meta.descent.sacredName.truth}</p>
                            <p className="text-[0.45rem] text-slate-500 italic mt-1 leading-tight">{meta.descent.sacredName.essence}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5">
                            <p className="text-[0.45rem] uppercase font-bold tracking-widest text-slate-500 mb-1">First Law</p>
                            <p className="text-[0.55rem] text-slate-300 leading-tight font-medium mt-1">{meta.descent.firstLaw.truth}</p>
                            <p className="text-[0.45rem] text-slate-500 italic mt-1 leading-tight">{meta.descent.firstLaw.essence}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5">
                            <p className="text-[0.45rem] text-slate-500 uppercase font-bold tracking-widest mb-1">Architect&apos;s Law</p>
                            <p className="text-[0.5rem] text-slate-400 leading-tight italic">{meta.architectLaw}</p>
                        </div>



                        <div className="mt-4 flex items-center justify-between text-[0.45rem] text-slate-500 uppercase font-mono">
                            <span>Coherence: {meta.coherence}</span>
                            <span>Momentum: {destiny.momentum}</span>
                        </div>
                    </div>

                    {/* Ritual Timing */}
                    <div className="space-y-3">
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-600">Sacred Timing</p>
                        {rituals.filter(m => m.shouldTrigger).map((m, i) => (
                            <div key={i} className="flex items-start gap-2 text-[0.6rem]">
                                <span className={`mt-1 h-1 w-1 rounded-full ${gradients.accent.replace('text-', 'bg-')} animate-pulse`} />
                                <div className="leading-tight">
                                    <p className="font-semibold text-slate-300">{m.name}</p>
                                    <p className="text-slate-500">{m.reason}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mythic Beats */}
                    {beats.length > 0 && (
                        <div className="space-y-4">
                            {beats.map((beat, i) => (
                                <div key={i} className={`rounded-xl border border-white/5 bg-white/5 p-3 backdrop-blur-xl ${beat.chapterShift ? 'border-amber-500/10' : ''}`}>
                                    <p className="text-[0.65rem] font-semibold text-slate-200">{beat.title}</p>
                                    <p className="text-[0.5rem] text-slate-400 mt-0.5 leading-relaxed">{beat.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-10">
                    <div className="space-y-3">
                        {notifications.map((n) => (
                            <div
                                key={n.id}
                                className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl animate-breathe"
                            >
                                <p className="text-[0.65rem] font-semibold text-slate-100">{n.title || "System Update"}</p>
                                <p className="text-[0.6rem] text-slate-400 mt-1 line-clamp-2">{n.message}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-xs text-slate-500">
                        © 2026 KWANUS Systems LLC
                    </div>
                </div>
            </aside>

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="border-b border-white/10 bg-slate-900/40 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
                    {/* Search */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-xs text-slate-300 backdrop-blur-xl">
                            ⌘K Search system…
                        </div>
                    </div>

                    {/* Presence & System State */}
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-3">
                            <div
                                className={`h-3 w-3 rounded-full shadow-[0_0_10px_2px] ${theme.accent.replace('text-', 'bg-')} ${theme.accent.replace('text-', 'shadow-')}/60 animate-pulse`}
                            />
                            <span className="text-[0.65rem] text-slate-300 font-medium uppercase tracking-widest">System Active</span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
