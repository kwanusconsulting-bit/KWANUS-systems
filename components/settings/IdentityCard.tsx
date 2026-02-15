"use client";

import { GlassCard } from "@/components/ui";

export default function IdentityCard({ user }: any) {
    return (
        <GlassCard className="p-8 border-white/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[80px] pointer-events-none" />

            <div className="flex items-start gap-8">
                <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-3xl shadow-2xl overflow-hidden relative">
                    {user?.imageUrl ? (
                        <img src={user.imageUrl} alt="Steward" className="w-full h-full object-cover" />
                    ) : (
                        "👤"
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">{user?.name || "The Steward"}</h2>
                        <p className="text-xs text-white/40 uppercase tracking-[0.3em] font-bold mt-1">Identity Vessel</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Pacing Layer</div>
                            <div className="text-sm text-white/70">Verified Steward</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Signal Path</div>
                            <div className="text-sm text-white/70 truncate max-w-[150px]">{user?.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
