"use client";

import IdentityCard from "./IdentityCard";
import EmotionalPreferences from "./EmotionalPreferences";
import PersonaTuning from "./PersonaTuning";
import AccountSecurity from "./AccountSecurity";

export default function SettingsCenter({ user }: any) {
    return (
        <div className="max-w-4xl mx-auto py-10 space-y-12 animate-fade-in px-6">
            <header>
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">The Center</h1>
                <p className="text-xs text-white/40 uppercase tracking-[0.5em] mt-2 font-bold">Inner Chamber • Identity Resolution</p>
            </header>

            <div className="grid grid-cols-1 gap-12">
                <IdentityCard user={user} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <EmotionalPreferences user={user} />
                    <PersonaTuning />
                </div>

                <AccountSecurity />
            </div>

            <footer className="pt-12 border-t border-white/5 flex items-center justify-between text-[10px] text-white/20 uppercase tracking-[0.3em] font-mono">
                <div>Kernel Build: 2026.02.15</div>
                <div>Latent Identity Encryption Enabled</div>
            </footer>
        </div>
    );
}
