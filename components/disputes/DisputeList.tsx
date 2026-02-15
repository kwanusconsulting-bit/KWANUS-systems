"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui";

export default function DisputeList({ disputes }: any) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Disputes</h1>
                <Link
                    href="/dashboard/disputes/create"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition text-sm font-medium"
                >
                    + New Dispute
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {disputes.length === 0 ? (
                    <GlassCard className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-white/60">No disputes in the repair chamber.</p>
                        <p className="text-xs text-white/40 mt-1">Initiate a new dispute to begin the transformation.</p>
                    </GlassCard>
                ) : (
                    disputes.map((d: any) => (
                        <Link
                            key={d.id}
                            href={`/dashboard/disputes/${d.id}`}
                            className="group"
                        >
                            <GlassCard className="hover:bg-white/10 transition-all border-white/10 group-hover:border-white/20">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-lg font-semibold text-white tracking-tight">{d.creditorName || d.accountName}</div>
                                        <div className="text-sm text-white/60 mt-1">
                                            {d.bureau} • Stage: <span className="capitalize text-emerald-400/80">{d.status || d.stage}</span>
                                        </div>
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                            </GlassCard>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
