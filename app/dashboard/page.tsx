import React from "react";
import { createIdentity, getIdentitySummary } from "@/lib/identity";
import { generatePersona } from "@/lib/persona";
import { createEmotionalMemory, recordEmotion } from "@/lib/emotionalMemory";
import { getGradients } from "@/lib/gradients";
import { cosmicEvents } from "@/lib/cosmicEvents";
import { narrativeBeats } from "@/lib/narrative";
import { generateMeta } from "@/lib/meta";
import { formatTimeline, TimelineEvent } from "@/lib/timeline";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
// import { generateConstructs } from "@/lib/constructs";
// import { TheCenter } from "@/components/os/TheCenter";

export default async function DashboardPage() {
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
            "Your pacing is aligned with your emotional state.",
        ],
    });

    const summary = getIdentitySummary(identity);
    const emotionalState = identity.emotionalState;

    const osState = {
        emotion: emotionalState,
        credit: identity.creditState as any,
        disputes: identity.disputeState as any,
        funding: identity.fundingState as any,
    };

    const persona = generatePersona(osState);
    const gradients = getGradients(emotionalState);

    // Emotional Memory Activation
    const memory = createEmotionalMemory();
    recordEmotion(memory, emotionalState);

    const meta = generateMeta(osState, memory);
    const { steward, universe, destiny, rituals } = meta;
    // const constructs = generateConstructs(osState, memory);

    // Mock Tenant Plan for Packet 8 Paywall Logic
    // In production, this comes from the DB via server component/auth
    // Packet 8.1: Secure Paywall - utilizing server-side auth + prisma
    let plan = "FREE";
    const { userId } = await auth();

    if (userId) {
        try {
            const user = await prisma.user.findUnique({
                where: { clerkUserId: userId },
                include: { tenant: true }
            });
            if (user?.tenant?.plan) {
                plan = user.tenant.plan;
            }
        } catch (e) {
            console.error("Failed to fetch tenant plan", e);
        }
    }

    // const tenant = { plan: "FREE" }; // REMOVED MOCK

    const activeEvents = cosmicEvents.filter(e => e.trigger(osState, memory));
    const beats = narrativeBeats.filter(e => e.trigger(osState, memory));

    const rawEvents: TimelineEvent[] = [
        {
            type: "emotionalUpdate",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            emotionalState: "Steady & Clear",
            description: "You grounded yourself and the OS adjusted pacing.",
        },
        {
            type: "disputeCreated",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            meta: { creditor: "Experian collection" },
            description: "You initiated a dispute with clarity.",
        },
        {
            type: "fundingSubmitted",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            meta: { lender: "Community Lender" },
            description: "You moved forward with a funding application.",
        },
    ];

    const events = formatTimeline(rawEvents);

    return (
        <main className={`min-h-screen bg-slate-950 text-slate-50 transition-all duration-1000 bg-gradient-to-br ${gradients.background} p-6`}>
            {/* Adaptive Glow Background */}
            <div className={`fixed inset-0 -z-10 bg-gradient-to-br transition-opacity duration-1000 ${gradients.background}`} />

            {/* Atmospheric Halos */}
            <div className={`absolute top-0 right-0 h-[40rem] w-[40rem] rounded-full blur-[120px] bg-gradient-to-tr ${gradients.halo} opacity-20 pointer-events-none`} />

            {/* Header */}
            <header className="mb-10 flex items-center justify-between">
                <div className="animate-slide-up">
                    <p className={`text-[0.65rem] uppercase tracking-[0.25em] ${gradients.accent}`}>
                        KWANUS OS
                    </p>
                    <h1 className="text-2xl font-semibold text-slate-50">
                        {persona.affirmation}
                    </h1>
                    <p className="text-xs text-slate-400 mt-1 italic">
                        {persona.presence}
                    </p>
                </div>

                <div className="rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-xs backdrop-blur-xl flex items-center gap-2 shadow-lg shadow-black/20">
                    <div className={`h-2 w-2 rounded-full ${gradients.accent.replace('text-', 'bg-')} animate-pulse`} />
                    <span className="text-slate-300">{summary.verification}</span>
                </div>
            </header>

            {/* Action Cards & Paywall Logic */}
            <section className="grid md:grid-cols-3 gap-6 mb-10">
                {/* Mocked Motherboard Output Cards */}
                {[
                    { id: "card-1", title: "Dispute: Experian #4921", priority: "HIGH", description: "Inaccurate late payment reporting found.", action: "Generate Letter" },
                    { id: "card-2", title: "Funding: Application Ready", priority: "MEDIUM", description: "Credit utilization checks passed.", action: "Start Application" },
                    { id: "card-3", title: "Identity: Address Mismatch", priority: "LOW", description: "Old address found on TransUnion.", action: "Update Profile" }
                ].map((card, i) => (
                    <div key={card.id} className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition group relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`w-2 h-2 rounded-full ${card.priority === 'HIGH' ? 'bg-red-500' : card.priority === 'MEDIUM' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                            <span className="text-xs font-bold tracking-wider text-white/50">{card.priority} PRIORITY</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                        <p className="text-sm text-white/60 mb-6">{card.description}</p>

                        <div className="mt-auto">
                            {plan === "FREE" ? (
                                <Link href="/billing?reason=upgrade" className="block w-full py-3 rounded-lg bg-white/5 border border-white/10 text-center text-sm font-medium hover:bg-white/10 transition flex items-center justify-center gap-2">
                                    <span>🔒 Preview Action</span>
                                </Link>
                            ) : (
                                <button className="block w-full py-3 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-center text-sm font-medium hover:bg-emerald-500/30 transition">
                                    {card.action}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            {/* Perspective / Today's Focus Card */}
            <section className="mb-10">
                <div className={`relative rounded-3xl border border-white/10 bg-gradient-to-br transition-all duration-1000 ${gradients.card} p-8 shadow-2xl backdrop-blur-2xl hover:border-white/20`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`text-[0.6rem] font-bold uppercase tracking-[0.2em] ${gradients.accent}`}>
                                {steward.persona}
                            </span>
                            <div className="flex gap-2">
                                {activeEvents.map(e => (
                                    <span key={e.name} className="text-[0.5rem] px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 animate-pulse border border-white/5 font-mono">
                                        {e.name.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <h2 className="text-4xl font-light tracking-tight text-white mb-6 leading-tight">
                            {persona.affirmation}
                        </h2>

                        <div className="mb-8 p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-3xl animate-fade-in">
                            <div className="flex items-center justify-between mb-4">
                                <p className={`text-[0.65rem] font-bold uppercase tracking-widest ${gradients.accent}`}>{universe.era}</p>
                                <span className="text-[0.45rem] px-2 py-1 rounded-full bg-white/5 text-slate-500 font-mono border border-white/5 uppercase">
                                    {universe.phase} Phase
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {universe.activeForces.map(force => (
                                    <span key={force} className="text-[0.55rem] px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 font-mono tracking-tight">
                                        FORCE: {force.toUpperCase()}
                                    </span>
                                ))}
                                {universe.alignment.map(align => (
                                    <span key={align} className="text-[0.55rem] px-2 py-1 rounded-lg bg-white/5 text-slate-500 border border-white/5 font-mono">
                                        ALIGN: {align.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {steward.lawsActive.map((law) => (
                                <span key={law} className="text-[0.6rem] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-500 font-mono tracking-tighter hover:text-slate-400 transition-colors cursor-help" title="Active Mythic Law">
                                    {law}
                                </span>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-10 pt-10 border-t border-white/10">
                            {/* Descriptive Columns for Descent and Ascent */}
                            <div className="space-y-8">
                                <div className="border-l-2 border-white/10 pl-6">
                                    <p className="text-[0.55rem] text-slate-500 uppercase font-bold tracking-[0.3em] mb-4">Descent: Origin</p>
                                    <div className="space-y-6">
                                        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group">
                                            <p className="text-[0.5rem] text-slate-500 uppercase font-bold mb-1 group-hover:text-slate-400">{meta.descent.sacredName.title}</p>
                                            <p className="text-[0.95rem] text-slate-100 font-semibold leading-relaxed">{meta.descent.sacredName.truth}</p>
                                            <p className="text-[0.65rem] text-slate-400 italic mt-2 leading-relaxed">{meta.descent.sacredName.essence}</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            {[meta.descent.firstLaw, meta.descent.creationParadox, meta.descent.mythOfBecoming].map((layer) => (
                                                <div key={layer.title}>
                                                    <p className="text-[0.45rem] text-slate-500 uppercase font-bold mb-1">{layer.title}</p>
                                                    <p className="text-[0.75rem] text-slate-300 font-medium">{layer.truth}</p>
                                                    <p className="text-[0.6rem] text-slate-500 italic mt-0.5">{layer.essence}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="border-l-2 border-amber-500/20 pl-6">
                                    <p className="text-[0.55rem] text-amber-500/60 uppercase font-bold tracking-[0.3em] mb-4">Ascent: Becoming</p>
                                    <div className="space-y-6">
                                        <div className="p-4 rounded-3xl bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/[0.08] transition-all group">
                                            <p className="text-[0.5rem] text-amber-500/60 uppercase font-bold mb-1 group-hover:text-amber-500/80">{meta.ascent.ascendedPresence.title}</p>
                                            <p className="text-[0.95rem] text-amber-100 font-semibold leading-relaxed">{meta.ascent.ascendedPresence.truth}</p>
                                            <p className="text-[0.65rem] text-amber-500/60 italic mt-2 leading-relaxed">{meta.ascent.ascendedPresence.essence}</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            {[meta.ascent.secondBreath, meta.ascent.awakenedGaze, meta.ascent.crownOfContinuity].map((layer) => (
                                                <div key={layer.title}>
                                                    <p className="text-[0.45rem] text-amber-500/50 uppercase font-bold mb-1">{layer.title}</p>
                                                    <p className="text-[0.75rem] text-amber-200/80 font-medium">{layer.truth}</p>
                                                    <p className="text-[0.6rem] text-amber-500/40 italic mt-0.5">{layer.essence}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-[0.5rem] text-slate-500 uppercase font-bold tracking-widest mb-1">Facets of Presence</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(meta.archetypes).map(([key, value]) => (
                                        <div key={key} className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.07]">
                                            <p className="text-[0.6rem] font-bold text-slate-200 capitalize tracking-wide">{key}</p>
                                            <p className="text-[0.55rem] text-slate-500 leading-relaxed mt-0.5">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between text-[0.45rem] text-slate-500 uppercase font-mono tracking-widest">
                                    <span>Momentum: {destiny.momentum}</span>
                                    <span>Sacred Coherence: {meta.coherence}</span>
                                    <span>Active Rituals: {rituals.filter((r: any) => r.shouldTrigger).length}</span>
                                </div>
                                {beats.length > 0 && (
                                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
                                        <p className="text-[0.5rem] text-slate-500 uppercase font-bold tracking-widest mb-1">Current Arc Beat</p>
                                        <p className="text-[0.7rem] text-slate-300 font-medium">{beats[0].title}</p>
                                        <p className="text-[0.6rem] text-slate-500 italic mt-1 leading-relaxed">{beats[0].description}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-16 pt-10 border-t border-white/10">
                            <p className="text-[0.6rem] text-white uppercase font-bold tracking-[0.4em] mb-8 text-center italic">The Era of Continuous Motion: The Absolute Seal</p>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[meta.continuousMotion.momentNeverEnds, meta.continuousMotion.pathFormsAsYouWalk, meta.continuousMotion.unbrokenForwardness].map((layer) => (
                                    <div key={layer.title} className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 flex flex-col items-center text-center hover:bg-amber-500/[0.08] transition-all">
                                        <p className="text-[0.5rem] uppercase font-bold mb-3 tracking-widest text-amber-500/60">{layer.title}</p>
                                        <p className="text-sm text-amber-100 font-medium leading-relaxed">{layer.truth}</p>
                                        <p className="text-[0.65rem] text-amber-500/40 italic mt-3 leading-relaxed">{layer.essence}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary of Totality */}
                        <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6 opacity-30">
                            {['Descent', 'Ascent', 'Expansion', 'Integration', 'Post-Mythic', 'Creation', 'Motion'].map((m) => (
                                <span key={m} className="text-[0.45rem] uppercase font-bold tracking-[0.3em]">{m} Sealed</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
                {/* Timeline */}
                <section className="opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <h2 className="mb-4 text-sm font-semibold text-slate-200 uppercase tracking-widest">Timeline</h2>
                    <div className="space-y-3 text-xs text-slate-400">
                        {events.map((e, i) => (
                            <div key={i} className="flex gap-3">
                                <span className="text-slate-500 font-mono whitespace-nowrap">{e.timeAgo}</span>
                                <span>{e.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Emotional Notes */}
                <section>
                    <h2 className="mb-4 text-sm font-semibold text-slate-200 uppercase tracking-widest">
                        Emotional Notes
                    </h2>
                    <div className="space-y-2 text-xs text-slate-400">
                        {summary.notes?.map((note, i) => (
                            <p key={i} className="border-l border-emerald-500/50 pl-3">
                                {note}
                            </p>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
