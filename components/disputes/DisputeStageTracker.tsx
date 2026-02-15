"use client";

import { GlassPanel } from "@/components/ui";

interface DisputeStageTrackerProps {
    stage: string;
}

export default function DisputeStageTracker({ stage }: DisputeStageTrackerProps) {
    const stages = [
        "drafting",
        "sent",
        "in-review",
        "response-received",
        "resolved",
    ];

    return (
        <GlassPanel className="p-8">
            <h2 className="text-lg font-semibold tracking-tight text-white mb-6">Repair Lifecycle Stage</h2>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />

                <div className="relative flex items-center justify-between">
                    {stages.map((s, index) => {
                        const isActive = s === stage;
                        const isCompleted = stages.indexOf(stage) > index;

                        return (
                            <div key={s} className="flex flex-col items-center group">
                                <div
                                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500
                    ${isActive
                                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-110"
                                            : isCompleted
                                                ? "bg-emerald-500 border-emerald-500 text-white"
                                                : "bg-slate-900 border-white/10 text-white/40"
                                        }
                  `}
                                >
                                    {isCompleted ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-xs font-bold">{index + 1}</span>
                                    )}
                                </div>
                                <div className={`mt-4 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${isActive ? "text-emerald-400" : "text-white/40"}`}>
                                    {s.replace("-", " ")}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </GlassPanel>
    );
}
