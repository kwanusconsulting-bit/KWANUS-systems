"use client";

import { GlassPanel } from "@/components/ui";

export default function EmotionalPreferences({ user }: any) {
    // Mock states since state management is global via Context
    const states = [
        { key: "WORST", label: "Steady & Clear", color: "bg-sky-500" },
        { key: "NEUTRAL", label: "Neutral Core", color: "bg-slate-500" },
        { key: "PROGRESSING", label: "Moving Forward", color: "bg-rose-500" },
        { key: "THRIVING", label: "Ascending", color: "bg-emerald-500" },
    ];

    const currentStatus = "NEUTRAL"; // Mock

    return (
        <GlassPanel className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Emotional Calibration</h2>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Tune the OS resonance layer</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-xl">🧘</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {states.map((s) => (
                    <button
                        key={s.key}
                        className={`
              p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden
              ${currentStatus === s.key
                                ? "bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                : "bg-slate-950/40 border-white/5 hover:border-white/20 hover:bg-white/5"
                            }
            `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${s.color} ${currentStatus === s.key ? 'animate-pulse' : ''}`} />
                            <div>
                                <div className={`font-semibold text-sm ${currentStatus === s.key ? "text-white" : "text-white/60"}`}>
                                    {s.label}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-white/30 mt-1">
                                    Layer ID: {s.key}
                                </div>
                            </div>
                        </div>
                        {currentStatus === s.key && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 text-xs font-bold uppercase tracking-widest">Active</div>
                        )}
                    </button>
                ))}
            </div>
        </GlassPanel>
    );
}
