"use client";

import { GlassCard } from "@/components/ui";

interface FundingPersonaGuidanceProps {
    app: any;
}

export default function FundingPersonaGuidance({ app }: FundingPersonaGuidanceProps) {
    // Simplified persona logic for now
    const persona = "Kai";

    const messages: any = {
        Himalaya: {
            title: "Himalaya's Gentle Breath",
            message: `Expansion is a sacred transition. This ${app.productType.replace('_', ' ')} request for $${app.requestedAmount.toLocaleString()} is a manifestation of your future stability. Breathe into the ${app.status.toLowerCase()} process—every leaf unfolds in its own time.`,
            icon: "🧘"
        },
        Kai: {
            title: "Kai's Kinetic Pulse",
            message: `System alignment confirmed. The ${app.productType.replace('_', ' ')} application is currently ${app.status.toLowerCase()}. We are optimizing for resonance. Keep your indicators steady; momentum is building toward the expansion threshold.`,
            icon: "⚡"
        },
    };

    const activeGuidance = messages[persona] || messages.Kai;

    return (
        <GlassCard className="p-8 border-l-4 border-l-emerald-500/50 relative overflow-hidden group">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-1000" />

            <div className="flex items-start gap-8 relative z-10">
                <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-slate-950/60 border border-white/10 flex items-center justify-center text-4xl shadow-2xl backdrop-blur-md">
                    {activeGuidance.icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-3 opacity-90">
                        {activeGuidance.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed italic text-lg opacity-80 font-serif">
                        "{activeGuidance.message}"
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <span className="text-[11px] uppercase tracking-[0.4em] text-emerald-400 font-black">
                            Ascension Synced
                        </span>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
