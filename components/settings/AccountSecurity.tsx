"use client";

import { GlassCard } from "@/components/ui";
import { SignOutButton } from "@clerk/nextjs";

export default function AccountSecurity() {
    return (
        <GlassCard className="p-8 border-red-500/20 bg-red-500/5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Security Chamber</h2>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Manage OS access and authentication</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center text-xl">🛡️</div>
            </div>

            <div className="mt-8 flex items-center gap-4">
                <SignOutButton>
                    <button className="px-6 py-3 rounded-xl bg-red-600/20 border border-red-900/50 text-red-400 text-xs font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all">
                        Terminate Session
                    </button>
                </SignOutButton>
                <p className="text-[10px] text-white/30 italic max-w-xs font-mono">
                    Termination will clear the current identity vessel from the OS cache.
                </p>
            </div>
        </GlassCard>
    );
}
