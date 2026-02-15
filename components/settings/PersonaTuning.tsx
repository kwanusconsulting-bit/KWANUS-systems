"use client";

import { GlassPanel } from "@/components/ui";

export default function PersonaTuning() {
    const modes = [
        { key: "himalaya", label: "Himalaya's Calm", desc: "Gentle guidance, restorative pacing, soft signals.", icon: "🏔️" },
        { key: "balanced", label: "Balanced Resonance", desc: "Standard OS operating mode. Harmoninzed signals.", icon: "⚖️" },
        { key: "kai", label: "Kai's Momentum", desc: "Direct feedback, rapid pacing, kinetic signals.", icon: "⚡" },
    ];

    const currentMode = "balanced";

    return (
        <GlassPanel className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Persona Modulation</h2>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Choose your steward's vocal layer</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-xl">🎙️</div>
            </div>

            <div className="space-y-4">
                {modes.map((m) => (
                    <button
                        key={m.key}
                        className={`
              w-full p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group
              ${currentMode === m.key
                                ? "bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                : "bg-slate-950/40 border-white/5 hover:border-white/20 hover:bg-white/5"
                            }
            `}
                    >
                        <div className="flex items-start gap-6">
                            <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-500
                ${currentMode === m.key ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-110" : "bg-white/5 grayscale group-hover:grayscale-0"}
              `}>
                                {m.icon}
                            </div>
                            <div>
                                <div className={`font-bold text-lg tracking-tight ${currentMode === m.key ? "text-white" : "text-white/60"}`}>
                                    {m.label}
                                </div>
                                <div className="text-sm text-white/40 mt-1 pr-12 leading-relaxed italic">
                                    {m.desc}
                                </div>
                            </div>
                        </div>
                        {currentMode === m.key && (
                            <div className="absolute top-0 right-0 h-full w-1 bg-white" />
                        )}
                    </button>
                ))}
            </div>
        </GlassPanel>
    );
}
