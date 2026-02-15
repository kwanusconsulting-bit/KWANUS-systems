"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui";

export default function FundingList({ apps }: any) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight text-white">Funding Ascension</h1>
                <Link
                    href="/dashboard/funding/create"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition text-sm font-medium text-white"
                >
                    + Seek Expansion
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.length === 0 ? (
                    <GlassCard className="col-span-full py-20 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4">✨</div>
                        <p className="text-white/60">The ascension chamber is quiet.</p>
                        <p className="text-xs text-white/40 mt-1">Initiate your first funding application to begin the expansion.</p>
                    </GlassCard>
                ) : (
                    apps.map((a: any) => (
                        <Link
                            key={a.id}
                            href={`/dashboard/funding/${a.id}`}
                            className="group"
                        >
                            <GlassCard className="hover:bg-white/10 transition-all border-white/10 group-hover:border-white/20 h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                                            {a.productType.replace('_', ' ')}
                                        </div>
                                        <div className="text-xs text-white/40 font-mono mt-0.5">ID: {a.id.slice(0, 8)}</div>
                                    </div>
                                    <div className={`
                    px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest
                    ${a.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' :
                                            a.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400' :
                                                'bg-white/5 text-white/40'}
                  `}>
                                        {a.status}
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-end justify-between">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Requested Amount</div>
                                        <div className="text-xl font-bold text-white">${a.requestedAmount.toLocaleString()}</div>
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                                </div>
                            </GlassCard>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
