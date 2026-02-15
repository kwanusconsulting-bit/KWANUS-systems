// app/dashboard/disputes/create/page.tsx
import React from "react";
import { getEmotionTheme } from "@/lib/emotion";
import { OSState } from "@/lib/himalaya";
import { generateCeremony } from "@/lib/ceremony";
import { createIdentity } from "@/lib/identity";
import { generatePersona } from "@/lib/persona";
import { generateMicroCopy } from "@/lib/microcopy";

export default function RepairCeremonyPage() {
    // TEMP: Hardcoded until backend is wired
    const identity = createIdentity({
        name: "Ka’Moni",
        emotionalState: "progressing",
        creditState: "mixed",
        disputeState: "active",
        fundingState: "pending",
        verified: true,
    });

    const emotionalState = identity.emotionalState;
    const theme = getEmotionTheme(emotionalState);

    const osState: OSState = {
        emotion: emotionalState,
        credit: identity.creditState as any,
        disputes: identity.disputeState as any,
        funding: identity.fundingState as any,
    };

    const ceremony = generateCeremony(osState);
    const persona = generatePersona(osState);
    const micro = generateMicroCopy(emotionalState, persona);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
            {/* Adaptive Glow Background */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div
                    className={`absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl bg-gradient-to-tr ${theme.bgGlow} animate-glowPulse`}
                />
                <div
                    className={`absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl bg-gradient-to-tr ${theme.bgGlow} animate-glowPulse`}
                />
            </div>

            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-12 animate-fade-in">
                    <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${theme.accent} mb-2`}>
                        The Ritual of Repair
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                        Repair Ceremony
                    </h1>
                    <p className="mt-3 text-sm text-slate-400 italic">
                        {persona.affirmation} • {persona.presence}
                    </p>
                </header>

                <div className="space-y-6">
                    {ceremony.map((step, i) => (
                        <div
                            key={i}
                            className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-2xl animate-breathe hover:animate-drift transition-all duration-500"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-tr ${theme.bgGlow} blur-xl opacity-40 -z-10 animate-glowPulse`} />

                            <div className="flex items-start justify-between">
                                <div>
                                    <p className={`text-[0.65rem] font-medium uppercase tracking-widest ${theme.accent}`}>
                                        Step {i + 1} • {step.pacing}
                                    </p>
                                    <h2 className="mt-1 text-lg font-medium text-slate-100">{step.label}</h2>
                                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">{step.emotionalTone}</p>
                                    <p className="mt-1 text-[0.6rem] text-slate-500 italic">{persona.demeanor}</p>
                                </div>
                                <div className={`h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[0.6rem] ${theme.accent}`}>
                                    0{i + 1}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between gap-4">
                                <p className="text-[0.65rem] text-slate-500 font-mono italic">
                                    Action: {step.action}
                                </p>
                                <button className={`rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-[0.65rem] font-semibold text-slate-200 hover:bg-white/10 transition-all`}>
                                    Acknowledge
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="mt-16 text-center animate-fade-in [animation-delay:800ms]">
                    <button className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-sky-500 px-8 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/40 hover:scale-[1.05] active:scale-[0.95] transition-all`}>
                        Complete Ceremony
                    </button>
                    <p className="mt-4 text-[0.6rem] text-slate-500 uppercase tracking-widest">
                        Handled by KWANUS Precision Shell
                    </p>
                </footer>
            </div>
        </main>
    );
}
