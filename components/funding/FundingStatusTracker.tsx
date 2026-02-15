"use client";

import { GlassPanel } from "@/components/ui";

interface FundingStatusTrackerProps {
    status: string;
}

export default function FundingStatusTracker({ status }: FundingStatusTrackerProps) {
    const stages = [
        "DRAFTING",
        "SUBMITTED",
        "PENDING",
        "APPROVED",
        "DENIED",
    ];

    // Map incoming status to one of our stages if needed
    const normalizedStatus = status.toUpperCase();

    return (
        <GlassPanel className="p-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/40 mb-8 ml-2">Ascension Lifecycle</h2>

            <div className="relative pt-2 pb-8">
                {/* Connection Line */}
                <div className="absolute top-[21px] left-0 right-0 h-0.5 bg-white/10" />

                <div className="relative flex items-center justify-between">
                    {stages.map((s, index) => {
                        const isActive = s === normalizedStatus;
                        const isCompleted = stages.indexOf(normalizedStatus) > index;

                        return (
                            <div key={s} className="flex flex-col items-center group flex-1">
                                <div
                                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-700 relative z-10
                    ${isActive
                                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-125"
                                            : isCompleted
                                                ? "bg-emerald-500 border-emerald-500 text-white"
                                                : "bg-slate-950 border-white/10 text-white/20"
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
                                <div className={`
                    mt-6 text-[10px] uppercase tracking-[0.2em] font-bold text-center transition-all duration-500
                    ${isActive ? "text-emerald-400 opacity-100 translate-y-0" : "text-white/20 opacity-60 translate-y-1"}
                `}>
                                    {s.replace("_", " ")}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </GlassPanel>
    );
}
