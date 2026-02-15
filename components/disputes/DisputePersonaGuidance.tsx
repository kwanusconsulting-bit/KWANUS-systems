"use client";

import { GlassCard } from "@/components/ui";

interface DisputePersonaGuidanceProps {
    dispute: any;
}

export default function DisputePersonaGuidance({ dispute }: DisputePersonaGuidanceProps) {
    // Using a simplified theme detection or fallback
    const persona = "Himalaya"; // Fallback for now or logic based on history

    const messages: any = {
        Himalaya: {
            title: "Himalaya's Gentle Guidance",
            message: `I see the path you are walking with this ${dispute.creditorName} account. The ${dispute.status} stage requires a calm heart. We have gathered the necessary documents; now we wait for the universe to reflect back the truth of your financial story.`,
            icon: "🏔️"
        },
        Kai: {
            title: "Kai's Direct Signal",
            message: `Account ${dispute.accountNumber} is in scope. We are currently in the ${dispute.status} phase. Momentum is building. Your next move is to verify the response once it arrives from ${dispute.bureau}. Stay focused.`,
            icon: "⚡"
        },
    };

    const activeGuidance = messages[persona] || messages.Himalaya;

    return (
        <GlassCard className="p-8 border-l-4 border-l-emerald-500/50">
            <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-slate-950/50 border border-white/10 flex items-center justify-center text-3xl shadow-inner">
                    {activeGuidance.icon}
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
                        {activeGuidance.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed italic font-serif">
                        &quot;{activeGuidance.message}&quot;
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest text-emerald-400/80 font-bold">
                            Live OS Resonance
                        </span>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
